const express = require("express");
const router = express.Router();
const client = require("../../index");




router.get('/', (req, res) => {
    let numa = 0;
    client.guilds.cache.forEach((g)=>{
        numa += g.memberCount
    });
    res.render('index.pug', {
        serversStat: client.guilds.cache.size.toString(),
        usersStat: numa.toString()
    })
});
router.get('/invite', (req, res) => {
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=1019225212736249896&redirect_uri=http://localhost:3000/auth-guild&response_type=code&permissions=8&scope=bot%20applications.commands')
});
router.get('/support', (req, res) => {
    res.redirect('https://discord.gg/ruc5GTnG6F')
});
router.get('/commands', (req, res) => {
    res.render('commands.pug', {
        subtitle: 'Commands',
        categories: [
            {name: 'Administration',icon: 'fas fa-gavel'},
            {name: 'Moderation', icon: ''},
            {name: 'Public', icon: ''},
            {name: 'Giveaways', icon: ''},
            {name: 'Music', icon: 'fas fa-music'}
        ],
        commands: [
            {name: 'ban', category: 'Administration', description: 'Ban someone.'},
            {name: 'clear', category: 'Administration', description: 'Clear specific amount of messages from a channel.'},
            {name: 'kick', category: 'Administration', description: 'Kick someone.'},
            {name: 'mute', category: 'Administration', description: 'Timeout someone from text and voice for a specific time.'},
            {name: 'unban', category: 'Administration', description: 'Unban someone.'},
            {name: 'unmute', category: 'Administration', description: 'Remove timeou from someone.'},
            {name: 'lock', category: 'Moderation', description: 'Lock the channel from public chat.'},
            {name: 'unlock', category: 'Moderation', description: 'Unlock the channel for the public chat.'},
            {name: 'role', category: 'Administration', description: 'Giving a role to someone.'},
            {name: 'rm-role', category: 'Administration', description: 'Removing role from someone.'},
            {name: 'warn', category: 'Administration', description: 'Warning someone.'},
            {name: 'unwarn', category: 'Administration', description: 'Remove warning from someone.'},
            {name: 'hide', category: 'Moderation', description: 'Hide a channel from public view.'},
            {name: 'show', category: 'Moderation', description: 'Show a channel to the public.'},
            {name: 'add-emoji', category: 'Moderation', description: 'Add an emoji to the server.'},
            {name: 'dm', category: 'Moderation', description: 'Sends a message in private of someone.'},
            {name: 'embed', category: 'Moderation', description: 'Sends a message with embed.'},
            {name: 'say', category: 'Moderation', description: 'Sends a message.'}
        ],
        commandsString: JSON.stringify([
            {name: 'ban', category: 'Administration', description: 'Ban someone.'},
            {name: 'clear', category: 'Administration', description: 'Clear specific amount of messages from a channel.'},
            {name: 'kick', category: 'Administration', description: 'Kick someone.'},
            {name: 'mute', category: 'Administration', description: 'Timeout someone from text and voice for a specific time.'},
            {name: 'unban', category: 'Administration', description: 'Unban someone.'},
            {name: 'unmute', category: 'Administration', description: 'Remove timeou from someone.'},
            {name: 'lock', category: 'Moderation', description: 'Lock the channel from public chat.'},
            {name: 'unlock', category: 'Moderation', description: 'Unlock the channel for the public chat.'},
            {name: 'role', category: 'Administration', description: 'Giving a role to someone.'},
            {name: 'rm-role', category: 'Administration', description: 'Removing role from someone.'},
            {name: 'warn', category: 'Administration', description: 'Warning someone.'},
            {name: 'unwarn', category: 'Administration', description: 'Remove warning from someone.'},
            {name: 'hide', category: 'Moderation', description: 'Hide a channel from public view.'},
            {name: 'show', category: 'Moderation', description: 'Show a channel to the public.'},
            {name: 'add-emoji', category: 'Moderation', description: 'Add an emoji to the server.'},
            {name: 'dm', category: 'Moderation', description: 'Sends a message in private of someone.'},
            {name: 'embed', category: 'Moderation', description: 'Sends a message with embed.'},
            {name: 'say', category: 'Moderation', description: 'Sends a message.'}
        ])
    })
});

module.exports = router;