const { EmbedBuilder } = require("discord.js");
const gS = require("../../models/Guild");

module.exports = (client) => {
    client.on("guildMemberAdd", (member) => {
        gS.findOne({GuildId: member.guild.id}, async (err, data) => {
            if(err) return;
            if(!data) return;
            if(data.WelcomeChannel) {
                let welcomeEmbed = new EmbedBuilder()
                .setAuthor({
                    name: member.user.username,
                    iconURL: member.user.avatarURL()
                })
                .setFooter({ text: `${member.guild.name}`, iconURL: member.guild.iconURL() })
                .setThumbnail(member.user.avatarURL())
                .setDescription(` 
                > **π Welcome To Server : \`${member.guild.name}\`**
                
                
                > **π€ User : <@${member.user.id}>**
                
                
                > **π Member ID : \`${member.id}\`**
                
                
                > **βΎοΈ MemberCount : \`${member.guild.memberCount}\`**
                
                
                > **π If You Want To 0rder Anything Open Ticket Here** : **__<#1016039678094348348>__** **or** 0rder From Bot Here **__<#1016355325097549997>__**   
                
                
                > **βοΈ Please Read The Rules** :  **__<#1016798837723111594>__**`)
                .setColor("#03c6fc")
                .setImage("https://media.discordapp.net/attachments/1015983206111133767/1017191584523104306/Comp_1_10.gif")
        
                let sendingWelcome = member.guild.channels.cache.get(data.WelcomeChannel);
                sendingWelcome.send({ embeds: [welcomeEmbed] });
                member.send({content: `
                > **Welcome To $π‘π¨π© ππ¦π©π’π«π** <a:C_6T5:1017493692283637791>
                
                > `+"`#`"+`** ΩΨ±Ψ­Ψ¨Ψ§ Ψ¨Ω Ψ ΩΩΨ±Ψͺ **<a:C_6T5:1017493692283637791>
                
                
                
                > `+"`#`"+`** ΨͺΨΉΨ±ΩΩ Ψ¨Ψ³ΩΨ· : Ψ΄ΩΨ¨ Ψ§ΩΨ¨ΩΨ± ΩΩ Ψ³Ψ±ΩΨ± ΩΨΊΨ±Ψ¨Ω ΩΩΩΨ± Ψ¬ΩΩΨΉ Ψ§ΩΨ?Ψ―ΩΨ§Ψͺ Ψ Ψ­ΩΨ« ΩΨͺΩΩΩ ΩΩ Ψ·Ψ§ΩΩ ΨΉΩΩ ΩΩΨͺΨ§Ψ² Ψ ΩΩΨΉΩΩ ΨΉΩΩ ΨͺΨ·ΩΩΨ± Ψ?Ψ―ΩΨ§ΨͺΩ Ψ―Ψ§Ψ¦ΩΨ§ Ψ¨Ψ΄ΩΩ ΩΩΩΩ Ψ¨ΩΩ Ψ . ΩΩΩΩΨ± Ψ¬ΩΩΨΉ Ψ§ΩΩΨ¨ΩΨΉΨ§Ψͺ - Ψ§ΩΨͺΨ΅Ψ§ΩΩΩ - Ψ§ΩΨ­Ψ³Ψ§Ψ¨Ψ§Ψͺ - ΩΨ§ΩΩΨ²ΩΨ― ΩΩ ΩΩΨ§Ω ΩΨ§Ψ­Ψ― **
                
                
                
                > `+"`#`"+` **ΩΨ·ΩΨ¨ Ψ§ΩΨ±Ψ―Ψ± Ψ¨ΩΨ§ ΨͺΨ­ΨͺΨ§Ψ¬Ω ΩΩ ΩΨ¨ΩΨΉΨ§Ψͺ Ψ£Ω ΨͺΨ΅Ψ§ΩΩΩ : **
                <#1018961073145122938> <a:ss_6:1017419001678270565>
                
                > `+"`#`"+` **ΩΩΨͺΩΨ―ΩΩ ΨΉΩΩ ΩΨ±ΩΩ Ψ§ΩΨΉΩΩ Ω ΩΩΨ§Ψ³ΨͺΩΨ³Ψ§Ψ±  : **
                <#1018961079080063006> <a:ss_6:1017419001678270565> 
                
                
                
                > `+"`#`"+` **<@${member.id}> ΩΨͺΩΩΩ ΩΩ Ψ§ΩΨ³ΨΉΨ§Ψ―Ω ΩΨΉΩΨ§** <a:aYOGA:1017509829528526911> `}).catch((err) => console.log(err))
            }
        })
    })
};