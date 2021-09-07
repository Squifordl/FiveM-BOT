const Discord = require("discord.js")
const config = require("./config.json");
const fs = require("fs");
const bot = new Discord.Client();

bot.commands = new Discord.Collection();

fs.readdir("./comandos/", (err, files) => {
    if (err) console.error(err);

    let arquivojs = files.filter(f => f.split(".").pop() == "js");
    arquivojs.forEach((f, i) => {
        let props = require(`./comandos/${f}`);
        console.log(`O comando ${f} foi carregado com Sucessoo.`)
        bot.commands.set(props.help.name, props);
    });
});


        bot.on("ready", () => {
            console.log(`bot foi iniciado, com ${bot.users.cache.size} usuários, em ${bot.channels.cache.size} canais, em ${bot.guilds.cache.size} servidores.`);
            bot.user.setActivity(`Smoke é God`, {
                type: "PLAYING", url: "https://www.twitch.tv/"
                 })
            });

bot.on("message", async message => {

    if (message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if (!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, message, args);

});

   bot.login(config.token); 