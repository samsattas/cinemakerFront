const MovieItem = ({ movie, onClick }) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer min-w-52 "
      onClick={onClick}
    >
      <h2 className="font-bold text-wrap">{movie.title}</h2>
      <img src={movie.image} alt={movie.title} className="h-60 rounded-lg" />
      <p className="text-base">{movie.releaseDate.split("T")[0]}</p>
    </div>
  );
};

export default MovieItem;
