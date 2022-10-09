const OAuthClient = require('disco-oauth');
const client = new OAuthClient('1019225212736249896', 'ye1aqv-t-pLkxA1Fp8igQqrJOqVhnEUe');

client.setRedirect('https://dashnigger.herokuapp.com/auth');
client.setScopes('identify', 'guilds');

module.exports = client;