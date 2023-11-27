import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import ticketData from "./ticketData";
import movieData from "./movieData";

const CancelReservation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [movieDataState, setMovieDataState] = useState([...movieData]); // Use a deep copy of movieData

  const showModal = () => {
    setIsModalOpen(true);
  };

  function isTicketIdExists(id) {
    id = Number(id);
    return ticketData.some((ticket) => ticket.id === id);
  }

  const handleOk = () => {
    const ticketId = Number(inputValue);
  
    if (isTicketIdExists(ticketId)) {
      const ticketIndex = ticketData.findIndex((ticket) => ticket.id === ticketId);
  
      // Update movieSeats based on the canceled reservation
      setMovieDataState((prevMovieData) => {
        const newMovieData = prevMovieData.map((movie) => {
          if (movie.movieName === ticketData[ticketIndex].movieName && movie.movieDate === ticketData[ticketIndex].movieDate) 
          {
            const updatedSeats = movie.movieSeats.map((row, rowIndex) => 
            {
              return row.map((seat, seatIndex) => {
                const isSeatSelected = ticketData[ticketIndex].selectedSeats.some(
                  (selectedSeat) =>
                    selectedSeat.row === rowIndex && selectedSeat.seat === seatIndex
                );
  
                return isSeatSelected ? true : seat;
              });
            });
  
            // Modify the existing movie object directly
            movie.movieSeats = updatedSeats;
        }});
  
        // Delete the ticket from ticketData
        const updatedTicketData = [...ticketData];
        updatedTicketData.splice(ticketIndex, 1);
        ticketData.length = 0;
        ticketData.push(updatedTicketData);

        console.log(`Canceled reservation for ticket #${ticketId}`);
        console.log('Updated movieData:', movieData);
        console.log('Updated ticketData:', updatedTicketData);
  
        return newMovieData;
      });
    } else {
      console.log(`Ticket with ID ${ticketId} does not exist.`);
    }
  
    // Reset the input value
    setInputValue("");
    setIsModalOpen(false);
  };
  

  const handleCancel = () => {
    // Reset the input value if the user cancels
    setInputValue("");
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    // Update the inputValue as the user types
    setInputValue(e.target.value);
  };

  return (
    <>
    <div>
    <h1>Input seat to cancel: </h1>
      <Input value={inputValue} onChange={handleInputChange} />

      <Button type="primary" onClick={showModal}>
        Cancel Reservation
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
       
          {isTicketIdExists(inputValue) && (
            <h3>Do you really want to cancel ticket # {inputValue}</h3>
          )}
     
     
          {!isTicketIdExists(inputValue) && (
            <h3>Ticket # {inputValue} does not exist</h3>
          )}
      
      </Modal>
      </div>
    </>
  );
};

export default CancelReservation;
