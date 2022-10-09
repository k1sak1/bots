const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addStringOption(option =>
            option.setName("message").setDescription("Message you want the bot to say.").setRequired(true))
        .setDescription("The bot will say the message."),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         */
        async execute(interaction) {
            await interaction.channel.send({content: interaction.options.getString("message")})
        }
}