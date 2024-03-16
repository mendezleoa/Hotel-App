import { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#000000");

  return (
    <div>
      <MoonLoader
        color={color}
        loading={loading}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
