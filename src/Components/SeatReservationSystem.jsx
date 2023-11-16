import React, { useState } from 'react';
import movieData from "./movieData";

const SeatReservationSystem = ({findDate}) => {

  // Create state for the seating array
  const [seatingArray, setSeatingArray] = useState(findDate.movieSeats);

  // Example: Set a specific seat as unavailable (row 3, seat 2)
  const markSeatAsUnavailable = (row, seat) => {
    // Create a copy of the seating array to avoid mutating state directly
    const newSeatingArray = seatingArray.map((rowArray, rowIndex) => {
      if (rowIndex === row) {
        return rowArray.map((isSeatAvailable, seatIndex) => {
          return seatIndex === seat ? false : isSeatAvailable;
        });
      }
      return rowArray.slice(); // Return a copy of rows that aren't being modified
    });

    // Update the state with the new seating array
    setSeatingArray(newSeatingArray);
    

  };

  const handleMovieUpdate = (event) => {
    event.preventDefault();
    findDate.movieSeats = seatingArray;
    console.log(findDate.movieSeats);
    console.log(movieData);
  };
  //on submit do findDate.MovieSeats = seatingsArray


  // Render your component with the seatingArray state
  return (
    <div>
      <h2>Seating Chart</h2>
      <table>
        <tbody>
          {seatingArray.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((isSeatAvailable, seatIndex) => (
                <td
                  key={seatIndex}
                  style={{
                    padding: '8px',
                    border: '1px solid #ddd',
                    background: isSeatAvailable ? 'green' : 'red',
                  }}
                  onClick={() => markSeatAsUnavailable(rowIndex, seatIndex)}
                >
                   {`Row ${rowIndex + 1} Seat ${String.fromCharCode(65 + seatIndex)}`}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleMovieUpdate}>
        Submit</button>

    </div>
    
  );
};

export default SeatReservationSystem;
