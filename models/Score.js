var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var scoreSchema = new mongoose.Schema({
    name: String,
    score: Number,
    node: {type: mongoose.Schema.Types.ObjectId, ref: 'Node'}
}, schemaOptions);

var Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
