import React, { useState } from "react";
import movieData from "./movieData";
import TicketList from "./TicketList";

const SeatReservationSystem = ({ selectedMovie }) => {
  // Function to generate a random number between min (inclusive) and max (inclusive)
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
  const selectedMovieData = movieData.find(
    (movie) => movie.movieName === selectedMovie
  );

  const initialSeatingArray = selectedMovieData.movieSeats;
  // Create state for the seating array
  const [seatingArray, setSeatingArray] = useState(initialSeatingArray);

  // Create state to track selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketData, setTicketData] = useState([]);
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

    // Update selected seats
    const seatIdentifier = `Row ${row + 1} Seat ${String.fromCharCode(65 + seat)}`;
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatIdentifier)
        ? prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seatIdentifier)
        : [...prevSelectedSeats, seatIdentifier]
    );
  };

  const handleMovieUpdate = (event) => {
    event.preventDefault();
    selectedMovieData.movieSeats = seatingArray;

    // Generate a random ticket ID
    const ticketId = getRandomNumber(1, 1000);

    // Create a new ticket object with reserved seats
    const newTicket = {
      id: ticketId,
      movieName: selectedMovieData.movieName,
      movieDate: selectedMovieData.movieDate,
      selectedSeats: selectedSeats,
    };

      // Update the ticketData state with the new ticket
      // setTicketData((prevTicketData) => [...prevTicketData, newTicket]);
      setTicketData(newTicket);
      console.log(ticketData);
      // Clear the selected seats
      setSelectedSeats([]);
  };

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
                    padding: "8px",
                    border: "1px solid #ddd",
                    background: isSeatAvailable ? "green" : "red",
                  }}
                  onClick={() => markSeatAsUnavailable(rowIndex, seatIndex)}
                >
                  {`Row ${rowIndex + 1} Seat ${String.fromCharCode(
                    65 + seatIndex
                  )}`}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleMovieUpdate}>Submit</button>

      <div>
        <h1>Ticket Info:</h1>
        <p>Selected Seats: {selectedSeats.join(", ")}</p>
      </div>
    </div>
  );
};

export default SeatReservationSystem;
