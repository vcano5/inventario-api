//require('dotenv').config()
const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser');
const clientes = require('./controllers/clientes.js');
const proveedores = require('./controllers/proveedores.js');
const productos = require('./controllers/productos.js');
const inventario = require('./controllers/inventario.js');

require('dotenv').config()

var app = express();

app.use(cors());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

require('./config/passport');

console.log(`${process.env.DB}, ${process.env.DB_USER}, ${process.env.DB_PASSWORD} ${process.env.DB_HOST} ${process.env.PORT}`)

app.use('/v1', require('./routes'));

app.use(function(req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err)
})


const db = require('./models');
const { usuario } = require('./models');
var isDevelopment = false;//process.env.NODE_ENV === 'development';

db.sequelize.sync({force: isDevelopment})
    .then(() => {
        if(isDevelopment) console.log('Drop and re-sync db.')
        //registro();
    })


var server = app.listen((process.env.PORT || 3003), () => {
    console.log(`Puerto: ${server.address().port}`);
})
/*
const registro = () => {
    const cyberpuerta = proveedores.registarProveedor({
        nombre: 'Juan Carlos',
        direccion: 'CDMX',
        telefono: 5501234567,
        correo: 'atencionaclientes@cyberpuerta.com',
        informacionAdicional: 'Cyberpuerta SA DE CV'
    }) 

    
    setTimeout(() => {
        console.log(cyberpuerta.supplierId)

        const powerbank = productos.crearProducto(
            'Powerbank DELL',
            'Bateria de 20000mAh Marca Dell',
            '75006546060',
            1,
            3000,
            3500,
            'Dell',
            3,
            'no',
            'Nuevo',
            cyberpuerta.supplierId
        )


        const teclado = productos.crearProducto(
            'Teclado Logitech 29323',
            'Logitech RGB 13924 telcas',
            '7500150105343',
            '1',
            '10',
            '15',
            'Logitech',
            '100',
            'no',
            'Nuevo',
            cyberpuerta.supplierId
        )

        setTimeout(() => {
            const teclado_stocks = inventario.addStocks(
                teclado.name,
                160,
                'Usado',
                new Date(),
                teclado.productId,
                cyberpuerta.supplierId
            )

            const powerbank_stocks = inventario.addStocks(
                powerbank.name,
                150,
                'Nuevo',
                new Date(),
                powerbank.productId,
                cyberpuerta.supplierId
            )
        
        
            const cliente1 = clientes.crearCliente({
                nombre: 'John',
                apellido: 'Doe',
                direccion: 'Calle Ficiticia',
                telefono: 6561234567,
                correoElectronico: 'vcano5@example.com'
            })
            
        }, 1000)
        
    //    setTimeout(() => {

    //    }, 5000)
    
       
    }, 1000)


    // const orden1 = clientes.crearOrden(cliente1.customerId, [
    //     {
    //         precio: teclado.price,
    //         fecha: new Date(),
    //         producto: teclado.productId,
    //         cantidad: 1
    //     },
    //     {
    //         precio: powerbank.price,
    //         fecha: new Date(),
    //         producto: powerbank.productId,
    //         cantidad: 3
    //     }
    // ])
}

*/
// registro();

const run = async () => {
    // const bateria = await.productos.crearProducto({

    // })

    // const cyberpuerta = await proveedores.registarProveedor({
    //     nombre: 'Juan Carlos',
    //     direccion: 'CDMX',
    //     telefono: 5501234567,
    //     correo: 'atencionaclientes@cyberpuerta.com',
    //     informacionAdicional: 'Cyberpuerta SA DE CV'
    // }) 

    // const powerbank = await productos.crearProducto(
    //     'Powerbank DELL',
    //     'Bateria de 20000mAh Marca Dell',
    //     '75006546060',
    //     1,
    //     3000,
    //     3500,
    //     'Dell',
    //     3,
    //     'Null',
    //     'Nuevo',
    //     cyberpuerta.supplierId
    // )


    

    // const powerbank_stocks = await inventario.addStocks(
    //     powerbank.name,
    //     150,
    //     'Nuevo',
    //     new Date(),
    //     powerbank.productId,
    //     cyberpuerta.supplierId
    // )

    // const teclado_stocks = await inventario.addStocks(
    //     teclado.name,
    //     160,
    //     'Usado',
    //     new Date(),
    //     teclado.productId,
    //     cyberpuerta.supplierId
    // )


    // const cliente1 = await clientes.crearCliente({
    //     nombre: 'John',
    //     apellido: 'Doe',
    //     direccion: 'Calle Ficiticia',
    //     telefono: 6561234567,
    //     correoElectronico: 'vcano5@example.com'
    // })

    // const orden1 = await clientes.crearOrden(cliente1.customerId, [
    //     {
    //         precio: teclado.price,
    //         fecha: new Date(),
    //         producto: teclado.productId,
    //         cantidad: 1
    //     },
    //     {
    //         precio: powerbank.price,
    //         fecha: new Date(),
    //         producto: powerbank.productId,
    //         cantidad: 3
    //     }
    // ])
}

const debug = async () => {
    // const ventaTeclado = await inventario.removeStocks(
    //     teclado.name,
    //     1,
    //     new Date(),
    //     teclado.productId
    // )

    // const ddlo1 = await clientes.get


    // const orrdenes = await clientes.findAll();
    // console.log(`>> Todos los clientes ${JSON.stringify(orrdenes, null, 2)}`)
    // const sttocks = await inventario.getOut();
    // console.log(`>> Inventario <<\n${JSON.stringify(await inventario.outStock(), null, 2)}`)
    
   

    // const pdres = await proveedores.consultarProveedores();
    // console.log(`>> Proveedores: ${JSON.stringify(pdres, null, 4)}`)
}


process.once('SIGUSR2', function () {
    //process.kill(process.pid, 'SIGUSR2');
    server.close()
  });
  
  process.on('SIGINT', function () {
    // this is only called on ctrl+c, not restart
    //process.kill(process.pid, 'SIGINT');
    server.close()
  });