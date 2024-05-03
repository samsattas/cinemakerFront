import { useEffect, useState } from "react";
import { getMovieById } from "../../utils/MovieStore";

const ScheduleItem = ({ schedule, onClick }) => {
  const [movie, setMovie] = useState({});
  const [room, setRoom] = useState({});

  useEffect(() => {
    getMovie();
    // getAllRooms();
  }, []);

  const getMovie = async () => {
    console.log(schedule);
    try {
      if (schedule.movieId === undefined) return;
      const response = await getMovieById(schedule.movieId);
      if (response) {
        setMovie(response);
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
        src={schedule.movie.image}
        alt={schedule.movie.title}
        className="h-60 rounded-lg"
      />
      <div className="flex flex-col gap-3 p-4">
        <h2 className="font-bold text-wrap">{schedule.movie.title}</h2>
        <p>Duración: {schedule.movie.duration}</p>
        <p className="text-base">
          {schedule.timeStart.split("T")[1].split(".")[0]} -
          {schedule.timeEnd.split("T")[1].split(".")[0]}
        </p>
      </div>
    </div>
  );
};

export default ScheduleItem;
