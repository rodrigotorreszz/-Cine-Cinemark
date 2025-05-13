//Array de metodos (C R U D)
const moviesController = {};
import MoviesModel from "../models/movies.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});


moviesController.createMovie = async (req, res) => {
  try {
    const { title, description, director, genre, year, duration} = req.body;
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = result.secure_url;
    }

    const newMovie = new MoviesModel({ title, description, director, genre, year, duration, image: imageUrl });
    newMovie.save();

    res.json({ message: "movie saved" });
  } catch (error) {
    console.log("error" + error);
  }
};

moviesController.updateMovies = async (req, res) => {
  try {
    const { title, description, director, genre, year, duration} = req.body;
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = result.secure_url;
    }

    await MoviesModel.findByIdAndUpdate(req.params.id,
      {
        title, description, director, genre, year, duration
      }, {new: true}
    )
res.json({ message: "Movie Updated"});
  }catch (error) {

  }

};

// SELECT
moviesController.getMovies = async (req, res) => {
  const movies = await MoviesModel.find();
  res.json(movies);
};


// DELETE
moviesController.deleteMovies = async (req, res) => {
  const deletedMovies = await MoviesModel.findByIdAndDelete(req.params.id);
  if (!deletedMovies) {
    return res.status(404).json({ message: "Pelicula no encontrada" });
  }
  res.json({ message: "movie deleted" });
};


export default moviesController;