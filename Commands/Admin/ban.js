const { SlashCommandBuilder, ChatInputCommandInteraction, Client, Message, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban someone.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option =>
        option.setName("user")
        .setDescription("User you want to ban.")
        .setRequired(true)
        ),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         */
    async execute(interaction) {
        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({embeds: [new EmbedBuilder().setTitle("❌ I dont have permission!")]})
        const usera = interaction.options.getUser("user")
        const user = interaction.options.getUser("user").id
        if(user === "1014916704406605885") return interaction.reply({content: "You cant ban me lol", ephemeral: true})
        if(!interaction.guild.members.cache.get(user).bannable) return interaction.reply({content: "I cant ban this member!", ephemeral: true})
        if(interaction.member.id === interaction.options.getUser("user").id) return interaction.reply({content: "You cant ban yourself!", ephemeral: true})
        interaction.guild.members.cache.get(user).ban();
        interaction.reply({content: `**✅ Successfully banned ${usera.username}**`})
    }
}