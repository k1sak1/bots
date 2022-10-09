const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("need")
        .addStringOption(option =>
            option.setName("product").setDescription("The product you need.").setRequired(true))
        .setDescription("To tag the sellers with what you need."),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         */
        execute(interaction) {
            if(interaction.channel.parentId !== "1016039660675403867") return interaction.reply({content: "You need to open a ticket to make this command!", ephemeral: true})
            interaction.channel.send({content: `> ||@everyone||  <a:5454:1016467086068957226> 
            > **${interaction.options.getString("product")} صاحب التكت يحتاج الى**`})
        }
}