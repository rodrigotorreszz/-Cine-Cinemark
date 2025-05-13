/*
    Campos:
        name
        email
        password
        phone
        address
        active
*/

import { Schema, model } from "mongoose";

const customersSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
    },

    password: {
      type: String,
      require: true,
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },

    active: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("customers", customersSchema);