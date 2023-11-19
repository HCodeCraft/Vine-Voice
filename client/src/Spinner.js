import { useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

import React from "react";

const Spinner = () => {
  let [loading, setLoading] = useState(true);


  return (
    <div className="loader">
      <PropagateLoader
        color={"#4CAF50"}
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
