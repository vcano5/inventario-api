const db = require('../models');
const Inventario = db.inventario;
const {v4: uuidv4} = require('uuid');

exports.addStocks = (nombre, cantidad, condicion, fecha, producto, proveedor) => {
    return Inventario.create({
        stockId: uuidv4(),
        type: 'IN',
        quantity: cantidad,
        date: fecha,
        productId: producto,
        supplierId: proveedor,
        reason: 'COMPRA'
    })
}

exports.removeStocks = (cantidad, fecha, id, razon, orden) => {
    return Inventario.create({
        stockId: uuidv4(),
        type: 'OUT',
        quantity: cantidad,
        date: fecha,
        productId: id,
        orderId: orden,
        reason: razon
    })
}

exports.auditInventory = (req, res) => {
    Inventario.findAll({include: ['proveedore', 'ordene']})
        .then((inventario) => {
            res.send(inventario)// inventario;
        })
        .catch((err) => {
            res.status(500).send(err)
            // console.error(err);
        })
}

exports.getIn = (req, res) => {
    Inventario.findAll({where: {type: 'IN'}})
        .then((inventario) => {
            res.send(inventario);
        })
        .catch((err) => {
            res.send(err).status(500)
            // console.error(err);
        })
}

exports.getOut = (req, res) => {
    Inventario.findAll({where: {type: 'OUT'}})
        .then((inventario) => {
            res.send(inventario);
        })
        .catch((err) => {
            res.send(err).status(500)
            //console.error(err);
        })
}

exports.getById = (req, res) => {
    Inventario.findAll({where: {stockId: req.params.id}})
        .then(data => {
            res.status(200).send(data)
        })
}