const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription("To leave the server."),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         */
        async execute(interaction) {
            if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.KickMembers)) return interaction.reply({embeds: [new EmbedBuilder().setTitle("❌ I dont have permission!")], ephemeral: true})
            if(!interaction.member.kickable) return interaction.reply({content: "I cant make you leave!", ephemeral: true})
            await interaction.member.kick();
            await interaction.channel.send({embeds: [new EmbedBuilder().setTitle("✅ Member Left Successfully")]})
        }
}