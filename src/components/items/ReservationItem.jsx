import { Divider } from "@mui/material";

const ReservationItem = ({ reservation, onClick }) => {
  return (
    <div
      className="flex items-start cursor-pointer min-w-52 bg-white rounded-lg shadow-md w-full"
      onClick={onClick}
    >
      <img
        src={reservation.schedule.movie.image}
        alt={reservation.schedule.movie.title}
        className="h-60 rounded-lg"
      />
      <div className="flex flex-col gap-3 p-4">
        <h2 className="font-bold text-wrap">
          Nombre: {reservation.clientName}
        </h2>
        <p className="text-base">Correo: {reservation.clientEmail}</p>
        <p className="text-base">Teléfono: {reservation.clientPhone}</p>
        <p className="text-base">
          Numero de asientos: {reservation.numberOfSeats}
        </p>
      </div>
      <Divider orientation="vertical" flexItem />
      <div className="flex flex-col gap-3 p-4">
        <h2 className="font-bold text-wrap">
          {reservation.schedule.movie.title}
        </h2>
        <p>Duración: {reservation.schedule.movie.duration}</p>
        <p className="text-base">
          {reservation.schedule.timeStart.split("T")[1].split(".")[0]} -
          {reservation.schedule.timeEnd.split("T")[1].split(".")[0]}
        </p>
      </div>
    </div>
  );
};

export default ReservationItem;
