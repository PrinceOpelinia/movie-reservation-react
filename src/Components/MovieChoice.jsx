import { useState } from "react";
import movieData from "./movieData";

const MovieChoice = ({ selectedDate }) => {
  const findDate = movieData.find(
    (movieData) => movieData.movieDate === selectedDate
  );

  return (
    <div>
      {findDate ? (
        <p>
          Found Movie: {findDate.title} {findDate.movieName}
        </p>
      ) : (
        <p>Movie not found</p>
      )}
    </div>
  );
};

export default MovieChoice;
