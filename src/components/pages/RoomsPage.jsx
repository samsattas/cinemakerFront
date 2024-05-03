import { useEffect, useState } from "react";
import CustomButton from "../items/CustomButton";
import Content from "../templates/Content";
import RoomItem from "../items/RoomItem";
import RoomRegistrationModal from "../modals/RoomRegistrationModal";
import { getAllRooms } from "../../utils/RoomStore";

const RoomsPage = () => {
  const [openRegistration, setOpenRegistration] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (!openRegistration) {
      getRooms();
    }
  }, [openRegistration]);

  const getRooms = async () => {
    try {
      const response = await getAllRooms();
      if (response) {
        setRooms(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenRegistration = () => {
    setOpenRegistration(true);
  };

  const handleCloseRegistration = () => {
    setOpenRegistration(false);
    setSelectedRoom();
  };

  return (
    <article className="flex flex-col gap-3 w-3/4 text-xl">
      <CustomButton onClick={handleOpenRegistration}>
        Registrar sala
      </CustomButton>
      <Content className={"flex flex-col gap-8"}>
        <h1 className="text-4xl text-primary font-bold">Salas</h1>
        {rooms.map((room, index) => (
          <RoomItem
            room={room}
            onClick={() => {
              setSelectedRoom(room);
              setOpenRegistration(true);
            }}
          />
        ))}
      </Content>
      <RoomRegistrationModal
        show={openRegistration}
        close={handleCloseRegistration}
        room={selectedRoom}
      />
    </article>
  );
};

export default RoomsPage;
