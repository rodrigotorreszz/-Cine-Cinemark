import express from "express";
import moviesRoutes from "./src/routes/movies.js";
import customersRoutes from "./src/routes/customers.js";
import employeeRoutes from "./src/routes/employees.js";
import registerEmployesRoutes from "./src/routes/registerEmployees.js";
import cookieParser from "cookie-parser";
import loginRoute from "./src/routes/login.js";
import logoutRoute from "./src/routes/logout.js";
import registerClient from "./src/routes/registerClients.js";
import passwordRecoveryRoutes from "./src/routes/passwordRecovery.js";


// Creo una constante que es igual a la libreria que importé
const app = express();
//Que acepte datos en json
app.use(express.json());
//Que acepte cookies en postman
app.use(cookieParser());
// Definir las rutas de las funciones que tendrá la página web
app.use("/api/movies", moviesRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/employee", employeeRoutes);

app.use("/api/registerEmployees", registerEmployesRoutes);
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);

app.use("/api/registerClients", registerClient);
app.use("/api/passwordRecovery", passwordRecoveryRoutes);


// Exporto la constante para poder usar express en otros archivos
export default app;