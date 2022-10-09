const schemaguild = require("../../models/Guild");
const { Guild, Client, EmbedBuilder } = require("discord.js");
const { ActivityType } = require("discord.js");
const chalk = require("chalk");

module.exports = {
    name: "guildCreate",
    once: false,
    /**
     * 
     * @param {Guild} guild 
     */
    async execute(guild) {
        schemaguild.findOne({GuildId: guild.id}, async (err, data) => {
            if (err){
                await client.guilds.cache.get("1023570373222076437").channels.cache.get("1025429457412034642").send({embeds: [new EmbedBuilder().setTitle("❌ Database Error").setDescription(err)]})
            }
            if(!data) {
                await schemaguild.create({GuildId: guild.id, Name: guild.name})
                //await guild.fetchOwner().then(async (owner) => {
                    //let ownir = `${owner.user.username}#${owner.user.discriminator}`
                    //let ownira = `<@${owner.id}>`
                    //await client.guilds.cache.get("1023570373222076437").channels.cache.get("1025428619146833953").send({embeds: [new EmbedBuilder().setTitle("✅ New Guild").setFields({name: "Guild Name", value: guild.name, inline: true}, {name: "Guild Id", value: guild.id, inline: true}, {name: "Members", value: guild.memberCount, inline: true}, {name: "Owner Id", value: guild.ownerId, inline: true}, {name: "Owner Tag", value: `${ownir}`, inline: true}, {name: "Owner Mention", value: ownira, inline: true})]})
                //})
            }
        })
    }
};