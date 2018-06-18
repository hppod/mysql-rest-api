const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'asilo'
});

let convenioModel = {};

convenioModel.getConvenio = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM convenio', (err, rows) => {
            if (err) {
                throw err;
            } else {
                callback(null, rows);
            }
        })
    }
};

convenioModel.insertConvenio = (convenioData, callback) => {
    if (connection) {
        connection.query('INSERT INTO convenio SET ?', convenioData,
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

convenioModel.updateConvenio = (convenioData, callback) => {
    if (connection) {
        const sql = `
        UPDATE convenio SET
        NOME = ${connection.escape(convenioData.NOME)},
        AREA_ATUACAO = ${connection.escape(convenioData.AREA_ATUACAO)}
        WHERE CODIGO_CONVENIO = ${connection.escape(convenioData.CODIGO_CONVENIO)}
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

convenioModel.deleteConvenio = (id, callback) => {
    if (connection) {
        const sql = `SELECT * FROM convenio WHERE CODIGO_CONVENIO = ${connection.escape(id)}`;

        connection.query(sql, (err, row) => {
            if (row) {
                let sql = `DELETE FROM convenio WHERE CODIGO_CONVENIO = ${connection.escape(id)}`;

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

module.exports = convenioModel;