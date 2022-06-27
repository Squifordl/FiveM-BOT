const Discord = require("discord.js");
const cheerio = require("cheerio");
const rp = require("request-promise");
const { head } = require("request");

module.exports.run = async (bot, message, args, msg) =>{
    let profile = args.slice(0).join('+');
    if (!profile) return message.reply("Você não especificou nenhuum usuario");

    const URL = (`https://www.tiktok.com/@${profile}`)
    const headerObj = {
        uri: URL
    };
    rp(headerObj)
    .then(html => {
        var $ = cheerio.load(html)
        
        const avatar = $("#app > div.tiktok-19fglm-DivBodyContainer.etsvyce0 > div.tiktok-aeo47e-DivShareLayout.e13s99ws0 > div > div.tiktok-1k3ofna-DivShareLayoutHeader.e13s99ws3 > div.tiktok-1gk89rh-DivShareInfo.e198b7gd2 > div.tiktok-uha12h-DivContainer.e1vl87hj1 > span > img").attr("src");
        const user = $("#app > div.tiktok-19fglm-DivBodyContainer.etsvyce0 > div.tiktok-aeo47e-DivShareLayout.e13s99ws0 > div > div.tiktok-1k3ofna-DivShareLayoutHeader.e13s99ws3 > div.tiktok-1gk89rh-DivShareInfo.e198b7gd2 > div.tiktok-1b331xn-DivShareTitleContainer.e198b7gd3 > h1").text();
        const seguidores = $("#app > div.tiktok-19fglm-DivBodyContainer.etsvyce0 > div.tiktok-aeo47e-DivShareLayout.e13s99ws0 > div > div.tiktok-1k3ofna-DivShareLayoutHeader.e13s99ws3 > h2.tiktok-7k173h-H2CountInfos.e1awr0pt0 > div:nth-child(2) > strong").text();
        const curtidas = $("#app > div.tiktok-19fglm-DivBodyContainer.etsvyce0 > div.tiktok-aeo47e-DivShareLayout.e13s99ws0 > div > div.tiktok-1k3ofna-DivShareLayoutHeader.e13s99ws3 > h2.tiktok-7k173h-H2CountInfos.e1awr0pt0 > div:nth-child(3) > strong").text();
        const bio = $("#app > div.tiktok-19fglm-DivBodyContainer.etsvyce0 > div.tiktok-aeo47e-DivShareLayout.e13s99ws0 > div > div.tiktok-1k3ofna-DivShareLayoutHeader.e13s99ws3 > h2.tiktok-b1wpe9-H2ShareDesc.e1awr0pt3").text();

        const embed = new Discord.RichEmbed()
        .setDescription(`**Perfil encontrado:** [**${user}**](https://www.tiktok.com/@${profile})\n**Seguidores:** ${seguidores}\n**Curtidas:** ${curtidas}\n**${bio}**`)
        .setThumbnail(avatar)
        .setColor("#0051FF")
        .setTimestamp()
        .setFooter(`Comando solicitado por: ${message.author.tag}`)
        message.channel.send(embed)
    })
}

module.exports.help = {
    name: "tiktokprofile"
}