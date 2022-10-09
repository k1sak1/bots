const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    GuildId: String,
    Name: String,
    OwnerShipId: String,
    SuggestionChannel: String,
    WelcomeChannel: String,
    InvitesChannel: String,
    FeedbackChannel: String,
    LogsChannel: String
})

module.exports = mongoose.model('guild', guildSchema)