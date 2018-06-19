const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'asilo'
});

let pacienteModel = {};

pacienteModel.getPaciente = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM pessoa', (err, rows) => {
            if (err) {
                throw err;
            } else {
                callback(null, rows);
            }
        })
    }
};

pacienteModel.insertPaciente = (pacienteData, callback) => {
    if (connection) {
        connection.query('INSERT INTO pessoa SET ?', pacienteData,
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

pacienteModel.updatePaciente = (pacienteData, callback) => {
    if (connection) {
        const sql = `
        UPDATE pessoa SET
        NOME = ${connection.escape(pacienteData.NOME)},
        ESTADO_CIVIL = ${connection.escape(pacienteData.ESTADO_CIVIL)},
        CPF = ${connection.escape(pacienteData.CPF)},
        RG = ${connection.escape(pacienteData.RG)},
        DATA_NASCIMENTO = ${connection.escape(pacienteData.DATA_NASCIMENTO)},
        SEXO = ${connection.escape(pacienteData.SEXO)},
        NATURALIDADE = ${connection.escape(pacienteData.NATURALIDADE)},
        ENDERECO = ${connection.escape(pacienteData.ENDERECO)},
        NUMERO = ${connection.escape(pacienteData.NUMERO)},
        COMPLEMENTO = ${connection.escape(pacienteData.COMPLEMENTO)},
        BAIRRO = ${connection.escape(pacienteData.BAIRRO)},
        CEP = ${connection.escape(pacienteData.CEP)},
        CIDADE = ${connection.escape(pacienteData.CIDADE)},
        ESTADO = ${connection.escape(pacienteData.ESTADO)},
        DATA_ENTRADA = ${connection.escape(pacienteData.DATA_ENTRADA)},
        DATA_SAIDA = ${connection.escape(pacienteData.DATA_SAIDA)}
        WHERE CODIGO_PESSOA = ${connection.escape(pacienteData.CODIGO_PESSOA)}
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

pacienteModel.deletePaciente = (id, callback) => {
    if (connection) {
        const sql = `SELECT * FROM pessoa WHERE CODIGO_PESSOA = ${connection.escape(id)}`;

        connection.query(sql, (err, row) => {
            if (row) {
                let sql = `DELETE FROM pessoa WHERE CODIGO_PESSOA = ${connection.escape(id)}`;

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

module.exports = pacienteModel;