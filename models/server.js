import  express  from "express";
import cors from 'cors';


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //this.iniciarBD();
        this.middleware();
        this.routes();
        
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
      
    }

    listen(){
        
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchado en la direccion: http://localhost:${this.port}/`);
        });
    }

}

export {Server}