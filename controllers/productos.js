const db = require('../models')
const Producto = db.producto;
const { v4: uuidv4 } = require('uuid');

// exports.crearProducto = (nombreAMostrar, desc, codigoDeB, activo, costo, precio, marca, minimo, categoria, condicion, proveedor, stocksId) => {
//     return Producto.create({
//         productId: uuidv4(),
//         name: nombreAMostrar,
//         description: desc,
//         barcode: codigoDeB,
//         active: activo,
//         cost: costo,
//         price: precio,
//         brand: marca,
//         minimumStock: minimo,
//         category: categoria,
//         condition: condicion,

//     })
// }

exports.crearProducto = (req, res) => {
    //console.log(req)
    datos = req.body;
    //console.log(JSON.parse(datos))
    //console.log(`Me tengo que dar a ${datos}`)
    console.log(req.body)
    Producto.create({
        productId: uuidv4(),
        name: datos.name,
        description: datos.description,
        barcode: datos.barcode,
        active: 1,
        cost: datos.cost,
        price: datos.price,
        brand: datos.brand,
        minimumStock: datos.minimumStock,
        condition: datos.condition,
        category: datos.category
    })
        .then(producto => {
            res.send(201)
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

exports.buscarPorId = (req, res) => {
    console.log('BUSCAR POR ID')
    if(req.params.productId) {
        Producto.findAll({where: {productId: req.params.productId}, include: ['inventarios']})
        .then((resultados) => {
            res.send(resultados[0]);
        })
        .catch(err => {
            console.error(err);
        })
    }
    else {
        res.send(400)
    }
}

exports.todosLosProductos = (req, res) => {
    console.log('TODOS LOS PRODUCTOS')
    Producto.findAll({include: ['inventarios']})
        .then((resultados) => {
            console.log(resultados)
            res.send(resultados)
        })
        .catch(err => {
            console.error(err);
        })
}