const Usuario = require('../models/usuario');

module.exports = function (app) {
    app.get('/usuario', (req, res) => {
        Usuario.getUsuario((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/usuario', (req, res) => {
        const usuarioData = {
            CODIGO_USUARIO: null,
            LOGON: req.body.LOGON,
            EMAIL: req.body.EMAIL,
            SENHA: req.body.SENHA
        };

        Usuario.insertUsuario(usuarioData, (err, data) => {
            if (data && data.insertId) {
                console.log(data);
                res.json({
                    succes: true,
                    msg: 'ok',
                    data: data
                })
            } else {
                res.status(500).json({
                    succes: false,
                    msg: 'error'
                })
            }
        })
    });

    app.put('/usuario', (req, res) => {
        const usuarioData = {
            CODIGO_USUARIO: req.body.CODIGO_USUARIO,
            LOGON: req.body.LOGON,
            EMAIL: req.body.EMAIL,
            SENHA: req.body.SENHA
        };

        Usuario.updateUsuario(usuarioData, (err, data) => {
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

    app.delete('/usuario/:id', (req, res) => {
        Usuario.deleteUsuario(req.params.id, (err, data) => {
            if (data && data.msg === 'deleted' || data.msg === 'not exists') {
                res.json({
                    succes: true,
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