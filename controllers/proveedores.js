const db = require('../models');
const Proveedor = db.proveedor;
const {v4: uuidv4} = require('uuid');

exports.registarProveedor = (req, res) => {
    detallesProveedor = req.body;
    Proveedor.create({
        supplierId: uuidv4(),
        name: detallesProveedor.name,
        address: detallesProveedor.address,
        phone: detallesProveedor.phone,
        email: detallesProveedor.email,
        otherDetails: detallesProveedor.otherDetails
    })
    .then((proveedor) => {
        console.log(`>> Registrado proveedor ${JSON.stringify(proveedor, null, 4)}`);
        res.send({message: 'Ok'}).status(200)
    })
    .catch(err => {
        res.send({message: '500'}).status(500)
    })
}

exports.consultarProveedorPorId = (req, res) => {
    proveedorId = req.params.id;
    Proveedor.findByPk(proveedorId)
        .then((proveedor) => {
            res.send(proveedor);
        })
        .catch((err) => {
            res.send({message: 'Ocurrio un error', code: 500});
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