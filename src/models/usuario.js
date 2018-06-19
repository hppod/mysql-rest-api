const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'asilo'
});

let usuarioModel = {};

usuarioModel.getUsuario = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM usuario', (err, rows) => {
            if (err) {
                throw err;
            } else {
                callback(null, rows);
            }
        })
    }
};

usuarioModel.insertUsuario = (usuarioData, callback) => {
    if (connection) {
        connection.query('INSERT INTO usuario SET ?', usuarioData,
            (err, result) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, { 'insertId': result.insertId })
                }
            }
        )
    }
};

usuarioModel.updateUsuario = (usuarioData, callback) => {
    if (connection) {
        const sql = `
        UPDATE usuario SET
        LOGON = ${connection.escape(usuarioData.LOGON)},
        EMAIL = ${connection.escape(usuarioData.EMAIL)},
        SENHA = ${connection.escape(usuarioData.SENHA)}
        WHERE CODIGO_USUARIO = ${connection.escape(usuarioData.CODIGO_USUARIO)}
        `

        connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                callback(null, {
                    "msg": "sucess"
                })
            }
        })
    }
}

usuarioModel.deleteUsuario = (id, callback) => {
    if (connection) {
        const sql = `SELECT * FROM usuario WHERE CODIGO_USUARIO = ${connection.escape(id)}`;

        connection.query(sql, (err, row) => {
            if (row) {
                let sql = `DELETE FROM usuario WHERE CODIGO_USUARIO = ${connection.escape(id)}`;

                connection.query(sql, (err, row) => {
                    if (err) {
                        throw err;
                    } else {
                        callback(null, {
                            msg: 'deleted'
                        })
                    }
                })
            } else {
                callback(null, {
                    msg: 'not exists'
                })
            }
        });
    }
}

module.exports = usuarioModel;