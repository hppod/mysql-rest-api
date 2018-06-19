const Paciente = require('../models/paciente');

module.exports = function (app) {
    app.get('/paciente', (req, res) => {
        Paciente.getPaciente((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/paciente', (req, res) => {
        const pacienteData = {
            CODIGO_PESSOA: null,
            NOME: req.body.NOME,
            ESTADO_CIVIL: req.body.ESTADO_CIVIL,
            CPF: req.body.CPF,
            RG: req.body.RG,
            DATA_NASCIMENTO: req.body.DATA_NASCIMENTO,
            SEXO: req.body.SEXO,
            NATURALIDADE: req.body.NATURALIDADE,
            ENDERECO: req.body.ENDERECO,
            NUMERO: req.body.NUMERO,
            COMPLEMENTO: req.body.COMPLEMENTO,
            BAIRRO: req.body.BAIRRO,
            CIDADE: req.body.CIDADE,
            CEP: req.body.CEP,
            ESTADO: req.body.ESTADO,
            DATA_ENTRADA: req.body.DATA_ENTRADA,
            DATA_SAIDA: req.body.DATA_SAIDA,
        };

        Paciente.insertPaciente(pacienteData, (err, data) => {
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

    app.put('/paciente', (req, res) => {
        const pacienteData = {
            CODIGO_PESSOA: req.body.CODIGO_PESSOA,
            NOME: req.body.NOME,
            ESTADO_CIVIL: req.body.ESTADO_CIVIL,
            CPF: req.body.CPF,
            RG: req.body.RG,
            DATA_NASCIMENTO: req.body.DATA_NASCIMENTO,
            SEXO: req.body.SEXO,
            NATURALIDADE: req.body.NATURALIDADE,
            ENDERECO: req.body.ENDERECO,
            NUMERO: req.body.NUMERO,
            COMPLEMENTO: req.body.COMPLEMENTO,
            BAIRRO: req.body.BAIRRO,
            CIDADE: req.body.CIDADE,
            CEP: req.body.CEP,
            ESTADO: req.body.ESTADO,
            DATA_ENTRADA: req.body.DATA_ENTRADA,
            DATA_SAIDA: req.body.DATA_SAIDA,
        };

        Paciente.updatePaciente(pacienteData, (err, data) => {
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

    app.delete('/paciente/:id', (req, res) => {
        Paciente.deletePaciente(req.params.id, (err, data) => {
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
    });
}