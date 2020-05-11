const mysql = require("mysql");
const Discord = require("discord.js");
module.exports.run = async (bot, message, args ) => {
    message.delete()
    if(message.content.toLowerCase() === 's!wl' && message.channel.id === '708512366207434756') {
        message.delete()
        let guild = message.guild;
        let channelc = await guild.createChannel(`whitelist-${message.author.username}`,{
            type: 'text',
            parent: '708512366207434754',
            permissionOverwrites:[
                {
                    allow: ['VIEW_CHANNEL','READ_MESSAGE_HISTORY','EMBED_LINKS','ATTACH_FILES','SEND_MESSAGES'],
                    id: message.author.id
                },
                {
                    deny: 'VIEW_CHANNEL',
                    id: guild.id
                }
            ]

        });
        channelc.send(`<@${message.author.id}>\nOlá, Qual o nome do seu personagem?`).then(async msg => {
            let nome = msg.channel.createMessageCollector(m => m.author.id === message.author.id, {
                max: 1
            });
            nome.on("collect", () => {
                channelc.send(`Ok, seu nome é ${nome.collected.first().content}`)
                channelc.send(`Qual seu ID?`).then(async msg2 => {
                    let id = msg.channel.createMessageCollector(m => m.author.id === message.author.id, {
                        max: 1
                    });
                    id.on("collect", () => {
                        channelc.send(`Ok, seu id é ${id.collected.first().content}`)
                        channelc.delete()
                        let con = mysql.createConnection({
                            host: 'localhost',
                            user: "root",
                            password: "",
                            database: "allstar"
                        });
                        con.connect(function(err) {
                            if(err) {
                                console.log('[MYSQL] falha ao conectar\n' + err.stack)
                                return err;
                            }
                            var whitelisted = "1";
                            var sql = `UPDATE vrp_users SET whitelisted = '${whitelisted}' WHERE id = '${id.collected.first().content}'`;
                            con.query(sql, function (err, result) {
                                if(err) throw err;
                                console.log(result.affectedRows + "registrados"),
                                bot.channels.get("708512440031248447").send(`O ID ${id.collected.first().content} foi adicionado com sucesso`)
                            })
                        })

                    })
                })
            })
        })

    }
}
module.exports.help = {
    name: "wl"
}