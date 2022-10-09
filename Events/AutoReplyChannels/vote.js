const { Client, Message, ActionRowBuilder, ButtonStyle, ButtonBuilder, EmbedBuilder, ButtonInteraction } = require("discord.js");
const schemaguild = require("../../models/Guild")
const schemasug = require("../../models/Suggestions")
const chalk = require("chalk");

module.exports = {
    name: "interactionCreate",
    once: false,
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        if(!interaction.isButton()) return;
        const sug = await schemasug.findOne({message: interaction.message.id})
        await interaction.deferReply({ ephemeral: true })
        if(sug.votes.up.includes(interaction.user.id) || sug.votes.down.includes(interaction.user.id)) return interaction.editReply({ embeds: [
            new EmbedBuilder().setTitle("❌ Already voted").setColor("#ff1100")
        ], ephemeral: true })
        if(interaction.customId === "upvote") {
            sug.votes.up.push(interaction.user.id)
        }
        if(interaction.customId === "downvote") {
            sug.votes.down.push(interaction.user.id)
        }
        await schemasug.findOneAndUpdate({message:sug.message}, sug);
        interaction.editReply({ embeds: [
            new EmbedBuilder().setTitle("✅ Voted succesfully").setColor("#00ff1e")
        ] })
        const msg = await interaction.channel.messages.fetch(sug.message)
        if (!msg) return;
        msg.embeds[0].fields[0].value = sug.votes.up.length.toString();
        msg.embeds[0].fields[1].value = sug.votes.down.length.toString();
        msg.edit({
            embeds: msg.embeds
        })
    }
};