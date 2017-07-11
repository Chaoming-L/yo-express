var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Article = mongoose.model('Article');

module.exports = function (app) {
    app.use('/api', router);
};

// 添加文章
router.post('/add_article', (req, res, next) => {
    Article.create(req.body, (err, Article) => {
        err ? res.json(err) : res.json(Article)
    })
});

// 删除文章
router.post('/del_article', async (req, res, next) => {
    try {
        const article = await Article.findByIdAndRemove(req.body.id)
        res.json(article)
    } catch (e) {
        res.json(e)
    }

})

// 修改文章
router.post('/upd_article', async (req, res) => {
    try {
        const { id, articleObj } = req.body
        const result = await Article.findByIdAndUpdate(id,
            { $set: articleObj },
            { new: true })
        res.json(result)
    } catch (e) {
        res.json(e)
    }
})

