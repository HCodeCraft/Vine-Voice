import PropagateLoader from "react-spinners/PropagateLoader";

import React from "react";

const Spinner = () => {
  return (
    <div className="loader">
      <PropagateLoader
        color={"#4CAF50"}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
