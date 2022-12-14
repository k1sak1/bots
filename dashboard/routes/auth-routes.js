const express = require("express");
const authClient = require("../modules/auth-client");
const router = express.Router();
const sessions = require("../modules/sessions")

router.get('/login', (req, res, next) => 
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=1019225212736249896&redirect_uri=https://dashnigger.herokuapp.com/auth&response_type=code&scope=identify%20guilds'))

router.get('/auth-guild', async (req, res) => {
    try {
        const key = res.cookies.get('key');
        sessions.update(key)
    } finally {
        res.redirect('/dashboard')
    }
})

router.get('/auth', async (req, res) => {
    try {
        const code = req.query.code;
        const key = await authClient.getAccess(code);
        res.cookies.set('key', key)
        res.redirect('/dashboard')
    } catch {
        res.redirect('/')
    }
    
})

router.get('/logout', (req, res) => {
    res.cookies.set('key', '');
    res.redirect('/')
})

module.exports = router;