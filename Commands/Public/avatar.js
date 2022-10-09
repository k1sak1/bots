const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .addUserOption(option =>
            option.setName("user").setDescription("User you want his avatar").setRequired(false))
        .setDescription("Display your or someone's avatar."),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         */
        execute(interaction) {
            if (!interaction.options.getUser("user")) return interaction.reply({embeds: [new EmbedBuilder()
                .setAuthor({
                    name: interaction.member.user.username,
                    iconURL: interaction.member.user.avatarURL()
                })
                .setTitle('**📷 Your Avatar**')
                .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
                .setImage(interaction.member.user.avatarURL())]})
            interaction.reply({embeds: [new EmbedBuilder()
                .setAuthor({
                    name: interaction.member.user.username,
                    iconURL: interaction.member.user.avatarURL()
                })
                .setTitle(`**📷 ${interaction.options.getUser("user").username}'s Avatar**`)
                .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
                .setImage(interaction.options.getUser("user").avatarURL())]})
        }
}