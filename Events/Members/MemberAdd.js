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
                > **💖 Welcome To Server : \`${member.guild.name}\`**
                
                
                > **👤 User : <@${member.user.id}>**
                
                
                > **🆔 Member ID : \`${member.id}\`**
                
                
                > **♾️ MemberCount : \`${member.guild.memberCount}\`**
                
                
                > **🛒 If You Want To 0rder Anything Open Ticket Here** : **__<#1016039678094348348>__** **or** 0rder From Bot Here **__<#1016355325097549997>__**   
                
                
                > **⚖️ Please Read The Rules** :  **__<#1016798837723111594>__**`)
                .setColor("#03c6fc")
                .setImage("https://media.discordapp.net/attachments/1015983206111133767/1017191584523104306/Comp_1_10.gif")
        
                let sendingWelcome = member.guild.channels.cache.get(data.WelcomeChannel);
                sendingWelcome.send({ embeds: [welcomeEmbed] });
                member.send({content: `
                > **Welcome To $𝐡𝐨𝐩 𝐄𝐦𝐩𝐢𝐫𝐞** <a:C_6T5:1017493692283637791>
                
                > `+"`#`"+`** مرحبا بك ، نورت **<a:C_6T5:1017493692283637791>
                
                
                
                > `+"`#`"+`** تعريف بسيط : شوب امبير هو سرفر مغربي يوفر جميع الخدمات ، حيث يتكون من طاقم عمل ممتاز ، ويعمل علي تطوير خدماته دائما بشكل يليق بكم ، . ويوفر جميع المبيعات - التصاميم - الحسابات - والمزيد في مكان واحد **
                
                
                
                > `+"`#`"+` **لطلب اوردر بما تحتاجه من مبيعات أو تصاميم : **
                <#1018961073145122938> <a:ss_6:1017419001678270565>
                
                > `+"`#`"+` **للتقديم علي فريق العمل و للاستفسار  : **
                <#1018961079080063006> <a:ss_6:1017419001678270565> 
                
                
                
                > `+"`#`"+` **<@${member.id}> نتمني لك السعاده معنا** <a:aYOGA:1017509829528526911> `}).catch((err) => console.log(err))
            }
        })
    })
};