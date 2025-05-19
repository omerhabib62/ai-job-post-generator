import React, { useState, useEffect } from "react";

const Debugger: React.FC = () => {
  const [screenInfo, setScreenInfo] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setScreenInfo({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded shadow-lg z-50"
      >
        Debug
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded shadow-lg max-w-xs z-50">
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">Debugger</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
      <div className="text-xs space-y-1">
        <p>
          Screen: {screenInfo.width}×{screenInfo.height}px
        </p>
        <p>React Version: {React.version}</p>
        <p>URL: {window.location.href}</p>
        <p>Environment: {import.meta.env.MODE}</p>
        <div className="mt-2 pt-2 border-t border-gray-600">
          <p className="font-medium">Test Elements:</p>
          <div className="mt-1 flex gap-1">
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
              Red
            </span>
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
              Green
            </span>
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
              Blue
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debugger;
