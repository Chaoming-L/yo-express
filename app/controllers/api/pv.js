var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    uaParser = require('ua-parser-js'),
    Pv = mongoose.model('pv');

module.exports = function (app) {
    app.use('/api', router);
};

const get_client_ip = function (req) {
    var ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0]
    }
    return ip;
};

router.post('/record_pv', (req, res) => {
    // 客户端请求Ip
    const ip = get_client_ip(req);
    // 客户端硬件信息
    const ua = uaParser(req.headers['user-agent']);
    // 添加格林尼治事件差
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
    Pv.create({ ip, ua, add_time: date }, (err, result) => {
        err ? res.send(err) : res.send(result)
    })
})

/** 查询PV
 *  查询参数  {query: @param{string}}
 *  @param = 'month' / 'week' / 'day'
 */
router.post('/get_pv', async (req, res) => {
    try {
        const queryType = req.body.query || 'month'
        const queryString = { month: '$dayOfMonth', week: '$dayOfWeek', day: '$hour', hour: '$minute' }
        const str = queryString[queryType]
        const result = await Pv.aggregate([
            {
                $group: {
                    _id: {
                        [str]: "$add_time"
                    },
                    pv: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

        let date = result.map(x => x._id),
            count = result.map(x => x.pv);

        // 如果查询的是周,那么转换为中文
        if (queryType === 'week') {
            date = date.map(x => week[x - 1])
        }

        const response = { date, count, "code": 0 };
        res.json(response)
    } catch (err) {
        res.send(err)
    }
})
