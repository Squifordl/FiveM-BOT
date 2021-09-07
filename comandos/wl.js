const mysql = require("mysql");
module.exports.run = async (bot, message, args) => {
    // Conexão com banco de dados.
    let con = mysql.createConnection({
        host: "IP_HOST",
        user: "USER_NAME",
        password: "PASS_USER",
        database: "DATABASE_NAME"
    })
con.connect(function(err) {
    if(err) {
        console.log('[MYSQL] error connect' + err.stack)
        return err;
    }
   
    let userid = input.replace(/\D+/g, ''); // Recebendo o ID.
    if (!userid) return message.channel.send('Mencione o ID para aprovar a Whitelist.'); // Verificando se foi mencionado o ID.
    if (Number.isNaN(parseInt(userid))) return message.reply('O ID é somente numeros né :)'); // O ID mencionado não é um número.
    var sql = `UPDATE vrp_users SET whitelisted = '1' WHERE id = '${userid}'`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        message.channel.send(result.affectedRows + ` ${message.author} - Você aprovou o passaporte: ${userid} com sucesso!`)
    })
})
}

module.exports.help = {
    name: "wl"
}
