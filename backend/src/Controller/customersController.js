//Array de metodos (C R U D)
const customersController = {};
import customersModel from "../models/customers.js";

// SELECT
customersController.getcustomers = async (req, res) => {
  const customers = await customersModel.find();
  res.json(customers);
};

// INSERT
customersController.createcustomers = async (req, res) => {
  const { name, email, password, phone, address, active } = req.body;
  const newcustomers = new customersModel({ name, email, password, phone, address, active });
  await newcustomers.save();
  res.json({ message: "customer save" });
};

// DELETE
customersController.deletecustomers = async (req, res) => {
const deletedcustomers = await customersModel.findByIdAndDelete(req.params.id);
  if (!deletedcustomers) {
    return res.status(404).json({ message: "customer dont find" });
  }
  res.json({ message: "customer deleted" });
};

// UPDATE
customersController.updatecustomers = async (req, res) => {

  const { name, email, password, phone, address, active   } = req.body;

  await customersModel.findByIdAndUpdate(
    req.params.id,
    {
        name,
        email,
        password,
        phone,
        address,
        active
    },
    { new: true }
  );

  res.json({ message: "customer update" });
};

export default customersController;