import { useState } from "react";
import movieData from "./movieData";
import SeatReservationSystem from "./SeatReservationSystem";

const MovieChoice = ({ selectedDate }) => {
  const [movieClicked, setMovieClicked] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const moviesWithSameDate = movieData.filter(
    (movieData) => movieData.movieDate === selectedDate
  );

  // Now, moviesWithSameDate is an array containing all movies with the selectedDate.
  // You can use this array as needed in the rest of your component logic.

    const handleClick = (movieName) => {
      setMovieClicked(true)
      setSelectedMovie(movieName);
    }

  return (
    <div>

      {/* {findDate ? (
        <div>
          <p>
            Found Movie: {findDate.title} {findDate.movieName}
          </p>
          <SeatReservationSystem findDate={findDate} />
        </div>
      ) : (
        <p>Movie not found</p>
      )} */}

      {movieClicked ? ( <div>
          <p>
            Found Movie: {selectedMovie.movieName}
          </p>
          <SeatReservationSystem selectedMovie={selectedMovie} />
        </div>):(<div> 

          <h2>Movies on {selectedDate}</h2>
      <ul>
        {moviesWithSameDate.map((movie) => (
          <li key={movie.id} onClick={() => handleClick(movie.movieName)}>
            <h3>{movie.movieName}</h3>
            <p>Release Date: {movie.movieDate}</p>
            {/* Add other movie details as needed */}
          </li>
        ))}
      </ul>

        </div>)}



    </div>
  );
};

export default MovieChoice;
