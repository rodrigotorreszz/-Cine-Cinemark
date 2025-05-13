/*
    Campos:
        title
        description
        director
        genre
        year
        duration
        image
*/

import { Schema, model } from "mongoose";

const moviesSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
        type: String,
        require: true,
    },
    director: {
        type: String,
        require: true,
    },
    genre: {
        type: String,
        require: true,
    },
    year: {
        type: Number,
    },
    duration: {
        type: Number,
    },
    image: {
        type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Movies", moviesSchema);