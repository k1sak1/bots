const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("Display guild info."),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         */
        execute(interaction) {
            const { guild } = interaction;
            let embed = new EmbedBuilder()
                .setAuthor({iconURL: interaction.guild.iconURL(), name: `${interaction.guild.name}'s info`})
                .setFields({
                    name: "🌐 | General",
                    value: `Name: **${guild.name}**
                    Created: <t:${parseInt(guild.createdTimestamp / 1000)}:R>
                    Owner: <@${guild.ownerId}>
                    
                    Description: **${guild.description}**`
                },
                {
                    name: "👤 | Users",
                    value: `Total: ${guild.memberCount}
                    Roles: ${guild.roles.cache.size}`
                },
                {
                    name: "📑 | Channels",
                    value: `Text: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildText).size}
                    Voice: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildVoice).size}
                    Threads: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildNewsThread && ChannelType.GuildPublicThread && ChannelType.GuildPublicThread).size}
                    Categories: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildCategory).size}
                    Stages: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildStageVoice).size}
                    News: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildNews).size}
                    Open Tickets: ${guild.channels.cache.filter((c) => c.parentId === "1018961036025536582").size}
                    
                    Total: **${guild.channels.cache.size}**`
                },
                {
                    name: "😀 | Emojis",
                    value: `Animated: ${guild.emojis.cache.filter((e) => e.animated).size}
                    Static: ${guild.emojis.cache.filter((e) => !e.animated).size}
                    Stickers: ${guild.stickers.cache.size}

                    Total: **${guild.emojis.cache.size + guild.stickers.cache.size}**`
                },
                {
                    name: "✨ | Boosts",
                    value: `Level: ${guild.premiumTier.toString().replace("TIER_", "")}
                    Boosts: ${guild.premiumSubscriptionCount}`
                })
            interaction.reply({embeds: [embed]})
        }
}