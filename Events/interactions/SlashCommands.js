const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client) {
        if(!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if(!command) 
        return interaction.reply({
            content: "This command is outdated",
            ephemeral: true
        });

        if(command.developer && interaction.user.id !== "954505482696028170")
        return interaction.reply({content: "This command is only available to the devloper katakuri.js.", ephemeral: true});
        
        command.execute(interaction, client);
    }
}