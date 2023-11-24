import React, { useState } from "react";
import { Button, Space, Table, Typography } from "antd";
import SeatReservationSystem from "./SeatReservationSystem";
import movieData from "./movieData";

const { Text } = Typography;

const MovieChoice = ({ selectedDate }) => {
  const [movieClicked, setMovieClicked] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const moviesWithSameDate = movieData.filter(
    (movie) => movie.movieDate === selectedDate
  );

  const handleReserveClick = (record) => {
    setSelectedMovie(record);
    setMovieClicked(true);
  };

  const columns = [
    {
      title: "Movie Name",
      dataIndex: "movieName",
      key: "movieName",
    },
    {
      title: "Movie Date",
      dataIndex: "movieDate",
      key: "movieDate",
    },
    {
      title: "Start",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleReserveClick(record)}>
            Reserve now
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {!movieClicked && moviesWithSameDate.length > 0 ? (
        <Table
          columns={columns}
          dataSource={moviesWithSameDate}
          rowKey={(record) => record.movieId} // Replace with the actual unique identifier
        />
      ) : (
       <></>
      )}
  
      {movieClicked && <SeatReservationSystem selectedMovie={selectedMovie} />}
    </div>
  );
};

export default MovieChoice;
