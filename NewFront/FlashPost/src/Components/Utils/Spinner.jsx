import React, { useState } from "react";

function Spinner() {
  const [loading] = useState(true); // We only need the loading state

  return (
    <div className="sweet-loading">
      <div className="animate-spin mx-10 mt-10 rounded-full h-14 w-14 border-t-4 border-primary border-opacity-25"></div>
    </div>
  );
}

export default Spinner;
