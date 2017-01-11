var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var nodeSchema = new mongoose.Schema({
    type: String,
    id: Number,
    loc : { type: [Number], index: '2dsphere' },
    tags: mongoose.Schema.Types.Mixed,
    minigame: {type: mongoose.Schema.Types.ObjectId, ref: 'MiniGame'},
    scores: [{type: mongoose.Schema.Types.ObjectId, ref: 'Score'}],
}, schemaOptions);

var Node = mongoose.model('Node', nodeSchema);

module.exports = Node;
