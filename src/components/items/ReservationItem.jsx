const ReservationItem = ({ reservation, onClick }) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer min-w-52 "
      onClick={onClick}
    >
      <h2 className="font-bold text-wrap">{reservation.clientName}</h2>
      <p className="text-base">{reservation.clientEmail}</p>
      <p className="text-base">{reservation.clientPhone}</p>
      <p className="text-base">{reservation.numberOfSeats}</p>
    </div>
  );
};
