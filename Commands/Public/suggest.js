const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandSubcommandGroupBuilder } = require("discord.js");
const { trusted } = require("mongoose");
const guildSchema = require("../../models/Guild")
const suggSchema = require("../../models/Suggestions")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("suggestion")
        .setDescription("To create or reply to a suggestion.")
        .addSubcommand((options) =>
            options.setName("create")
            .setDescription("Make a new suggestion.")
            .addStringOption((option) =>
                option.setName("suggestion")
                .setDescription("The suggestion you want to make.")
                .setRequired(true)))
        .addSubcommand((options) =>
            options.setName("reply")
            .setDescription("To reply to a suggestion.")
            .addStringOption((option) =>
                option.setName("id")
                .setDescription("The id of the suggestion.")
                .setRequired(true))
            .addStringOption((option) =>
                option.setName("status")
                .setDescription("The new statu of the suggestion.")
                .setRequired(true)
                .addChoices({name: "Accepted", value: "yes"}, {name: "Rejected", value: "no"}))
            .addStringOption((option) =>
                option.setName("response")
                .setDescription("The response to the suggestion.")
                .setRequired(true))),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         */
        async execute(interaction) {
            await interaction.deferReply();
            const option = interaction.options.getSubcommand(),
                suggestion = interaction.options.getString("suggestion"),
                id = interaction.options.getString("id"),
                status = interaction.options.getString("status"),
                response = interaction.options.getString("response"),
                data = await guildSchema.findOne({ GuildId: interaction.guildId }) || await guildSchema.create({ GuildId: interaction.guildId}),
                sug = await suggSchema.findOne({ message: id }),
                sugChannel = await interaction.guild.channels.cache.get(data.SuggestionChannel)
            
            if(option === "create") {
                let data = await guildSchema.findOne({ GuildId: interaction.guildId }) || await guildSchema.create({ GuildId: interaction.guildId})
                let sugChannel = interaction.guild.channels.cache.get(data.SuggestionChannel)
                if(!sugChannel) return interaction.editReply({embeds: [new EmbedBuilder().setTitle("❌ Please set the suggestion channel by using `/setup`")], ephemeral: true})
                const row = new ActionRowBuilder().setComponents([ new ButtonBuilder().setCustomId("upvote").setLabel("⬆ Up Vote").setStyle(ButtonStyle.Primary), new ButtonBuilder().setCustomId("downvote").setLabel("⬇ Down Vote").setStyle(ButtonStyle.Danger) ])
                let SugEmbed = new EmbedBuilder() 
                    .setTitle("New Suggestion!")
                    .setColor("#0073ff")
                    .setDescription(suggestion)
                    .setFields(
                        {
                            name: "Up Votes",
                            value: "0",
                            inline: true
                        },
                        {
                            name: "Down Votes",
                            value: "0",
                            inline: true
                        },
                        {
                            name: "Status",
                            value: "pending",
                            inline: true
                        }
                    )
                    .setFooter({text: interaction.user.username, iconURL: interaction.user.displayAvatarURL()});

                const msg = sugChannel.send({embeds: [SugEmbed], components: [row]}).then((message) => {
                    suggSchema.create({
                        suggestion: suggestion,
                        user: interaction.user.id,
                        message: message.id,
                        channel: sugChannel.id,
                        guild: interaction.guild.id,
                        votes: {
                            up: [], down: []
                        },
                        createdAt: Date.now(),
                    });
                    message.edit(
                        {
                            embeds: [new EmbedBuilder()
                                .setTitle("New Suggestion!")
                                .setColor("#0073ff")
                                .setDescription(suggestion)
                                .setFields(
                                    {
                                        name: "Up Votes",
                                        value: "0",
                                        inline: true
                                    },
                                    {
                                        name: "Down Votes",
                                        value: "0",
                                        inline: true
                                    },
                                    {
                                        name: "Status",
                                        value: "pending",
                                        inline: true
                                    },
                                    {
                                        name: "Suggestion ID",
                                        value: `\`\`\`\n${message.id}\n\`\`\``,
                                        inline: true
                                    }
                                )
                                .setFooter({text: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})]
                        }
                    )
                    if(!guildSchema.findOne({GuildId: interaction.guildId})) {
                        guildSchema.create({GuildId: interaction.guildId})
                    }
                    guildSchema.findOne({GuildId: interaction.guildId}, function (err, info) {
                        if (err){
                            console.log(" ")
                        }else{
                            if(info.LogsChannel !== null) {
                                interaction.guild.channels.cache.get(info.LogsChannel).send({embeds: [new EmbedBuilder()
                                    .setColor("#00bfff")
                                    .setTitle(`✅ Suggestion Created`).setFields({name: "Suggestion : ", value: suggestion}, {name: "Suggestion ID", value: "`"+message.id+"`"})]})
                                interaction.deleteReply();
                            }
                        }
                    })
                })

            } else if (option === "reply") {
                if(!guildSchema.findOne({GuildId: interaction.guildId})) {
                    guildSchema.create({GuildId: interaction.guildId})
                }
                guildSchema.findOne({GuildId: interaction.guildId}, function (err, info) {
                    if (err){
                        return interaction.editReply({ embeds: [new EmbedBuilder().setTitle("❌ Suggestion channel not setuped").setColor("#ff1100")] })
                    }
                    else{
                        let logchan = info.LogsChannel;
                        let chan = info.SuggestionChannel;
                        if(!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.editReply({embeds: [new EmbedBuilder().setTitle("❌ You dont have permission!").setColor("#ff1100")], ephemeral: true})
                        if(!sug) {
                            interaction.member.send({embeds: [new EmbedBuilder().setTitle("❌ Invalid suggestion id!").setColor("#ff1100")]})
                            return interaction.deleteReply();
                        }
                        if(!chan) return interaction.editReply({ embeds: [new EmbedBuilder().setTitle("❌ Suggestion channel not setuped").setColor("#ff1100")] })
                        if (interaction.channelId !== data.SuggestionChannel) return interaction.editReply({ embeds: [new EmbedBuilder().setTitle(`❌ Please reply in the suggestion channel!`).setDescription(`<#${chan}>`).setColor("#ff1100")]})
                        const msg = interaction.channel.messages.fetch(sug.message).then((m) => {
                            const newrow = new ActionRowBuilder().setComponents([ new ButtonBuilder().setCustomId("upvote").setLabel("⬆ Up Vote").setStyle(ButtonStyle.Secondary).setDisabled(true), new ButtonBuilder().setCustomId("downvote").setLabel("⬇ Down Vote").setStyle(ButtonStyle.Secondary).setDisabled(true) ])
                            if(status === "yes") {
                                m.embeds[0].fields[2].value = "**✅ Accepted**"
                                m.embeds[0].fields.push({
                                    name: "Response",
                                    value: response
                                })
                            } else {
                                m.embeds[0].fields[2].value = "**❌ Rejected**"
                                m.embeds[0].fields.push({
                                    name: "Response",
                                    value: response
                                })
                            }
                            m.edit({embeds: m.embeds, components: [newrow]});
                            if(logchan) {
                                interaction.guild.channels.cache.get(logchan).send({embeds: [new EmbedBuilder().setTitle("✅ Suggestion replied").setFields({name: "Suggestion ID", value: "`"+id+"`"}, {name: "Status", value: m.embeds[0].fields[2].value}, {name: "Response", value: response}).setColor("#00bfff")]});
                                interaction.deleteReply();
                            }
                        })
                    }
                });
            }
        }
}