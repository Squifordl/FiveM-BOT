const Discord = require("discord.js");
const cheerio = require("cheerio");
const rp = require("request-promise");

const URL = "https://fivem-list.cz/all-servers/detail/82";
module.exports.run = async (bot, message, args) => {
    const headerObj = {
        uri: URL
    };
    rp(headerObj)
        .then(html => {
            var $ = cheerio.load(html);

            const players = $("body > div.container-top > div.container.detail > div:nth-child(4) > div:nth-child(1) > table > tbody").text()
            const embed = new Discord.RichEmbed()
            .setTitle("Lista de players online no servidor/Ping do mesmo")
            .setDescription(`${players}`)
            .setColor("#0051FF")
            .setThumbnail(message.guild.iconURL)
            .setTimestamp()
            .setFooter(`Comando solicitado por: ${message.author.tag}`,`${message.author.avatarURL}`)
            message.channel.send(embed)
        })
}
module.exports.help = {
    name: "playerlist"
}
