const cheerio = require("cheerio"); // npm install cheerio
const Discord = require("discord.js"); // npm install discord.js
const rp = require("request-promise"); // npm i request-promise

const URL = "https://www.trackyserver.com/server/sdasdas-473370";
module.exports.run = async (bot, message, args) => {
    const headerObj = {
        uri: URL
    };
    rp(headerObj)
        .then(html => {
            var $ = cheerio.load(html);

            const players = $("#general > table > tbody > tr:nth-child(5) > td:nth-child(2) > strong").text()
            const status = $("#general > table > tbody > tr:nth-child(4) > td:nth-child(2)").text()
            const embed = new Discord.RichEmbed()
                .setTitle("Servidor Status")
                .addField(`Players On`,`${players}`,true)
                .addField(`Status`,`${status}`,true)
                .setColor("#0000FF")
                .setThumbnail(message.guild.iconURL)
                .setTimestamp()
                .setFooter(`Comando solicitado por: ${message.author.tag}`,`${message.author.avatarURL}`)
                message.channel.send(embed)
        })
}
module.exports.help = {
    name: "status"
}
