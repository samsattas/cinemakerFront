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
import { useEffect, useState } from "react";
import { deleteRoom, postRoom } from "../../utils/RoomStore";

const RoomRegistrationModal = ({ show, close, room }) => {
  const [roomJson, setRoomJson] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (room) {
      setRoomJson(room);
    } else {
      setRoomJson({});
    }
  }, [show]);

  const handleClose = () => {
    setRoomJson({});
    close();
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await postRoom(roomJson).then(() => handleClose());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteRoom(roomJson.id).then(() => handleClose());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setRoomJson({ ...roomJson, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle className="flex justify-between items-center">
        {room ? "Editar Película" : "Registrar Película"}
        <IconButton onClick={handleClose}>
          <Clear />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form className="flex flex-col w-96 py-2 gap-4">
          <TextField
            label="Número de la sala"
            required
            onChange={handleChange}
            name="roomNumber"
            value={roomJson.roomNumber}
          />
          <TextField
            label="Capacidad máxima"
            required
            onChange={handleChange}
            name="capacity"
            value={roomJson.capacity}
          />
        </form>
      </DialogContent>
      <DialogActions
        className="flex justify-evenly
      "
      >
        {!room && (
          <LoadingButton
            onClick={handleSave}
            className="bg-primary hover:bg-blue-800 text-white font-bold rounded-full px-5 py-3 transition-colors duration-300 ease-in-out"
            loading={loading}
          >
            Guardar
          </LoadingButton>
        )}
        {room && (
          <LoadingButton
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full px-5 py-3 transition-colors duration-300 ease-in-out"
            loading={loading}
          >
            Eliminar
          </LoadingButton>
        )}
        {room && (
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

export default RoomRegistrationModal;
