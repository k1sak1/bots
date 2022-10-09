const {
    Client, GatewayIntentBits, Partials, Collection, TextInputStyle, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonStyle, ButtonBuilder
} = require("discord.js");
const { Guilds, MessageContent, GuildMembers, GuildMessages, GuildMessageReactions, DirectMessageReactions } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const schemasug = require("./models/Suggestions");
const schemaguild = require("./models/Guild");
const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, MessageContent, GuildMessageReactions, DirectMessageReactions], 
    partials: [User, Message, GuildMember, ThreadMember],
    fetchAllMembers: true
});

module.exports = client;
const probot = require("probot-tax");
const chalk = require("chalk");

const { loadEvents } = require("./Handlers/eventHandler");

require("dotenv").config();
client.events = new Collection();
client.commands = new Collection();

const { connect } = require("mongoose");
connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log(chalk.green("Client Connected To Database Successfully"))
});

loadEvents(client);

client.on("channelCreate", (channel) => {
    if(channel.parentId !== "1018961036025536582") return;
    let selectProductEmbed = new EmbedBuilder()
        .setTitle("Select a product")
        .setDescription(`> <a:emoji_30:1016678514843471983>  __**المرجو اختيار اسفله احد المنتجات حسب رغبتك**__  <a:aYOGA:1017509829528526911> 

        > <a:emoji_30:1016678514843471983>  __**ان لم ستوفر المنتج الذي تحتاجه في القائمة المرجو عمل امر /need <product>**__ <a:5454:1016467086068957226> `)
        .setColor("#03c6fc")
    let row = new ActionRowBuilder()
        .setComponents(new SelectMenuBuilder()
            .setCustomId("ticket-menu")
            .setPlaceholder("اختر احد المنتجات")
            .addOptions(
                [
                    {
                        label: "Netflix",
                        value: "netflix"
                    },
                    {
                        label: "Spotify",
                        value: "spotify"
                    },
                    {
                        label: "Nitro",
                        value: "nitro"
                    },
                    {
                        label: "Visa",
                        value: "visa"
                    },
                    {
                        label: "Crunchyroll",
                        value: "crunchyroll"
                    },
                    {
                        label: "Steam",
                        value: "steam"
                    },
                    {
                        label: "Nordvpn",
                        value: "nordvpn"
                    },
                    {
                        label: "Bot",
                        value: "bot"
                    },
                    {
                        label: "Methode",
                        value: "methode"
                    },
                    {
                        label: "Followers",
                        value: "followers"
                    },
                    {
                        label: "Instagram Likes",
                        value: "instagram like"
                    }
                ]
            ))
    setTimeout(function(){
        channel.send({embeds: [selectProductEmbed], components: [row]})
    }, 2000)
    client.on("interactionCreate", (interaction) => {
        if(interaction.isSelectMenu()) {
            if(interaction.customId === "ticket-menu") {
                if(interaction.values[0] === "netflix") {
                    interaction.channel.send({content: `> **For ||@everyone|| **<a:ss_6:1017419001678270565> 
                    > **<:netflix:1016467080465363085>  Netflix يحتاج الى شراء <@${interaction.member.id}>**
                    
                    > **المرجو من البائعين المختصين التكلف بالبائع و خدمته** <a:5454:1016467086068957226> 
                    > **/claim ملاحضة : المرجو من البائع الاول الذي يقرا التكت ان ياخد التكت عبر امر** <a:5454:1016467086068957226> `})
                }
                if(interaction.values[0] === "spotify") {
                    interaction.channel.send({content: `> **For ||@everyone|| **<a:ss_6:1017419001678270565> 
                    > **<:Spotify:1017838836241399868>  Spotify يحتاج الى شراء <@${interaction.member.id}>**
                    
                    > **المرجو من البائعين المختصين التكلف بالبائع و خدمته** <a:5454:1016467086068957226> 
                    > **/claim ملاحضة : المرجو من البائع الاول الذي يقرا التكت ان ياخد التكت عبر امر** <a:5454:1016467086068957226> `})
                }
                if(interaction.values[0] === "nitro") {
                    interaction.channel.send({content: `> **For ||@everyone|| **<a:ss_6:1017419001678270565> 
                    > **<a:anitrogaming:1016466871647752344>  Nitro يحتاج الى شراء <@${interaction.member.id}>**
                    
                    > **المرجو من البائعين المختصين التكلف بالبائع و خدمته** <a:5454:1016467086068957226> 
                    > **/claim ملاحضة : المرجو من البائع الاول الذي يقرا التكت ان ياخد التكت عبر امر** <a:5454:1016467086068957226> `})
                }
                if(interaction.values[0] === "visa") {
                    interaction.channel.send({content: `> **For ||@everyone|| **<a:ss_6:1017419001678270565> 
                    > **<:visa_ph:1016466869366030417>  Visa يحتاج الى شراء <@${interaction.member.id}>**
                    
                    > **المرجو من البائعين المختصين التكلف بالبائع و خدمته** <a:5454:1016467086068957226> 
                    > **/claim ملاحضة : المرجو من البائع الاول الذي يقرا التكت ان ياخد التكت عبر امر** <a:5454:1016467086068957226> `})
                }client.gui
                if(interaction.values[0] === "crunchyroll") {
                    interaction.channel.send({content: `> **For ||@everyone|| **<a:ss_6:1017419001678270565> 
                    > **<:Crunchyroll:1017839187636011019>  Crunchyroll يحتاج الى شراء <@${interaction.member.id}>**
                    
                    > **المرجو من البائعين المختصين التكلف بالبائع و خدمته** <a:5454:1016467086068957226> 
                    > **/claim ملاحضة : المرجو من البائع الاول الذي يقرا التكت ان ياخد التكت عبر امر** <a:5454:1016467086068957226> `})
                }
                if(interaction.values[0] === "steam") {
                    interaction.channel.send({content: `> **For ||@everyone|| **<a:ss_6:1017419001678270565> 
                    > **<:Steam:1016467082960973865>  Steam يحتاج الى شراء <@${interaction.member.id}>**
                    
                    > **المرجو من البائعين المختصين التكلف بالبائع و خدمته** <a:5454:1016467086068957226> 
                    > **/claim ملاحضة : المرجو من البائع الاول الذي يقرا التكت ان ياخد التكت عبر امر** <a:5454:1016467086068957226> `})
                }
                if(interaction.values[0] === "nordvpn") {
                    interaction.channel.send({content: `> **For ||@everyone|| **<a:ss_6:1017419001678270565> 
                    > **<:nordvpn:1017839676012376095>  Norvpn يحتاج الى شراء <@${interaction.member.id}>**
                    
                    > **المرجو من البائعين المختصين التكلف بالبائع و خدمته** <a:5454:1016467086068957226> 
                    > **/claim ملاحضة : المرجو من البائع الاول الذي يقرا التكت ان ياخد التكت عبر امر** <a:5454:1016467086068957226> `})
                }
                if(interaction.values[0] === "bot") {
                    interaction.channel.send({content: `> **For ||@everyone|| **<a:ss_6:1017419001678270565> 
                    > **<:1491495610_codbo4statsdiscordbot:1017839890135785482>  Bot يحتاج الى شراء <@${interaction.member.id}>**
                    
                    > **المرجو من البائعين المختصين التكلف بالبائع و خدمته** <a:5454:1016467086068957226> 
                    > **/claim ملاحضة : المرجو من البائع الاول الذي يقرا التكت ان ياخد التكت عبر امر** <a:5454:1016467086068957226> `})
                }
                if(interaction.values[0] === "methode") {
                    interaction.channel.send({content: `> **For ||@everyone|| **<a:ss_6:1017419001678270565> 
                    > **<:gearicon:1017839790407815258>  Methode يحتاج الى شراء <@${interaction.member.id}>**
                    
                    > **المرجو من البائعين المختصين التكلف بالبائع و خدمته** <a:5454:1016467086068957226> 
                    > **/claim ملاحضة : المرجو من البائع الاول الذي يقرا التكت ان ياخد التكت عبر امر** <a:5454:1016467086068957226> `})
                }
                if(interaction.values[0] === "followers") {
                    interaction.channel.send({content: `> **For ||@everyone|| **<a:ss_6:1017419001678270565> 
                    > **  Followers يحتاج الى شراء <@${interaction.member.id}>**
                    
                    > **المرجو من البائعين المختصين التكلف بالبائع و خدمته** <a:5454:1016467086068957226> 
                    > **/claim ملاحضة : المرجو من البائع الاول الذي يقرا التكت ان ياخد التكت عبر امر** <a:5454:1016467086068957226> `})
                }
                if(interaction.values[0] === "instagram likes") {
                    interaction.channel.send({content: `> **For ||@everyone|| **<a:ss_6:1017419001678270565> 
                    > **  Instagram likes يحتاج الى شراء <@${interaction.member.id}>**
                    
                    > **المرجو من البائعين المختصين التكلف بالبائع و خدمته** <a:5454:1016467086068957226> 
                    > **/claim ملاحضة : المرجو من البائع الاول الذي يقرا التكت ان ياخد التكت عبر امر** <a:5454:1016467086068957226> `})
                }
            }
        }
    })
})

client.on("messageCreate", (message) => {
    if(message.channel.id !== "1018961077108752394") return;
    if(message.author.bot) return;
    let noTachfir = message.content
    let withTachfir = noTachfir.replace("nitro","ni5ro").replace("account","ac/ 0unt").replace("Account","ac/ ount").replace("Nitro","Ni5ro").replace("Netflix","Ne1fl1x").replace("netflix","ne1tf1x").replace("visa","vi5a").replace("Visa","V15a").replace("Spotify","Sp0t1fy").replace("spotify","sp0t1fy").replace("steam","5team").replace("Steam","5team").replace("shop","sh0p").replace("Shop","Sh0p").replace("store","st0re").replace("Store","St0re").replace("buy","b//uy/").replace("Buy","B//uy/").replace("Sell","5el1").replace("sell","5el1").replace("Seller","5el1er").replace("cracked","cr4/cked").replace("الشحن","الش7ن").replace("شحن","ش7ن").replace("سبوتيفاي","سبت // فاي").replace("نتفليكس","نتفلي// كس").replace("نيتفلكس","نيت// فلكس").replace("نيتفليكس","نتف/كس").replace("نتفلكس","نت //فلكس").replace("بائع","ب1ئع").replace("ستور","ست9ر").replace("شوب","ش9ب").replace("الحساب","الحس// اب").replace("حسابات","حسا// بات").replace("حساب","حس// اب").replace("هكر","ه //كر").replace("crack","cr4/ck").replace("التهكير","التهك/ ير").replace("هاك","ه1ك").replace("تهكير","تهك //ير").replace("الفيزا","الفيز1").replace("فيزات","فيز1ت").replace("فيزا","في/ز1").replace("نيتروهات","نيتر9ه1ت").replace("النيترو","النيتر9").replace("نيترو","نيتر9").replace("الشراء","الشر1ء").replace("اشتري","1شتري").replace("شراء","شر1ء").replace("لشراء","لشر1ء").replace("متوفر","مت9فر").replace("ابيع","ابي3").replace("لبيع","لبي3").replace("للبيع","للبي3").replace("بيع","بي3").replace("ثمن","ث/ من").replace("الثمن","الث/ من").replace("بثمن","بث/ من")
    message.channel.send({content: `> __**You Message With Tachfir**__ : ${withTachfir}`})
    message.delete();
})

client.login(process.env.TOKEN);
require("./dashboard/server")
