import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true, 
    },

    email: {
      type: String,
      required: false, 
      unique: true, 
    },

    password: {
      type: String,
      required: true, 
    },

    phone: {
      type: String,
      required: true, 
    },

    address: {
      type: String,
      required: false, 
    },

    position: {
      type: String,
      required: false, 
    },

    hire_Date: {
      type: Date,
      required: true, 
    },

    salary: {
      type: Number,
      required: false, 
    },

    active: {
      type: Boolean,
      required: true, 
    },
  },
  {
    timestamps: true, 
    strict: false, 
  }
);

export default model("Employee", employeeSchema); 
