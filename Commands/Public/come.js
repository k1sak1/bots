const { ChatInputCommandInteraction, SlashCommandBuilder, Embed, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("come")
        .addUserOption(option =>
            option.setName("user").setDescription("User you want to come").setRequired(true))
        .setDescription("Tell the user to come in private."),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         */
        async execute(interaction) {
            await interaction.deferReply();
            let sender = interaction.member;
            let reciever = interaction.options.getUser("user");
            let channel = interaction.channel.id;
            await reciever.send(`> 𝐇𝐞𝐲 ${reciever} > 
    <a:emoji_46:1017421303780741180>  You have been requested here  !
          > **{ <#${channel}> }**  <a:ss_0:1017420517772382299> `).catch((err) => {
            interaction.editReply({embeds: [new EmbedBuilder().setTitle("❌ Error while sending the come, please make sure his dm is open!")]})
          })
            interaction.editReply({content: `✅ **Done Sent To ${reciever}**`, ephemeral: false})
        }
}