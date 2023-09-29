import React from "react";
import { useParams } from "react-router-dom";
import { useGetEntriesQuery } from "./entriesSlice";
import { Typography } from "@mui/material";

const Entry = () => {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading, isError } = useGetEntriesQuery();
  const entry = data?.[id - 1];

  console.log("entry", entry);

  if (isLoading) {
    // Display a loading message while data is being fetched
    return <Typography variant="h4">Loading...</Typography>;
  }

  if (isError) {
    // Handle error state if necessary
    return <Typography variant="h4">Error loading data.</Typography>;
  }

  if (entry) {
    // Display the entry data when it's available
    return (
      <section align="center">
        <br />
        <br />
        <Typography align="center" variant="h4">
          {entry.nickname}
        </Typography>
        <Typography align="center">Entry from {entry.create_date}</Typography>
        <br />
        <img
          className="entry_pic"
          src="https://i.etsystatic.com/28032647/r/il/fcc31d/3031288866/il_1588xN.3031288866_dy56.jpg"
          alt="Entry"
        />
        <br />
        <Typography>Location: {entry.location}</Typography>
        <br />
        <p>{entry.notes}</p>
        <br />
        <Typography>
          Problems:{" "}
          {entry.problems.length > 0
            ? entry.problems.map((problem) => <p>{problem}</p>)
            : "No Problems :)"}
        </Typography>
        <br/>
        <Typography
          sx={{
            border: `1px solid ${entry.open_to_advice ? "green" : "red"}`,
            padding: "4px", // Add padding for better visualization
            display: "inline-block", // To make the border apply to the text only
          }}
        >
          {entry.open_to_advice ? "I'm open to advice!" : "No advice, please"}
        </Typography>
      </section>
    );
  }

  // Handle the case where entry is not available
  return <Typography variant="h4">Entry not found.</Typography>;
};

export default Entry;
