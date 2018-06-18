const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'asilo'
});

let medicamentoModel = {};

medicamentoModel.getMedicamento = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM medicamento', (err, rows) => {
            if (err) {
                throw err;
            } else {
                callback(null, rows);
            }
        })
    }
};

medicamentoModel.insertMedicamento = (medicamentoData, callback) => {
    if (connection) {
        connection.query('INSERT INTO medicamento SET ?', medicamentoData,
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

medicamentoModel.updateMedicamento = (medicamentoData, callback) => {
    if (connection) {
        const sql = `
        UPDATE medicamento SET
        NOME = ${connection.escape(medicamentoData.NOME)},
        DOSE = ${connection.escape(medicamentoData.DOSE)}
        WHERE CODIGO_MEDICAMENTO = ${connection.escape(medicamentoData.CODIGO_MEDICAMENTO)}
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
};

medicamentoModel.deleteMedicamento = (id, callback) => {
    if (connection) {
        const sql = `SELECT * FROM medicamento WHERE CODIGO_MEDICAMENTO = ${connection.escape(id)}`;

        connection.query(sql, (err, row) => {
            if (row) {
                let sql = `DELETE FROM medicamento WHERE CODIGO_MEDICAMENTO = ${connection.escape(id)}`;

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
};

module.exports = medicamentoModel;