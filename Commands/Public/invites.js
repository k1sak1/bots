const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invites")
        .setDescription("Unavaialable."),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         */
        execute(interaction) {
            interaction.reply({content: "This command in not available right now!", ephemeral: true})
        }
}