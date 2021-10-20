require('dotenv').config()
const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser');
const clientes = require('./controllers/clientes.js');
const proveedores = require('./controllers/proveedores.js');
const productos = require('./controllers/productos.js');
const inventario = require('./controllers/inventario.js');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require('./config/passport');

app.use('/v1', require('./routes'));

app.use(function(req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err)
})


const db = require('./models');
var isDevelopment = process.env.NODE_ENV === 'development';

db.sequelize.sync({force: isDevelopment})
    .then(() => {
        if(isDevelopment) console.log('Drop and re-sync db.')
        run();
    })


var server = app.listen((process.env.PORT || 3003), () => {
    console.log(`Puerto: ${server.address().port}`);
})


const run = async () => {
    // const bateria = await.productos.crearProducto({

    // })

    const cyberpuerta = await proveedores.registarProveedor({
        nombre: 'Juan Carlos',
        direccion: 'CDMX',
        telefono: 5501234567,
        correo: 'atencionaclientes@cyberpuerta.com',
        informacionAdicional: 'Cyberpuerta SA DE CV'
    }) 

    const powerbank = await productos.crearProducto(
        'Powerbank DELL',
        'Bateria de 20000mAh',
        '75006546060',
        1,
        3000,
        3500,
        'Dell',
        3,
        'Null',
        'Nuevo',
        cyberpuerta.supplierId
    )


    const teclado = await productos.crearProducto(
        'Teclado Logitech 29323',
        'Logitech RGB 13924 telcas',
        '7500150105343',
        '1',
        '10',
        '15',
        'Logitech',
        '100',
        'Undefined',
        'Nuevo',
        cyberpuerta.supplierId
    )

    const powerbank_stocks = await inventario.addStocks(
        powerbank.name,
        150,
        'Nuevo',
        new Date(),
        powerbank.productId,
        cyberpuerta.supplierId
    )

    const teclado_stocks = await inventario.addStocks(
        teclado.name,
        150,
        'Usado',
        new Date(),
        teclado.productId,
        cyberpuerta.supplierId
    )


    const cliente1 = await clientes.crearCliente({
        nombre: 'John',
        apellido: 'Doe',
        direccion: 'Calle Ficiticia',
        telefono: 6561234567,
        correoElectronico: 'vcano5@example.com'
    })

    const orden1 = await clientes.crearOrden(cliente1.customerId, [
        {
            precio: teclado.price,
            fecha: new Date(),
            producto: teclado.productId,
            cantidad: 1
        },
        {
            precio: powerbank.price,
            fecha: new Date(),
            producto: powerbank.productId,
            cantidad: 3
        }
    ])

    // const ventaTeclado = await inventario.removeStocks(
    //     teclado.name,
    //     1,
    //     new Date(),
    //     teclado.productId
    // )

    // const ddlo1 = await clientes.get


    const orrdenes = await clientes.findAll();
    console.log(`>> Todos los clientes ${JSON.stringify(orrdenes, null, 2)}`)

    // const sttocks = await inventario.auditInventory();
    // console.log(`>> Inventario <<\n${JSON.stringify(sttocks, null, 4)}`)

    const pdres = await proveedores.consultarProveedores();
    console.log(`>> Proveedores: ${JSON.stringify(pdres, null, 4)}`)
}


