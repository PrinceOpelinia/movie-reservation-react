import React, { useState } from "react";
import MovieChoice from "./MovieChoice";
import { Button, Calendar } from "antd"; // Combine imports for better readability
import dayjs from 'dayjs';
import ticketData from "./ticketData";
import movieData from "./movieData";

const ReserveMovie = () => {
  const [startMovieChoice, setStartMovieChoice] = useState(false);
  const [selectedDate, setselectedDate] = useState(() => dayjs()); // Initialize with the current date

  const cancelReservation = () => {
    setselectedDate(dayjs());
    setStartMovieChoice(false);
    
  };

  const check = () => {
    console.log(movieData); // Log the selectedDate instead of movieData
    console.log(ticketData);
  };

  const onSelect = (newselectedDate) => {
    setselectedDate(newselectedDate.format('YYYY-MM-DD'));
    setStartMovieChoice(true);
  };

  const onPanelChange = (newselectedDate) => {
    setselectedDate(newselectedDate);
  };

  const disabledDate = (current) => {
    // Disable if the date is before today
    return current && current < dayjs().startOf('day');
  };

  return (
    <div>
      {!startMovieChoice && (
        <div>
          <Calendar value={selectedDate} onSelect={onSelect} onPanelChange={onPanelChange} fullscreen={false} disabledDate={disabledDate}/>
        </div>
      )}
      
      {startMovieChoice && <div><MovieChoice selectedDate={selectedDate}/> <Button danger onClick={cancelReservation}>Cancel Reservation</Button> </div>}
      <Button onClick={check}>Check console</Button>
      
    </div>
  );
};

export default ReserveMovie;
