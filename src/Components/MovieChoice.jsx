import { useState } from "react";
import movieData from "./movieData";
import SeatReservationSystem from "./SeatReservationSystem";

const MovieChoice = ({ selectedDate }) => {
  const findDate = movieData.find(
    (movieData) => movieData.movieDate === selectedDate
  );

  return (
    <div>
      {findDate ? (
        <div> 
        <p>
          Found Movie: {findDate.title} {findDate.movieName}
          
        </p>
        <SeatReservationSystem findDate={findDate} />
        </div>
      ) : (
        <p>Movie not found</p>
      )}
    </div>
  );
};

export default MovieChoice;
