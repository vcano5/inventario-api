const db = require('./models');
const Orden = db.orden;
const Op = db.Op;
const Cliente = db.cliente;


exports.crearOrden = (clienteId, orden) => {
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