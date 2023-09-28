import React, { useState } from "react";
import { FaSquare } from "react-icons/fa";

const HealthRating = ({ changeRating, rating }) => {
  const [hover, setHover] = useState(null)

  const colorArray = ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#008000"];

  return (
    <div>
      {[...Array(5)].fill().map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              type="radio"
              name="health"
              value={ratingValue}
              onClick={() => changeRating(ratingValue)}

            />
            <FaSquare
              className="star"
              size={40}
              color={ratingValue <= (hover || rating) ? colorArray[i] : "#808080"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default HealthRating;

