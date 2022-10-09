const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client, Utils } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add-emoji")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageEmojisAndStickers)
        .addStringOption(option =>
            option.setName("emojis").setDescription("Emojis you want to add").setRequired(true))
        .setDescription("Add new emojis to the server."),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         */
        async execute(interaction) {
            const emojis = interaction.options.getString("emojis").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi) || "nulla"
            if (emojis === "nulla") return interaction.reply({content: "This is not an emoji"})
            //return console.log(emojis)
            let emojisArra = [];
            emojis.forEach(async (emote) => {
                let emoji = Discord.parseEmoji(emote)
                if (emoji.id) {
                    const url =  `https://cdn.discordapp.com/emojis/${emoji.id}.${
                        emoji.animated ? "gif" : "webp" 
                      }`;
                    await interaction.guild.emojis.create({attachment: url, name: emoji.name}).then(emojia => {
                        emojisArra.push(emojia.name)
                    }).catch((err) => {
                        console.log(err)
                    })
                }
                emojisArra.push(emoji.name)
            })
            let array = [];
            emojis.forEach((emoji) => {
                let parsed = Discord.parseEmoji(emoji)
                let animated;
                if (parsed.animated) {
                    animated = "a";
                } else if (!parsed.animated) {
                    animated = "";
                }
                let kaml = `<${animated}:${parsed.name}:${parsed.id}>`
                array.push(kaml)
            })
            interaction.editReply(`**Done added emojis**`) 
        }
};