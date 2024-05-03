const RoomItem = ({ room, onClick }) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer min-w-52 bg-white p-4 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105"
      onClick={onClick}
    >
      <h2 className="font-bold text-wrap">Room #{room.roomNumber}</h2>
      <p className="text-base">Capacidad: {room.capacity} asientos</p>
    </div>
  );
};

export default RoomItem;
