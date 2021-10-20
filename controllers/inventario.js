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

exports.removeStocks = (nombre, cantidad, fecha, id, razon, orden) => {
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

exports.auditInventory = () => {
    return Inventario.findAll({})
        .then((inventario) => {
            return inventario;
        })
        .catch((err) => {
            console.error(err);
        })
}

exports.in = () => {
    return Inventario.find({type: 'IN'})
        .then((inventario) => {
            return Inventario;
        })
        .catch((err) => {
            console.error(err);
        })
}

exports.out = () => {
    return Inventario.find({type: 'OUT'})
        .then((inventario) => {
            return Inventario;
        })
        .catch((err) => {
            console.error(err);
        })
}