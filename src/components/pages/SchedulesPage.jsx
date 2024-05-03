import { useEffect, useState } from "react";
import { getAllSchedules } from "../../utils/ScheduleStore";
import CustomButton from "../items/CustomButton";
import Content from "../templates/Content";
import ScheduleItem from "../items/ScheduleItem";
import ScheduleRegistrationModal from "../modals/ScheduleRegistrationModal";

const SchedulesPage = () => {
  const [openRegistration, setOpenRegistration] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    if (!openRegistration) {
      getSchedules();
    }
  }, [openRegistration]);

  const getSchedules = async () => {
    try {
      const response = await getAllSchedules();
      if (response) {
        setSchedules(response);
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
    setSelectedSchedule();
  };

  return (
    <article className="flex flex-col gap-3 w-3/4 text-xl">
      <CustomButton onClick={handleOpenRegistration}>
        Registrar horario
      </CustomButton>
      <Content className={"flex flex-col gap-8"}>
        <h1 className="text-4xl text-primary font-bold">Horarios</h1>
        {schedules?.map((schedule, index) => (
          <ScheduleItem
            schedule={schedule}
            onClick={() => {
              setSelectedSchedule(schedule);
              setOpenRegistration(true);
            }}
          />
        ))}
      </Content>
      <ScheduleRegistrationModal
        show={openRegistration}
        close={handleCloseRegistration}
        schedule={selectedSchedule}
      />
    </article>
  );
};

export default SchedulesPage;
