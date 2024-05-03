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
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  deleteReservation,
  postReservation,
} from "../../utils/ReservationStore";

const ReservationRegistrationModal = ({ show, close, reservation }) => {
  const [reservationJson, setReservationJson] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reservation) {
      setReservationJson(reservation);
    } else {
      setReservationJson({});
    }
  }, [show]);

  const handleClose = () => {
    setReservationJson({});
    close();
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await postReservation(reservationJson).then(() =>
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
      const response = await deleteReservation(reservationJson.id).then(() =>
        handleClose()
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setReservationJson({ ...reservationJson, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle className="flex justify-between items-center">
        {reservation ? "Editar Película" : "Registrar Película"}
        <IconButton onClick={handleClose}>
          <Clear />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form className="flex flex-col w-96 py-2 gap-4">
          <TextField
            label="Nombre del cliente"
            required
            onChange={handleChange}
            name="clientName"
            value={reservationJson.clientName}
          />
          <TextField
            label="Teléfono"
            required
            onChange={handleChange}
            name="clientPhone"
            value={reservationJson.clientPhone}
          />
          <TextField
            label="Email"
            required
            onChange={handleChange}
            name="clientEmail"
            value={reservationJson.clientEmail}
          />
          <TextField
            label="Número de asientos"
            required
            type="number"
            onChange={handleChange}
            name="numberOfSeats"
            value={reservationJson.numberOfSeats}
          />
          <FormControl fullWidth>
            <InputLabel>Horario</InputLabel>
            <Select
              label="Horario"
              name="schedule"
              value={reservationJson.schedule}
              onChange={handleChange}
            ></Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions
        className="flex justify-evenly
      "
      >
        {!reservation && (
          <LoadingButton
            onClick={handleSave}
            className="bg-primary hover:bg-blue-800 text-white font-bold rounded-full px-5 py-3 transition-colors duration-300 ease-in-out"
            loading={loading}
          >
            Guardar
          </LoadingButton>
        )}
        {reservation && (
          <LoadingButton
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full px-5 py-3 transition-colors duration-300 ease-in-out"
            loading={loading}
          >
            Eliminar
          </LoadingButton>
        )}
        {reservation && (
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

export default ReservationRegistrationModal;
