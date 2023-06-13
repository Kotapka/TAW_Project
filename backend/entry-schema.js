const moongose = require('mongoose');

const entrySchema = moongose.Schema({
    date: String,
    entry: String
});

module.exports = moongose.model('ListEntry', entrySchema);