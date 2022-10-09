const { SlashCommandBuilder, ChatInputCommandInteraction, Client, Message, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick someone.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option =>
        option.setName("user")
        .setDescription("User you want to kick.")
        .setRequired(true)
        ),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         */
    async execute(interaction) {
        const usera = interaction.options.getUser("user")
        const user = interaction.options.getUser("user").id
        if(user === "1014916704406605885") return interaction.reply({content: "You cant kick me lol", ephemeral: true})
        if(!interaction.guild.members.cache.get(user).kickable) return interaction.reply({content: "I cant kick this member!", ephemeral: true})
        if(interaction.member.id === interaction.options.getUser("user").id) return interaction.reply({content: "You cant kick yourself!", ephemeral: true})
        interaction.guild.members.cache.get(user).kick();
        interaction.reply({content: `**✅ Successfully kicked ${usera.username}**`})
    }
}