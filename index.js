import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import "./src/database/dbConnection"
import rolesRouter from './src/routes/roles.routes';
import usuariosRouter from "./src/routes/usuarios.routes";
import materiasRouter from "./src/routes/materias.routes";
import comisionesRouter from "./src/routes/comisiones.routes";
import inscripcionesRouter from "./src/routes/inscripciones.routes";


dotenv.config();
const app = express();
app.set("PORT", process.env.PORT || 4010)
app.listen(app.get("PORT"), () =>{
    console.log("Estoy en el puerto "+ app.get("PORT"))
})

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cors()); 
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, `/public`)))

app.use(`/api/roles`, rolesRouter)
app.use(`/api/auth`, usuariosRouter)
app.use(`/api/materias`, materiasRouter)
app.use(`/api/comisiones`, comisionesRouter)
app.use(`/api/inscripciones`, inscripcionesRouter)