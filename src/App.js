import "./App.css";
import ReserveMovie from "./Components/ReserveMovie";
import { Header } from "antd/es/layout/layout";
import { Button, Flex } from "antd";
import { useState } from "react";
import CancelReservation from "./Components/CancelReservation";

function App() {
  const [startReserveMovie, setStartReserveMovie] = useState(false);
  const [startCancelReservation, setStartCancelReservation] = useState(false);
  const [backToHome, setbackToHome] = useState(false);
  

  function handleStartReserveMovie() {
    setStartReserveMovie(true);
  }

  function handleStartCancelReservation() {
    setStartCancelReservation(true);
  }

  function handleBackToHome() {
    setStartReserveMovie(false);
    setStartCancelReservation(false);
  }

  return (
    <div>
      
      <Button onClick={handleBackToHome}>Back To Home</Button>

      <Flex align="center" justify="space-evenly" wrap="wrap" gap="small" style={{ flexDirection: "row" }}>
        {startReserveMovie ? (
          <ReserveMovie />
        ) : (
          <div>
            {!startCancelReservation && <Button onClick={handleStartReserveMovie}>Reserve Movie</Button>}
          </div>
        )}

        {startCancelReservation ? (
          <CancelReservation />
        ) : (
          <div>
            {!startReserveMovie &&  <Button onClick={handleStartCancelReservation}>Cancel Reservation</Button>}
          </div>
        )}
      </Flex>
    </div>
  );
}

export default App;
