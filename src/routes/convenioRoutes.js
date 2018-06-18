const Convenio = require('../models/convenio');

module.exports = function (app) {
    app.get('/convenio', (req, res) => {
        Convenio.getConvenio((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/convenio', (req, res) => {
        const convenioData = {
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

        Convenio.insertConvenio(convenioData, (err, data) => {
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
        const convenioData = {
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

        Convenio.updateConvenio(convenioData, (err, data) => {
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
        Convenio.deleteConvenio(req.params.id, (err, data) => {
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