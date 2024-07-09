// OrientationChecker.jsx
import React, { useState, useEffect } from "react";

const OrientationChecker = ({ children }) => {
  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape)").matches
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    };

    window.addEventListener("resize", handleOrientationChange);
    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  if (!isLandscape) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <p>Please rotate your device to landscape mode to view this site.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default OrientationChecker;
