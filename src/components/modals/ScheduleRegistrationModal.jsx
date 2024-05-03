import { Clear } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { deleteSchedule, postSchedule } from "../../utils/ScheduleStore";
import { getAllRooms } from "../../utils/RoomStore";
import { getAllMovies } from "../../utils/MovieStore";

const ScheduleRegistrationModal = ({ show, close, schedule }) => {
  const [scheduleJson, setScheduleJson] = useState({});
  const [loading, setLoading] = useState(false);
  const [timeStart, setTimeStart] = useState();
  const [timeEnd, setTimeEnd] = useState();
  const [allMovies, setAllMovies] = useState([]);
  const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    if (schedule) {
      setScheduleJson(schedule);
      setTimeStart(schedule.releaseDate);
    } else {
      setScheduleJson({});
      setTimeStart();
    }
    getMovies();
    getRooms();
  }, [show]);

  const getMovies = async () => {
    try {
      const response = await getAllMovies();
      console.log(response);
      if (response) {
        setAllMovies(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRooms = async () => {
    try {
      const response = await getAllRooms();
      console.log(response);
      if (response) {
        setAllRooms(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setScheduleJson({});
    setTimeStart();
    close();
  };

  const handleSave = async () => {
    let newTimeStart;
    let newTimeEnd;
    if (schedule) {
      newTimeStart = schedule.timeStart;
      newTimeEnd = schedule.timeEnd;
    } else {
      newTimeStart = timeStart?.format("YYYY-MM-DDTHH:mm:ss");
      newTimeEnd = timeEnd?.format("YYYY-MM-DDTHH:mm:ss");
    }
    const newScheduleJson = {
      ...scheduleJson,
      timeStart: newTimeStart,
      timeEnd: newTimeEnd,
    };
    setLoading(true);
    try {
      const response = await postSchedule(newScheduleJson).then(() =>
        handleClose()
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteSchedule(scheduleJson.id).then(() => handleClose());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setScheduleJson({ ...scheduleJson, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle className="flex justify-between items-center">
        {schedule ? "Editar Horario" : "Registrar Horario"}
        <IconButton onClick={handleClose}>
          <Clear />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form className="flex flex-col w-96 py-2 gap-4">
          <FormControl fullWidth>
            <InputLabel>Película</InputLabel>
            <Select
              label="Película"
              name="movie"
              value={scheduleJson.movieId}
              onChange={handleChange}
            >
              {allMovies?.map((movie, index) => (
                <MenuItem key={index} value={movie}>
                  {movie.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Sala</InputLabel>
            <Select
              label="Sala"
              name="room"
              value={scheduleJson.roomId}
              onChange={handleChange}
            >
              {allRooms?.map((room, index) => (
                <MenuItem key={index} value={room}>
                  Sala #{room.roomNumber}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Fecha y hora de inicio *"
              onChange={(newValue) => setTimeStart(newValue)}
              name="timeStart"
              value={dayjs(timeStart)}
            />
            <DateTimePicker
              label="Fecha y hora de finalización *"
              onChange={(newValue) => setTimeEnd(newValue)}
              name="timeStart"
              value={dayjs(timeEnd)}
            />
          </LocalizationProvider>
        </form>
      </DialogContent>
      <DialogActions
        className="flex justify-evenly
      "
      >
        {!schedule && (
          <LoadingButton
            onClick={handleSave}
            className="bg-primary hover:bg-blue-800 text-white font-bold rounded-full px-5 py-3 transition-colors duration-300 ease-in-out"
            loading={loading}
          >
            Guardar
          </LoadingButton>
        )}
        {schedule && (
          <LoadingButton
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full px-5 py-3 transition-colors duration-300 ease-in-out"
            loading={loading}
          >
            Eliminar
          </LoadingButton>
        )}
        {schedule && (
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

export default ScheduleRegistrationModal;
