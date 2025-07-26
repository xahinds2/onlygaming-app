import React from "react";

const Loading = ({ message }: { message?: string }) => {
  const defaultMessage = "Our backend is taking a little nap.";

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mb-20 text-18 text-center">
        <p>Hold on tight!</p>
        <p>{message || defaultMessage}</p>
        <p>Meanwhile, enjoy this spinning wheel:</p>
      </div>
      <div
        style={{
          border: "8px solid rgba(0, 0, 0, 0.1)",
          borderLeftColor: "#333",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          animation: "spin 1s linear infinite",
          WebkitAnimation: "spin 1s linear infinite",
          MozAnimation: "spin 1s linear infinite",
          OAnimation: "spin 1s linear infinite",
        }}
      ></div>
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
