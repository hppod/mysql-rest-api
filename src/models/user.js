const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'asilo'
});

let userModel = {};

userModel.getUser = (callback) => {
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

userModel.insertUser = (userData, callback) => {
    if (connection) {
        connection.query('INSERT INTO convenio SET ?', userData,
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

userModel.updateUser = (userData, callback) => {
    if (connection) {
        const sql = `
        UPDATE convenio SET
        NOME = ${connection.escape(userData.NOME)},
        AREA_ATUACAO = ${connection.escape(userData.AREA_ATUACAO)}
        WHERE CODIGO_CONVENIO = ${connection.escape(userData.CODIGO_CONVENIO)}
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

userModel.deleteUser = (id, callback)=>{
    if(connection){
        const sql = `SELECT * FROM convenio WHERE CODIGO_CONVENIO = ${connection.escape(id)}`;

        connection.query(sql, (err, row)=>{
            if(row){
                let sql = `DELETE FROM convenio WHERE CODIGO_CONVENIO = ${connection.escape(id)}`;

                connection.query(sql, (err, row)=>{
                    if(err){
                        throw err;
                    }else{
                        callback(null,{
                            msg:'deleted'
                        })
                    }
                })
            }else{
                callback(null,{
                    msg: 'not exists'
                })
            }
        });
    }
}

module.exports = userModel;