var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema(
    {
        description: { type: String, required: false },
        header: { type: String, required: true },
        email: { type: String, required: true }

    }
);

module.exports = mongoose.model('notes', schema);