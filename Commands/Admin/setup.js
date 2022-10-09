const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, ChannelType, EmbedBuilder } = require("discord.js");
const guildS = require("../../models/Guild")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup the bot settings.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option =>
        option.setName("suggestions")
        .setDescription("Channel of suggestions.")
        .setRequired(false)
        )
    .addChannelOption(option =>
        option.setName("logs")
        .setDescription("Channel of logs.")
        .setRequired(false)
        ),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         */
    async execute(interaction) {
        guildS.findOne({GuildId: interaction.guildId}, function(err, data) {
            if(err) {
                interaction.editReply({embeds: [new EmbedBuilder().setTitle("❌ Error while setuping the channels, please try again later!")]})
            }
            if(!data) {
                guildS.create({GuildId: interaction.guildId})
            }
        })
        await interaction.deferReply();
        if(interaction.options.getChannel("suggestions")) {
            const suggestionschan = interaction.options.getChannel("suggestions")
            if(suggestionschan.type !== ChannelType.GuildText) return interaction.reply({ embeds: [new EmbedBuilder().setTitle("❌ Please select a text channel instead!").setColor("#ff1100")], ephemeral: true })
            guildS.findOneAndUpdate({GuildId: interaction.guildId}, 
                {SuggestionChannel: suggestionschan.id}, null, function (err, docs) {
                if (err){
                    interaction.channel.send({embeds: [new EmbedBuilder().setTitle("❌ Error while setuping the suggestion channel, please try again later!")], ephemeral: true})
                }
                else{
                    interaction.channel.send({embeds: [new EmbedBuilder().setTitle("✅ Suggestion channel updated successfully!").setColor("#00ff22")], ephemeral: true})
                }
            })
        }
        if(interaction.options.getChannel("logs")) {
            const logschan = interaction.options.getChannel("logs")
            if(logschan.type !== ChannelType.GuildText) return interaction.reply({ embeds: [new EmbedBuilder().setTitle("❌ Please select a text channel instead!").setColor("#ff1100")], ephemeral: true })
            if(!guildS.findOne({GuildId: interaction.guildId})) {
                guildS.create({GuildId: interaction.guildId})
            }
            guildS.findOneAndUpdate({GuildId: interaction.guildId}, 
                {LogsChannel: logschan.id}, null, function (err, docs) {
                if (err){
                    interaction.channel.send({embeds: [new EmbedBuilder().setTitle("❌ Error while setuping the logs channel, please try again later!").setColor("#ff1100")], ephemeral: true})
                }
                else{
                    interaction.channel.send({embeds: [new EmbedBuilder().setTitle("✅ Logs channel updated successfully!").setColor("#00ff22")], ephemeral: true})
                }
            })
        }
    }
}