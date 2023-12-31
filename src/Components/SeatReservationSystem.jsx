import React, { useState } from "react";
import { Button } from "antd";
import movieData from "./movieData";
import ticketData from "./ticketData";

const SeatReservationSystem = ({ selectedMovie }) => {
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const initialSeatingArray = selectedMovie.movieSeats;
  const [seatingArray, setSeatingArray] = useState(initialSeatingArray);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentTicketData, setcurrentTicketData] = useState([]);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [selectedSeatArray, setselectedSeatArray] = useState([]);

  const markSeatAsUnavailable = (row, seat) => {
    const newSeatingArray = seatingArray.map((rowArray, rowIndex) => {
      if (rowIndex === row) {
        return rowArray.map((isSeatAvailable, seatIndex) => {
          if (seatIndex === seat && isSeatAvailable) {
            // Update selectedSeats with the clicked seat indexes
            const updatedSelectedSeats = [...selectedSeats, { row: rowIndex, seat: seatIndex }];
            setSelectedSeats(updatedSelectedSeats);
          }
          return seatIndex === seat ? false : isSeatAvailable;
        });
      }
      return rowArray.slice();
    });
  
    setSeatingArray(newSeatingArray);
  };
  

  const handleMovieUpdate = () => {
    selectedMovie.movieSeats = seatingArray;

    const ticketId = getRandomNumber(1, 1000);

    const newTicket = {
      id: ticketId,
      movieName: selectedMovie.movieName,
      movieDate: selectedMovie.movieDate,
      selectedSeats: selectedSeats,
    };
    ticketData.push(newTicket);

    setcurrentTicketData(newTicket);
    setIsSubmitClicked(true);
  };

  return (
    <div>
      {!isSubmitClicked && (
        <div>
          <h2>Seating Chart: {selectedMovie.movieName}</h2>
          <table style={{ borderCollapse: "collapse", margin: "10px" }}>
            <tbody>
              {seatingArray.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((seat, seatIndex) => (
                    <td
                      key={seatIndex}
                      style={{
                        padding: "8px",
                        border: "1px solid #ddd",
                        background: seat ? "green" : "red",
                        cursor: "pointer",
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
          <Button type="primary" onClick={handleMovieUpdate}>
            Submit
          </Button>
        </div>
      )}

      {isSubmitClicked && (
        <div>
          <h1>Ticket Info:</h1>
          <h1>{currentTicketData.movieName}</h1>
          <h1>Ticket # {currentTicketData.id}</h1>
          <p>
            Selected Seats:{" "}
            {currentTicketData.selectedSeats.map((seat, index) => (
              <span key={index}>
                {`Row ${seat.row + 1} Seat ${String.fromCharCode(
                  65 + seat.seat
                )}`}
                {index < currentTicketData.selectedSeats.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
};

export default SeatReservationSystem;
