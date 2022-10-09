const { loadCommands } = require("../../Handlers/commandHandler");
const { Client } = require("discord.js");
const { ActivityType } = require("discord.js");
const chalk = require("chalk");

module.exports = {
    name: "ready",
    once: false,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        console.log(chalk.green(`${client.user.tag} is ready!`))
        const welcome = require("../Members/MemberAdd");
        welcome(client);
        loadCommands(client);

        const activities = [
            "/help",
            "Empire $hop",
            "By katakuri.js",
            "/help"
          ];
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
            const newActivity = activities[randomIndex];
    
            client.user.setActivity(newActivity, { type: ActivityType.Playing });
        }, 10000);
    }
};