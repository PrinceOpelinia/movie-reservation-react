import React, { useState } from "react";
import MovieChoice from "./MovieChoice";
const ReserveMovie = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [startMovieChoice, setStartMovieChoice] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleStartMovieChoice = () => {
    // Do something with the selectedDate, e.g., pass it to a parent component or perform further processing
    setStartMovieChoice(true);
    console.log(selectedDate);
  };

  return (
    <div>
      {!startMovieChoice && (
        <form>
          <label>
            Select Date:
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </label>
          <button type="submit" onClick={handleStartMovieChoice}>
            Submit
          </button>
        </form>
      )}

      {startMovieChoice && <MovieChoice selectedDate={selectedDate} />}
    </div>
  );
};

export default ReserveMovie;
