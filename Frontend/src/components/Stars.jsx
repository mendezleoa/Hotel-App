import { useState, useEffect } from "react";

const Stars = ({ stars }) => {
  const [starIcons, setStarIcons] = useState([]);

  useEffect(() => {
    const evaluacion = stars / 2;
    const starsArray = [];

    for (let i = 0; i < 5; i++) {
      if (i < evaluacion) {
        starsArray.push(
          <svg
            key={i}
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 text-[#0D6EFD]"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        );
      } else {
        starsArray.push(
          <svg
            key={i}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 text-[#0D6EFD]"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        );
      }
    }

    setStarIcons(starsArray);
  }, [stars]);

  return <>{starIcons}</>;
};

export default Stars;
