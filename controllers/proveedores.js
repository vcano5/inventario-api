const db = require('../models');
const Proveedor = db.proveedor;
const {v4: uuidv4} = require('uuid');

exports.registarProveedor = (detallesProveedor) => {
    return Proveedor.create({
        supplierId: uuidv4(),
        name: detallesProveedor.nombre,
        address: detallesProveedor.direccion,
        phone: detallesProveedor.telefono,
        email: detallesProveedor.correo,
        otherDetails: detallesProveedor.informacionAdicional
    })
    .then((proveedor) => {
        console.log(`>> Registrado proveedor ${JSON.stringify(proveedor, null, 4)}`);
        return proveedor;
    })
    .catch(err => {
        console.error(err);
    })
}

exports.consultarProveedorPorId = (proveedorId) => {
    return Proveedor.findByPk(proveedorId)
        .then((proveedor) => {
            return proveedor;
        })
        .catch((err) => {
            console.error(err);
        })
}

exports.consultarProveedorPorEmail = (proveedorEmail) => {
    return Proveedor.findBy(proveedorEmail)
        .then((proveedor) => {
            return proveedor;
        })
        .catch((err) => {
            console.error(err);
        })
}

exports.consultarProveedores = () => {
    return Proveedor.findAll({include: ['inventarios']})
        .then((proveedores) => {
            return proveedores;
        })
}