import { useEffect, useState } from "react";
import CustomButton from "../items/CustomButton";
import Content from "../templates/Content";
import MovieResgistrationModal from "../modals/MovieRegistrationModal";
import { getAllMovies } from "../../utils/MovieStore";
import MovieItem from "../items/MovieItem";

const MoviesPage = () => {
  const [openRegistration, setOpenRegistration] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!openRegistration) {
      getMovies();
    }
  }, [openRegistration]);

  const getMovies = async () => {
    try {
      const response = await getAllMovies();
      if (response) {
        setMovies(response);
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
    setSelectedMovie();
  };

  return (
    <article className="flex flex-col gap-3 w-3/4 text-xl">
      <CustomButton onClick={handleOpenRegistration}>
        Registrar película
      </CustomButton>
      <Content className={"flex flex-col gap-8"}>
        <h1 className="text-4xl text-primary font-bold">Películas</h1>
        <div className="flex gap-10 overflow-auto w-full">
          {movies.map((movie, index) => (
            <MovieItem
              movie={movie}
              onClick={() => {
                setSelectedMovie(movie);
                setOpenRegistration(true);
              }}
            />
          ))}
        </div>
      </Content>
      {/* <Content>
        <h1>Presentando ahora</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          repellendus, voluptates, doloribus, autem quos quia quas fugit
          voluptate quod accusamus dolorum! Quam, voluptates. Quisquam
          repellendus, voluptates, doloribus, autem quos quia quas fugit
          voluptate quod accusamus dolorum! Quam, voluptates.
        </p>
      </Content> */}
      <Content className={"flex flex-col gap-8"}>
        <h1 className="text-4xl text-primary font-bold">Proximos estrenos</h1>
        <div className="flex gap-10 overflow-auto w-full">
          {movies.map((movie, index) => {
            const releaseDate = new Date(movie.releaseDate);
            const currentDate = new Date();
            if (releaseDate > currentDate) {
              return <MovieItem movie={movie} />;
            }
          })}
        </div>
      </Content>
      <MovieResgistrationModal
        show={openRegistration}
        close={handleCloseRegistration}
        movie={selectedMovie}
      />
    </article>
  );
};

export default MoviesPage;
