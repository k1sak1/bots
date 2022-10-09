const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .addUserOption(option =>
            option.setName("user")
            .setDescription("User you want his info.")
            .setRequired(false))
        .setDescription("Display your of someone's user info."),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         */
        execute(interaction) {
            let user = interaction.options.getUser("user") || interaction.member.user
            let userWithoutUser = interaction.guild.members.cache.get(user.id)
            let nigger;
            if(user.bot) {
                nigger = "true"
            } else if (!user.bot) {
                nigger = "false"
            }
            let embed = new EmbedBuilder()
                .setAuthor({name: `${user.username}'s info`, iconURL: user.avatarURL()})
                .setFields({name: "Mention", value: `<@${user.id}>`}, {name: "Tag", value: `${user.username}#${user.discriminator}`}, {name: "Id", value: `${user.id}`}, {name: "Nickname", value: `${userWithoutUser.nickname}` || "None"}, {name: "Bot", value: nigger}, {name: "Joined At", value: new Date(userWithoutUser.joinedTimestamp).toLocaleDateString()}, {name: "Created At", value: new Date(user.createdTimestamp).toLocaleDateString()})
                .setTimestamp()
            interaction.reply({embeds: [embed]})
        }
}