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

        this.io.on('connection', (usuario) => {
            console.log('usuario conectado');


            usuario.on('disconnect', () => {
                console.log('usuario desconectado')
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