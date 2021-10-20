const db = require('../models');
const Cliente = db.cliente;
const Orden = db.orden;
const DetallesDeOrden = db.detallesDeOrden;
const Inventario = require('./Inventario');
const {v4: uuidv4} = require('uuid');

exports.crearCliente = (cliente) => {
    return Cliente.create({
        customerId: uuidv4(),
        firstName: cliente.nombre,
        lastName: cliente.apellido,
        address: cliente.direccion,
        phone: cliente.telefono,
        email: cliente.correoElectronico
    })
        .then((cliente) => {
            //console.log(`>> Creado cliente: ${JSON.stringify(cliente, null, 4)}]`);
            return cliente;
        })
        .catch((err) => {
            console.error(err)
        })
}

exports.crearOrden = (cliente, detalles) => {
    return Orden.create({
        clientId: cliente,
        orderId: `${uuidv4()}`
    })
        .then((orden) => {
            detalles.forEach(detalles => {
                DetallesDeOrden.create({
                    orderDetailsId: uuidv4(),
                    unitaryPrice: detalles.precio,
                    size: '',
                    quantity: detalles.cantidad,
                    discount: '',
                    total: (detalles.precio * detalles.cantidad),
                    date: detalles.fecha,
                    ordenPadre: orden.orderId,
                    productId: detalles.producto
                })
                .then((detallesDeLaOrden) => {
                    Inventario.removeStocks(
                        detallesDeLaOrden.quantity,
                        new Date(),
                        uuidv4(),
                        'VENTA',
                        orden.orderId
                    )
                })
                .catch((e) => {
                    console.error(e)
                }) 
            })
            //console.log(`>> Creada la orden ${JSON.stringify(orden, null, 4)}`);
            return orden;
        })
        .catch((err) => {
            console.error(err);
        })
}

exports.findOrderByClientId = (clientId) => {
    return Cliente.findByPk(clientId, {include: ['ordenes']})
        .then((orden) => {
            return orden;
        })
        .catch((err) => {
            console.error(err);
        })
}

exports.findOrderByOrderId = (orderId) => {
    return Orden.findByPk(orderId, { include: ['cliente']})
        .then((orden) => {
            return orden;
        })
        .catch((err) => {
            console.error(err);
        })
}

exports.findAll = () => {
    return Cliente.findAll({include: ['ordenes']})
        .then((cliente) => {
            return cliente;
        })
}

