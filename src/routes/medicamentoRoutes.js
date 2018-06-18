const Medicamento = require('../models/medicamento');

module.exports = function (app) {

    app.get('/medicamento', (req, res) => {
        Medicamento.getMedicamento((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/medicamento', (req, res) => {
        const medicamentoData = {
            CODIGO_MEDICAMENTO: null,
            NOME: req.body.NOME,
            DOSE: req.body.DOSE
        };

        Medicamento.insertMedicamento(medicamentoData, (err, data) => {
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

    app.put('/medicamento', (req, res) => {
        const medicamentoData = {
            CODIGO_MEDICAMENTO: req.body.CODIGO_MEDICAMENTO,
            NOME: req.body.NOME,
            DOSE: req.body.DOSE
        };

        Medicamento.updateMedicamento(medicamentoData, (err, data) => {
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

    app.delete('/medicamento/:id', (req, res) => {
        Medicamento.deleteMedicamento(req.params.id, (err, data) => {
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