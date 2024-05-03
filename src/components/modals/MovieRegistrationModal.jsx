import { Clear } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { deleteMovie, postMovie } from "../../utils/MovieStore";

const MovieResgistrationModal = ({ show, close, movie }) => {
  const [movieJson, setMovieJson] = useState({});
  const [loading, setLoading] = useState(false);
  const [releaseDate, setReleaseDate] = useState();

  useEffect(() => {
    if (movie) {
      setMovieJson(movie);
      setReleaseDate(movie.releaseDate);
    } else {
      setMovieJson({});
      setReleaseDate();
    }
  }, [show]);

  const handleClose = () => {
    setMovieJson({});
    setReleaseDate();
    close();
  };

  const handleSave = async () => {
    let newReleaseDate;
    if (movie) {
      newReleaseDate = movie.releaseDate;
    } else {
      newReleaseDate = releaseDate?.format("YYYY-MM-DD");
    }
    const newMovieJson = {
      ...movieJson,
      releaseDate: newReleaseDate,
    };
    setLoading(true);
    try {
      const response = await postMovie(newMovieJson);
      if (response || movie) {
        handleClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteMovie(movieJson.id).then(() => handleClose());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setMovieJson({ ...movieJson, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle className="flex justify-between items-center">
        {movie ? "Editar Película" : "Registrar Película"}
        <IconButton onClick={handleClose}>
          <Clear />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form className="flex flex-col w-96 py-2 gap-4">
          <TextField
            label="Título"
            required
            onChange={handleChange}
            name="title"
            value={movieJson.title}
          />
          <TextField
            label="Director"
            required
            onChange={handleChange}
            name="director"
            value={movieJson.director}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de estreno *"
              onChange={(newValue) => setReleaseDate(newValue)}
              name="releaseDate"
              value={dayjs(releaseDate)}
            />
          </LocalizationProvider>
          <TextField
            label="Duración"
            required
            onChange={handleChange}
            name="duration"
            value={movieJson.duration}
          />
          <TextField
            label="URL del poster"
            required
            onChange={handleChange}
            name="image"
            value={movieJson.image}
          />
        </form>
      </DialogContent>
      <DialogActions
        className="flex justify-evenly
      "
      >
        {!movie && (
          <LoadingButton
            onClick={handleSave}
            className="bg-primary hover:bg-blue-800 text-white font-bold rounded-full px-5 py-3 transition-colors duration-300 ease-in-out"
            loading={loading}
          >
            Guardar
          </LoadingButton>
        )}
        {movie && (
          <LoadingButton
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full px-5 py-3 transition-colors duration-300 ease-in-out"
            loading={loading}
          >
            Eliminar
          </LoadingButton>
        )}
        {movie && (
          <LoadingButton
            onClick={handleSave}
            className="bg-primary hover:bg-blue-800 text-white font-bold rounded-full px-5 py-3 transition-colors duration-300 ease-in-out"
            loading={loading}
          >
            Guardar cambios
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default MovieResgistrationModal;
