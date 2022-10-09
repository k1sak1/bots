const { ActionRowBuilder, SelectMenuBuilder, Client, EmbedBuilder, SlashCommandBuilder, ChatInputCommandInteraction, Options } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Display all the available commands."),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         * @param {Client} client
         */
        async execute(interaction, client) {
            const row = new ActionRowBuilder();
            const menu = new SelectMenuBuilder()
                .setCustomId("selecthelp")
                .setPlaceholder("اختر احد انواع الاوامر")
                .addOptions([
                    {
                        label: "🛡️ - Admins",
                        description: "اظهار اوامر الادارة",
                        value: "admins"
                    },
                    {
                        label: "⚙️ - Settings",
                        description: "اظهار اوامر اعدادات السيرفر",
                        value: "settings"
                    },
                    {
                        label: "🌍 - General",
                        description: "اظهار الاوامر العامة",
                        value: "general"
                    },
                    {
                        label: "🛒 - Shop",
                        description: "اظهار اوامر الشوب",
                        value: "shop"
                    }
                ])
            row.addComponents(menu);
            let mainEmbed = new EmbedBuilder()
                .setAuthor({
                    name: interaction.member.user.username,
                    iconURL: interaction.member.user.avatarURL()
                })
                .setTitle(`About ${client.user.username}`)
                .setThumbnail("https://images-ext-2.discordapp.net/external/sFft0vol_fRA2IX05Tdvz3cMu4luD7Hc3Rg7HMdud8c/https/cdn.discordapp.com/icons/699242022749470840/a_e7c49dfdda7c50b854769fc3769b1605.gif")
                .setDescription(`🤖 مرحبا بك في قائمة المساعدة الخاصة بالبوت 🤖

                ✅ المرجو اختيار احد القوائم اسفله حسب رغبتك ✅`)
                .setFooter({ text: "Dev by : @katakuri.js", iconURL: "https://cdn.discordapp.com/avatars/954505482696028170/a12aad6adf17bb4ad7750ceed6703899.png?size=1024" })
                .setURL("https://www.instagram.com/katakuri.js/")
                .setColor("#03c6fc")
                .setImage("https://media.discordapp.net/attachments/1015983206111133767/1017191584523104306/Comp_1_10.gif")

            let sendHelp = await interaction.reply({embeds: [mainEmbed], components: [row]})
            client.on("interactionCreate", (interaction) => {
                if (interaction.isSelectMenu()) {
                    if (interaction.customId === "selecthelp") {
                        if (interaction.values[0] === "admins") {
                            interaction.update({embeds: [new EmbedBuilder()
                                .setAuthor({
                                    name: interaction.member.user.username,
                                    iconURL: interaction.member.user.avatarURL()
                                })
                                .setTitle(`Admin commands of ${client.user.username}`)
                                .setThumbnail("https://images-ext-2.discordapp.net/external/iOsDFY0KJEs_4JtnQII6u01o_hg0JwS4yYZTK-I0tfg/https/images-ext-2.discordapp.net/external/sFft0vol_fRA2IX05Tdvz3cMu4luD7Hc3Rg7HMdud8c/https/cdn.discordapp.com/icons/699242022749470840/a_e7c49dfdda7c50b854769fc3769b1605.gif")
                                .setDescription("**__اليك قائمة بجميع الاوامر الخاصة بالادارة__** 🔰 :"+"\n\n> `"+`/ban`+"` `"+"User Tag | ID"+"`"+"  :  __تبنيد عضو ما__ "+"\n> `"+`/unban`+"` `"+"User Tag | ID"+"`"+"  :  __لالغاء بند عضو ما__"+"\n> `"+`/mute`+"` `"+"User Tag | ID"+"`"+"     :  __لاسكات عضو ما__"+"\n> `"+`/unmute`+"` `"+"User Tag | ID"+"`"+"  :  __لالغاء اسكات عضو ما__"+"\n> `"+`/lock`+"`"+"  :  __لاغلاء الرسائل بالغرفة__"+"\n> `"+`/unlock`+"`"+"  :  __لفتح الرسائل بالغرفة__"+"\n> `"+`/role`+"` `"+"User Tag | ID"+"`"+" `"+"Role Tag | ID"+"`  :  __لاعطاء رتبة لشخص ما__"+"\n> `"+`/re-role`+"` `"+"User Tag | ID"+"`"+" `"+"Role Tag | ID"+"`  : __ازالة رتبة شخص__"+"\n> `"+`/hide`+"`"+"  :  __لاخفاء الغرفة__"+"\n> `"+`/show`+"`"+"  :  __لاظهار الغرفة__"+"\n> `"+`/add-emoji`+"` `"+"Emoji"+"`"+"  :  __لاضافة ايموجي جديد للسيرفر__"+"\n> `"+`/nick-name`+"` `"+"User Tag | ID"+"`"+" `"+"New Nickname"+"`  :   __تغيير النيك نايم__"+"\n> `"+`/dm`+"` `"+"User Tag | ID"+"`"+" `"+"Message"+"`  :  __ارسال رسالة خاص بالبوت__"+"\n> `"+`/warn`+"` `"+"User Tag | ID"+"`"+"  :  __لتحذير شخص ما__ "+"\n> `"+`/clear`+"`"+"  :  __لمسح جميع رسائل الغرفة__"+"\n> `"+`/embed`+"` `"+"Message"+"`"+"  :  __لارسال رسالة بشكل ايمباد عن طريق البوت__ "+"\n> `"+`/say`+"` `"+"Message"+"`"+"  :  __لارسال رسالة عن طريق البوت__ ")
                                .setURL("https://www.instagram.com/katakuri.js/")
                                .setFooter({ text: "Dev by : @katakuri.js", iconURL: "https://cdn.discordapp.com/avatars/954505482696028170/a12aad6adf17bb4ad7750ceed6703899.png?size=1024" })
                                .setColor("#03c6fc")
                                .setImage("https://media.discordapp.net/attachments/1015983206111133767/1017191584523104306/Comp_1_10.gif")]})
                        } else if (interaction.values[0] === "settings") {
                            interaction.update({embeds: [new EmbedBuilder()
                                .setAuthor({
                                    name: interaction.member.user.username,
                                    iconURL: interaction.member.user.avatarURL()
                                })
                                .setTitle(`Server settings commands of ${client.user.username}`)
                                .setThumbnail("https://images-ext-2.discordapp.net/external/iOsDFY0KJEs_4JtnQII6u01o_hg0JwS4yYZTK-I0tfg/https/images-ext-2.discordapp.net/external/sFft0vol_fRA2IX05Tdvz3cMu4luD7Hc3Rg7HMdud8c/https/cdn.discordapp.com/icons/699242022749470840/a_e7c49dfdda7c50b854769fc3769b1605.gif")
                                .setDescription("**__اليك قائمة بجميع اوامر اعدادات السيرفر التي تحتاجها__** 🔰 :"+"\n\n> `"+`/set-name`+"` `"+"New Name"+"`"+"  :  __تغيير اسم السيرفر__ "+"\n> `"+`/set-icon`+"` `"+"New Icon URL"+"`"+"  :  __تغيير صورة السيرفر__"+"\n> `"+`/set-banner`+"` `"+"New Banner URL"+"`"+"     :  __لتغيير بانر السيرفر__"+"\n> `"+`/set-welcome`+"` `"+"Channel Tag | ID"+"`"+"  :  __تحديد غرفة الترحيب__"+"\n> `"+`$/set-invites`+"` `"+"Channel Tag | ID"+"`"+"  :  __لتحديد غرفة الانفايت__"+"\n> `"+`/set-boost`+"` `"+"Channel Tag | ID"+"`"+"  :  __لتحديد غرفة البوست__"+"\n> `"+`/set-suggestions`+"` `"+"Channel Tag | ID"+"`"+"  :  __لتحديد غرفة الاقتراحات__"+"\n> `"+`/set-ticket`+"` `"+"Channel Tag | ID"+"`"+"  : __لتحديد غرفة التكت__"+"\n> `"+`/set-ticketbuycategory`+"` `"+"Category ID"+"`"+"  :  __لتحديد قسم تكت البيع المفتوحة__"+"\n> `"+`/set-ticketsupportcategory`+"` `"+"Category ID"+"`"+"  :  __لتحديد قسم تكت الدعم المفتوحة__"+"\n> `"+`/set-tax`+"` `"+"Channel Tag | ID"+"`"+"  :  __لتحديد غرفة التاكس__"+"\n> `"+`/set-feedback`+"` `"+"Channel Tag | ID"+"`"+"  :   __لتحديد غرفة الفيدباك__"+"\n> `"+`/set-line`+"` `"+"Line URL"+"`"+"  :  __لتحديد الخط__"+"\n> `"+`/add-linecategory`+"` `"+"Category/Channel ID"+"`"+"  :  __لاضافة غرفة او قسم للخط التلقائي__ "+"\n> `"+`/del-linecategory`+"` `"+"Category/Channel ID"+"`"+"  :  __لازالة غرفة او قسم من الخط التلقائي__ "+"\n> `"+`/set-prefix`+"` `"+"New Prefix"+"`"+"  :  __لتحديد بريفكس البوت__"+"\n> `"+`/set-sellerrole`+"` `"+"Role Tag | ID"+"`"+"  :  __لتحديد رتبة البائع__ "+"\n> `"+`/set-activity`+"` `"+"Activity"+"`"+"  :  __لتحديد حالة البوت__ "+"\n> `"+`/set-logs`+"` `"+"Channel ID"+"`"+"  :  __لتحديد غرفة اللوغس_ "+"\n> `"+`/set-color`+"` `"+"Hex Format Color (#FFFFFF)"+"`"+"  :  __لتحديد لون الامباد __ "+"\n> `"+`/set-prefix`+"` `"+"Prefix"+"`"+"  :  __لتحديد  البريفكس __ ")
                                .setURL("https://www.instagram.com/katakuri.js/")
                                .setFooter({ text: "Dev by : @katakuri.js", iconURL: "https://cdn.discordapp.com/avatars/954505482696028170/a12aad6adf17bb4ad7750ceed6703899.png?size=1024" })
                                .setColor("#03c6fc")
                                .setImage("https://media.discordapp.net/attachments/1015983206111133767/1017191584523104306/Comp_1_10.gif")]})
                        } else if (interaction.values[0] === "general") {
                            interaction.update({embeds: [new EmbedBuilder()
                                .setAuthor({
                                    name: interaction.member.user.username,
                                    iconURL: interaction.member.user.avatarURL()
                                })
                                .setTitle(`General commands of ${client.user.username}`)
                                .setThumbnail("https://images-ext-2.discordapp.net/external/iOsDFY0KJEs_4JtnQII6u01o_hg0JwS4yYZTK-I0tfg/https/images-ext-2.discordapp.net/external/sFft0vol_fRA2IX05Tdvz3cMu4luD7Hc3Rg7HMdud8c/https/cdn.discordapp.com/icons/699242022749470840/a_e7c49dfdda7c50b854769fc3769b1605.gif")
                                .setDescription("**__اليك قائمة بجميع الاوامر العامة بالسيرفر__** 🔰 :"+"\n\n> `"+`/ping`+"`"+"  :  __لارسال بينغ السيرفر__ "+"\n> `"+`/server`+"`"+"  :  __اضهار جميع معلومات السيرفر__"+"\n> `"+`/user`+"`"+"     :  __اضهار معلومات حولك__"+"\n> `"+`/avatar`+"`"+"  :  __اضهار صورتك__"+"\n> `"+`/tax`+"` `"+"Number"+"`"+"  :  __لتحديد تاكس ما__"+"\n> `"+`/play`+"`"+"  :  __لتشغيل اغنية__"+"\n> `"+`/pause`+"`"+"  :  __لايقاف مؤقت لاغنية__"+"\n> `"+`/stop`+"`"+"  :  __لايقاف الغنية__"+"\n> `"+`/queue`+"`"+"  :  __لاضهار قائمة الانتضار للاغاني__"+"\n> `"+`/leave`+"`"+"  :  __للخروج من السيرفر هه__"+"\n> `"+`/banme`+"`"+"  :  __لتبنيد نفسك هه__")
                                .setURL("https://www.instagram.com/katakuri.js/")
                                .setFooter({ text: "Dev by : @katakuri.js", iconURL: "https://cdn.discordapp.com/avatars/954505482696028170/a12aad6adf17bb4ad7750ceed6703899.png?size=1024" })
                                .setColor("#03c6fc")
                                .setImage("https://media.discordapp.net/attachments/1015983206111133767/1017191584523104306/Comp_1_10.gif")]})
                        } else if (interaction.values[0] === "shop") {
                            interaction.update({embeds: [new EmbedBuilder()
                                .setAuthor({
                                    name: interaction.member.user.username,
                                    iconURL: interaction.member.user.avatarURL()
                                })
                                .setTitle(`Shop commands of ${client.user.username}`)
                                .setURL("https://www.instagram.com/katakuri.js/")
                                .setThumbnail("https://images-ext-2.discordapp.net/external/iOsDFY0KJEs_4JtnQII6u01o_hg0JwS4yYZTK-I0tfg/https/images-ext-2.discordapp.net/external/sFft0vol_fRA2IX05Tdvz3cMu4luD7Hc3Rg7HMdud8c/https/cdn.discordapp.com/icons/699242022749470840/a_e7c49dfdda7c50b854769fc3769b1605.gif")
                                .setDescription("**__اليك قائمة بجميع الاوامر الخاصة بالشوب__** 🔰 :"+"\n ")
                                .addFields(
                                    { name: "`"+`[Client] /come`+"`"+" `"+"user`", value: "لاخبار البائع او المشتري بالقدوم", inline: true },
                                    { name: "`"+`[Client] /done`+"`", value: "يتم ارسالها من طرف المشتري او البائع عند الانتهاء", inline: true },
                                    { name: "`"+`[Admin] /claim`+"`", value: "لاخد التكت و الاستمرار مع المشتري", inline: true },
                                    { name: "`"+`[Client] /need`+"`"+" `"+"product`", value: "عند احتياج المشتري منتج غير متوفر", inline: true },
                                    { name: "`"+`[Admin] /close`+"`", value: "لاغلاق التكت", inline: true },
                                    { name: "`"+`[Admin] /delete`+"`", value: "لمسح التكت", inline: true },
                                    { name: "`"+`[Admin] /open`+"`", value: "لفتح التكت بعد غلقها", inline: true },
                                    { name: "`"+`[Admin] /rename`+"`"+" `"+"name`", value: "عند احتياج   غير متوفر", inline: true }
                                )
                                .setFooter({ text: "Dev by @katakuri.js", iconURL: "https://cdn.discordapp.com/avatars/954505482696028170/a12aad6adf17bb4ad7750ceed6703899.png?size=1024" })
                                .setColor("#03c6fc")
                                .setImage("https://media.discordapp.net/attachments/1015983206111133767/1017191584523104306/Comp_1_10.gif")]})
                        }
                    }
                }
            })
        }
}