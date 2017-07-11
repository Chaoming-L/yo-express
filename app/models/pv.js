// pv模

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const PvSchema = new Schema({
    ip: String,
    add_time: { type: Date, default: new Date },
    ua: Object
})

mongoose.model('pv', PvSchema);