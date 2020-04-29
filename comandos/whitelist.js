const mysql = require("mysql");
module.exports.run = async (bot, message, args) => {
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

    var whitelisted = '1'
    var id = args.join("")
    var sql = `UPDATE vrp_users SET whitelisted = '${whitelisted}' WHERE id = '${id}'`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log (result.affectedRows + `adc to whitelisted ID: ${id}`)
    })
})
}

module.exports.help = {
    name: "whitelist"
}
