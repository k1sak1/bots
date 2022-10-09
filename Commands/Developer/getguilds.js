const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    PermissionFlagsBits,
    Client
} = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler");
const { loadEvents } = require("../../Handlers/eventHandler")
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("getguilds")
        .setDescription("Get guild name.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         * @param {Client} client 
         */
        execute(interaction, client) {
            client.guilds.cache.forEach((g) => {
                //interaction.channel.send({content: `Name: ${g.name} \nId: ${g.id} \nOwner Id: ${g.ownerId} \nOwner Tag: <@${g.ownerId}> \nIcon: ${g.iconURL()} \nMembers: ${g.memberCount} \nConsoled!`})
                interaction.channel.send({content: `Guild Name: ${g.name} \nGuild Id: ${g.id} \nGuild Members: ${g.memberCount} \nGuild Owner: ${g.ownerId}`})
            })
            client.guilds.cache.get("1014875414373617704").channels.cache.forEach((c) => {
                console.log(c.name, c.id)
            })
        }
}