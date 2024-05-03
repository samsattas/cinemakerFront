import { useEffect, useState } from "react";
import { getAllReservations } from "../../utils/ReservationStore";
import CustomButton from "../items/CustomButton";
import Content from "../templates/Content";
import ReservationRegistrationModal from "../modals/ReservationRegistrationModal";

const ReservationPage = () => {
  const [openRegistration, setOpenRegistration] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (!openRegistration) {
      getReservations();
    }
  }, [openRegistration]);

  const getReservations = async () => {
    try {
      const response = await getAllReservations();
      if (response) {
        setReservations(response);
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
    setSelectedReservation();
  };

  return (
    <article className="flex flex-col gap-3 w-3/4 text-xl">
      <CustomButton onClick={handleOpenRegistration}>
        Registrar reserva
      </CustomButton>
      <Content className={"flex flex-col gap-8"}>
        <h1 className="text-4xl text-primary font-bold">Reservas activas</h1>
        <div className="flex gap-10 overflow-auto w-full">
          {reservations.map((reservation, index) => (
            <ReservationItem
              reservation={reservation}
              onClick={() => {
                setSelectedReservation(reservation);
                setOpenRegistration(true);
              }}
            />
          ))}
        </div>
      </Content>
      <ReservationRegistrationModal
        show={openRegistration}
        close={handleCloseRegistration}
        reservation={selectedReservation}
      />
    </article>
  );
};

export default ReservationPage;
