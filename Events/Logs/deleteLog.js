const { loadCommands } = require("../../Handlers/commandHandler");
const { Message, EmbedBuilder } = require("discord.js");
const { ActivityType } = require("discord.js");
const guildSchema = require("../../models/Guild");
const chalk = require("chalk");

module.exports = {
    name: "messageDelete",
    once: false,
    /**
     * 
     * @param {Message} message 
     */
    async execute(message) {
        let author = message.author
        let channel = message.channel
        if(!message.partial) {
            if(channel) {
                await guildSchema.findOne({GuildId: message.guildId}, async (err, data) => {
                    if(err) return;
                    if(!data) {
                        await guildSchema.create({GuildId: message.guildId})
                    }
                    if(data !== null && data.LogsChannel) {
                        let chan = await message.guild.channels.cache.get(data.LogsChannel)
                        await chan.send({embeds: [new EmbedBuilder()
                            .setAuthor({name: message.author.username, iconURL: message.author.avatarURL()})
                            .setColor("#03c6fc")
                            .setDescription(`__**Channel**__ : <#${message.channel.id}>
                            __**Message Author**__ : <@${message.author.id}>
                            __**Message Author**__ : `+"`"+`${message.author.id}`+"`"+`
                            __**Message**__ : ${message.content}`)
                            .setTimestamp()]})
                    }
                }).clone();
            }
        }
    }
};