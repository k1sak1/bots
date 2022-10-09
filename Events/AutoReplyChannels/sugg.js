const { loadCommands } = require("../../Handlers/commandHandler");
const { Client, Message, ActionRowBuilder, ButtonStyle, ButtonBuilder, EmbedBuilder } = require("discord.js");
const { ActivityType } = require("discord.js");
const schemaguild = require("../../models/Guild")
const schemasug = require("../../models/Suggestions")
const chalk = require("chalk");

module.exports = {
    name: "messageCreate",
    once: false,
    /**
     * 
     * @param {Message} message 
     */
    async execute(message) {
    if(message.author.bot) return;
    await schemaguild.findOne({GuildId: message.guildId}, async (err, info) => {
        if (err){
            return message.reply({embeds: [new EmbedBuilder().setTitle("❌ Error while trying to get db info, please try again later!")]})
        }else{
            if(!info || info === null) {
                await schemaguild.create({GuildId: message.guildId})
            }
            if (info === null) {
                message.channel.send({content: "❌ Error while trying to connect to databse, please try again later!"})
            }
            if(info.SuggestionChannel) {
                let ch = message.guild.channels.cache.get(info.SuggestionChannel)
                if(message.channelId !== info.SuggestionChannel) return;
                let suggestiona = message.content;
                let naaah = message.guild.channels.cache;
                let nigger = message;
                let usera = message.member.user.id;
                let useran = message.member.user;
                let guilda = message.guildId;
                const row = new ActionRowBuilder().setComponents([ new ButtonBuilder().setCustomId("upvote").setLabel("⬆ Up Vote").setStyle(ButtonStyle.Primary), new ButtonBuilder().setCustomId("downvote").setLabel("⬇ Down Vote").setStyle(ButtonStyle.Danger) ])
                let SugEmbed = new EmbedBuilder() 
                    .setTitle("New Suggestion!")
                    .setColor("#0073ff")
                    .setDescription(message.content)
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
                    .setFooter({text: useran.username, iconURL: useran.displayAvatarURL()});

                const msg = ch.send({embeds: [SugEmbed], components: [row]}).then((msgi) => {
                    schemasug.create({
                        suggestion: suggestiona,
                        user: usera,
                        message: msgi.id,
                        channel: ch.id,
                        guild: guilda,
                        votes: {
                            up: [], down: []
                        },
                        createdAt: Date.now(),
                    });
                    nigger.delete();
                    msgi.edit(
                        {
                            embeds: [new EmbedBuilder()
                                .setTitle("New Suggestion!")
                                .setColor("#0073ff")
                                .setDescription(suggestiona)
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
                                        value: `\`\`\`\n${msgi.id}\n\`\`\``,
                                        inline: true
                                    }
                                )
                                .setFooter({text: useran.username, iconURL: useran.displayAvatarURL()})]
                        }
                    )
                    
                    if(info.LogsChannel) {
                        naaah.get(info.LogsChannel).send({embeds: [new EmbedBuilder()
                            .setColor("#00bfff")
                            .setTitle("✅ Suggestion Created")
                            .setFields({name: "Suggestion : ", value: suggestiona}, {name: "Suggestion ID", value: "`"+msgi.id+"`"})]})
                    }
                })
            }
        }
    }).clone()
    }
};