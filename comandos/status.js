const cheerio = require("cheerio"); // npm install cheerio
const Discord = require("discord.js"); // npm install discord.js
const rp = require("request-promise"); // npm i request-promise

const URL = "https://www.trackyserver.com/server/brasil-mirage-roleplay-1221964";
module.exports.run = async (bot, message, args) => {
    const headerObj = {
        uri: URL
    };
    rp(headerObj)
        .then(html => {
            var $ = cheerio.load(html);

            const players = $("#general > table > tbody > tr:nth-child(5) > td:nth-child(2) > strong").text()
            const status = $("#general > table > tbody > tr:nth-child(4) > td:nth-child(2)").text()
              
            let embed = new Discord.MessageEmbed()
              .setTitle("Status do Servidor | Mirage RolePlay")
              .setColor("RANDOM")
              .setDescription(`Players on: ${players}\nStatus: ${status}`)
              .setFooter(`Comando solicitado por: ${message.author.tag}`)
              message.channel.send(embed)
        })
}
module.exports.help = {
    name: "status"
}
