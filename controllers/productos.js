const db = require('../models')
const Producto = db.producto;
const { v4: uuidv4 } = require('uuid');

exports.crearProducto = (nombreAMostrar, desc, codigoDeB, activo, costo, precio, marca, minimo, categoria, condicion, proveedor, stocksId) => {
    return Producto.create({
        productId: uuidv4(),
        name: nombreAMostrar,
        description: desc,
        barcode: codigoDeB,
        active: activo,
        cost: costo,
        price: precio,
        brand: marca,
        minimumStock: minimo,
        category: categoria,
        condition: condicion,

    })
}

exports.buscarPorMarca = (marca) => {
    return Producto.find({ brand: marca })
        .then((resultados) => {
            return resultados;
        })
        .catch((err) => {
            console.error(err);
        })
}