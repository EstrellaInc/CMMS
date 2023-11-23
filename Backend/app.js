const express=require('express'); //Importo libreria de express
const app = express();


const mongoose = require('./database/mongoose');

const List = require('./database/models/list');
const Task = require('./database/models/task');
app.use(express.json()); //Asi el sistema puede intercambiar informacion en este sistema
/*
CORS - CROSS ORIGIN REQUEST SECURITY
localhost://3000 backend api
localhost://4200 front-end

Como corren en diferentes puertos el backend no va a tomar nada de los otros por seguridad, asi que debemos
configurarlo para que lo haga
*/


app.use((req,res,next)=>{ //Middleware para intercambiar sentencias entre frontend y backend
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Acces-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*
List: Create, Update, ReadOne, Readall, delete
Task: Create, Update, ReadOne, Readall, delete
*/

//Creamos una ruta que me permite acceder a todas las listas
app.get('/lists',(req,res)=> {                //"http://localhost:3000/lists" => [ ]
    List.find({})
        .then(lists=>res.send(lists))
        .catch(error=> console.log(error));
}); 

app.post('/lists',(req,res)=>{
    (new List({'title': req.body.title}))
            .save()
            .then((list)=>res.send(list))
            .catch(error=> console.log(error));
});


app.get('/list/:listId',(req,res) =>{
    Lists.find({ _id: req.params.listId})
        .then((list) => res.send(list))
        .catch(error => console.log(error));
});
/*
GET -> TOMAR DATA
POST -> GUARDAR DATA
PUT PATCH -> ACTUALIZAR DATA
DELETE -> ELIMINAR DATA
*/

app.listen(3000,() => console.log("Server is connected on port 3000"));
