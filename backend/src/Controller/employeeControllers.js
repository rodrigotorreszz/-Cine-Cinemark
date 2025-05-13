
const employeeController = {};
import employeeModel from "../models/employees.js";

// SELECT
employeeController.getemployee = async (req, res) => {
  const employee = await employeeModel.find();
  res.json(employee);
};

// INSERT
employeeController.createemployee = async (req, res) => {
  const { name, email, password, phone, address, position, hire_Date, salary, active } = req.body;
  const newemployee= new employeeModel({ name, email, password, phone, address, position, hire_Date, salary, active });
  await newemployee.save();
  res.json({ message: "employee save" });
};

// DELETE
employeeController.deleteemployee = async (req, res) => {
const deletedemployee = await employeeModel.findByIdAndDelete(req.params.id);
  if (!deletedemployee) {
    return res.status(404).json({ message: "employee dont find" });
  }
  res.json({ message: "employee deleted" });
};

// UPDATE
employeeController.updateemployee = async (req, res) => {
  const { name, email, password, phone, address, position, hire_Date, salary, active  } = req.body;
  // Actualizo
  await employeeModel.findByIdAndUpdate(
    req.params.id,
    {
        name,
        email,
        password,
        phone,
        address,
        position,
        hire_Date,
        salary,
        active 
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "employee update" });
};

export default employeeController;