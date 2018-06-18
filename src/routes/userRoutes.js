const User = require('../models/user');

module.exports = function (app) {
    app.get('/convenio', (req, res) => {
        User.getUser((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/convenio', (req, res) => {
        const userData = {
            CODIGO_CONVENIO: null,            
            NOME: req.body.NOME,
            AREA_ATUACAO: req.body.AREA_ATUACAO,
            ENDERECO: req.body.ENDERECO,
            NUMERO: req.body.NUMERO,
            COMPLEMENTO: req.body.COMPLEMENTO,
            BAIRRO: req.body.BAIRRO,
            CIDADE: req.body.CIDADE,
            CEP: req.body.CEP,
            ESTADO: req.body.ESTADO
        };

        User.insertUser(userData, (err, data) => {
            if (data && data.insertId) {
                console.log(data);
                res.json({
                    succes: true,
                    msg: 'ok',
                    data: data
                })
            } else {
                res.status(500).json({
                    sucess: false,
                    msg: 'error'
                })
            }
        })
    });

    app.put('/convenio', (req, res) => {
        const userData = {
            CODIGO_CONVENIO: req.body.CODIGO_CONVENIO,
            NOME: req.body.NOME,
            AREA_ATUACAO: req.body.AREA_ATUACAO,
            ENDERECO: req.body.ENDERECO,
            NUMERO: req.body.NUMERO,
            COMPLEMENTO: req.body.COMPLEMENTO,
            BAIRRO: req.body.BAIRRO,
            CIDADE: req.body.CIDADE,
            CEP: req.body.CEP,
            ESTADO: req.body.ESTADO
        };

        User.updateUser(userData, (err, data) => {
            if (data && data.msg) {
                res.json(data)
            } else {
                res.json({
                    succes: false,
                    msg: 'error'
                })
            }
        })
    });

    app.delete('/convenio/:id', (req, res) => {
        User.deleteUser(req.params.id, (err, data) => {
            if (data && data.msg === 'deleted' || data.msg === 'not exists') {
                res.json({
                    sucess: true,
                    data
                })
            } else {
                res.status(500).json({
                    msg: 'error'
                })
            }
        })
    })
}