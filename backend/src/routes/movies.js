import express from "express";
import moviesController from "../Controller/MoviesController.js";
import multer from "multer";

const router = express.Router();

const upload = multer({dest: "public/"})

router
  .route("/")
  .get(moviesController.getMovies)
  .post(upload.single("image"), moviesController.createMovie);


router
  .route("/")
  .get(moviesController.getMovies)
  .post(moviesController.createMovie);

router
  .route("/:id")
  .put(moviesController.updateMovies)
  .delete(moviesController.deleteMovies);

export default router;