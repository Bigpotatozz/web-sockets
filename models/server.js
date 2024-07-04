import  express  from "express";
import cors from 'cors';
import http from 'http';
import {Server as socketio} from 'socket.io';



class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //config sockets
        this.server = http.createServer(this.app);
        this.io = new socketio(this.server);
        //this.iniciarBD();
        this.middleware();
        this.routes();
        this.socketEvents();
        
    }

    /*
    async iniciarBD(){
        await dbConnection();
    }
    */
    middleware(){
        //CORS
        this.app.use(cors());
        //LECTURA DE DATOS
        this.app.use(express.json());
        //HTML
        this.app.use(express.static("public"));
    }

    routes(){

        this.app.get('/api', (req, res) => {
            res.json({
                msg: 'Holaa'
            })
        })

    }

    socketEvents(){

        this.io.on('connection', (socket) => {
            console.log('usuario conectado');
            socket.on('disconnect', () => {
                console.log('usuario desconectado')
            })

            //RCIBE MENSAJES DEL FRONTEND EN TIEMPO REAL
            socket.on('mensaje_cliente',(payload) => {
                console.log(payload);
            })

            socket.on('mensaje_cliente',(payload) => {
                this.io.emit('mensaje_cliente', `Mensaje ${payload} recibido en el servidor`);
            })
        })

    }


    listen(){
        
        this.server.listen(this.port, () => {
            console.log(`Servidor escuchado en la direccion: http://localhost:${this.port}/`);
        });
    }

}

export {Server}