import React from "react";

const TicketList = ({ ticketData }) => {
  return (
    <div>
      <h2>Ticket List</h2>
      <ul>
        {ticketData.map((ticket, index) => (
          <li key={index}>
            <p>Movie: {ticket.movieName}</p>
            <p>Date: {ticket.movieDate}</p>
            {/* Add other ticket details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
