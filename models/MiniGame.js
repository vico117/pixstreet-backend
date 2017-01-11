var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var minigameSchema = new mongoose.Schema({
    name: String,
    tags: mongoose.Schema.Types.Mixed
}, schemaOptions);

var Minigame = mongoose.model('Minigame', minigameSchema);

module.exports = Minigame;
