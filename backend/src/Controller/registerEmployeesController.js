import EmployeeModel from "../models/employees.js";
import bcryptjs from "bcryptjs"; 
import jsonwebtoken from "jsonwebtoken"; 
import { config } from "../config.js";

const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {
  const {
        name,
        email,
        password,
        phone,
        address,
        position,
        hire_Date,
        salary,
        active
  } = req.body;

  try {
    //Verificamos si el empleado ya existe
    const existEmployee = await EmployeeModel.findOne({ email });
    if (existEmployee) {
      return res.json({ message: "Empleado ya existe" });
    }

    // Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // Guardemos el empleado nuevo
    const newEmployee = new EmployeeModel({
        name,
        email,
        password: passwordHash,
        phone,
        address,
        position,
        hire_Date,
        salary,
        active
    });

    await newEmployee.save();

    // --> TOKEN <--
    jsonwebtoken.sign(
      //1-Que voy a guardar
      { id: newEmployee._id },
      //2-secreto
      config.JWT.secret,
      //3- cuando expira
      { expiresIn: config.JWT.expiresIn },
      //4- funcion flecha
      (error, token) => {
        if (error) console.log(error);
        res.cookie("authToken", token);
        res.json({message: "Empleado registrado"})
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export default registerEmployeesController;