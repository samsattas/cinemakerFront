import { useEffect, useState } from "react";
import { getMovieById } from "../../utils/MovieStore";

const ScheduleItem = ({ schedule, onClick }) => {
  const [schedules, setSchedules] = useState({});
  const [room, setRoom] = useState({});

  useEffect(() => {
    getMovie();
    getAllRooms();
  }, []);

  const getMovie = async () => {
    try {
      const response = await getMovieById(schedule.movieId);
      if (response) {
        setSchedules(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex items-center cursor-pointer min-w-52 bg-white rounded-lg shadow-md"
      onClick={onClick}
    >
      <img
        src={schedules.image}
        alt={schedules.title}
        className="h-60 rounded-lg"
      />
      <div className="flex flex-col gap-3 p-4">
        <h2 className="font-bold text-wrap">{schedules.title}</h2>
        <p className="text-base">
          {schedule.timeStart.split("T")[1]}-{schedule.timeEnd.split("T")[1]}
        </p>
      </div>
    </div>
  );
};

export default ScheduleItem;
