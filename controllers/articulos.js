const db = require('../models');
const Articulo = db.Articulo;
const Op = db.Sequelize.Op;

const consultasValidas = ["articulo", "categoria", "cantidad", "ventas"];

function searchBy(req, res) {
    var objKeys = Object.keys(req.query);
    if(objKeys.length > 0) {
        let valido = false;
        for(cV of consultasValidas) {
            if(objKeys[0] == cV) {
                validO = true;
            }
        }
        if(valido) {
            const k = objKeys[0];
            const v = req.query[k];
            const q = JSON.parse(`{"${k}": "${v}"}`);

            Articulo.findAll({where: q})   
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(err => {
                    res.status(500).send({mensaje: 'Ocurrio un error al procesar tu solicitud. Intentalo de nuevo.', solicitud: q});
                })
        }
        else {
            res.status(501).send({mensaje: 'Tipo no soportado', validas: consultasValidas});
        }
    }
    else {
        res.status(409).send({mensaje: 'Faltan parametros en la consulta.'})
    }
}

function createItem(req, res) {
    if(req.body !== undefined) {
        Articulo.create(req.body).then(data => {
            res.status(201).send(data);
        })
    }
}

function readAr(req, res) {
    if(req.params.id !== undefined) {
        Articulo.findByPk(req.query.id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({mensaje: 'Ocurrio un error al procesar tu solicitud', consulta: {id: req.query.id}})
            })
    }
}