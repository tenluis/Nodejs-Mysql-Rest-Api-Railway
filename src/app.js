import express from "express"; //formato de ecmascript, pero se necesita habiliar los mudulos con "type": "module"
import employeesRoutes from './routes/employees.routes.js'; //se puede coloca cualquier nombre xq es un export default
import indexRoutes from './routes/index.routes.js'; 

const app = express();

//esto antes de la rutas para que pueda leer los json del request
app.use(express.json());

//routes - endpoints
app.use('/API',employeesRoutes);
app.use('/API',indexRoutes);

//midleware
app.use((req,res,next) => { //si la url no coincide con ninguna de las anteriores lanza el error
    res.status(404).json({
        message: 'Endpoint Not found'
    });
})

export default app;