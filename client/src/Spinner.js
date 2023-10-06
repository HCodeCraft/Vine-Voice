import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import React from "react";

const Spinner = () => {
  let [loading, setLoading] = useState(true);


  return (
    <>
      <ClipLoader
        color={"#4CAF50"}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
};

export default Spinner;
