const db = require('../models');
const Orden = db.orden;
const Op = db.Op;
const Cliente = db.cliente;


exports.crearOrden = (clienteId, orden) => {
    clientId = req.query.idC;
    orden = req.query.orden;
    return Orden.create({
        dateOfOrder: orden.fecha,
        orderDetails: orden.detalles,
        customerID: clienteId
    })
        .then((orden) => {
            console.log('>> Orden creada: ' + JSON.stringify(orden, null, 4));
            return orden;
        })
        .catch((err) => {
            console.error('Error al crear un comentario: ', err)
        })
}

exports.getOrders = (req, res) => {
    Orden.findAll({})
        .then(ordenes => {
            res.send(ordenes).status(200)
        })
        .catch(err => {
            console.error(err);
        })
}

exports.getOrderById = (req, res) => {
    Orden.findAll({where: {orderId: req.params.orderId}, include: ['detallesdeorden']})
        .then(orden => {
            res.send(orden).status(200)
        })
}