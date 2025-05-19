import React, { useState } from "react";
import AppWithFullFunctionality from "./AppWithFullFunctionality";

function App() {
  const [useFullApp, setUseFullApp] = useState(false);

  // If the user chooses to use the full app, render it
  if (useFullApp) {
    return <AppWithFullFunctionality />;
  }

  // Otherwise show the simple working version with a toggle button
  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Job Post Generator
      </h1>
      <p className="text-gray-700 mb-4">
        The basic app is working correctly! You can now switch to the
        full-featured app.
      </p>
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-yellow-700 mb-2 font-medium">⚠️ Status</p>
        <p className="text-sm text-yellow-600">
          The minimal app is working, confirming that React and Tailwind are
          correctly configured. Click the button below to switch to the full
          application with all features.
        </p>
      </div>
      <button
        onClick={() => setUseFullApp(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Switch to Full App
      </button>
      <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
        Test Button
      </button>
    </div>
  );
}

export default App;
