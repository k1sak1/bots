const { Schema, model } = require("mongoose");

const suggSchema = new Schema({
    suggestion: String,
    user: String,
    message: String,
    channel: String,
    guild: String,
    votes: {
        up: {
            type: [String],
            default: []
        }, down: {
            type: [String],
            default: []        
        }
    },
    createdAt: Number,
})

module.exports = model("Suggestions-Data", suggSchema);