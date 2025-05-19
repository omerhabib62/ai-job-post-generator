import React from "react";
import "./test-styles.css";

const TestPage: React.FC = () => {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 className="test-heading">Job Post Generator - Test Page</h1>

      <div className="test-container">
        <h2 style={{ marginTop: 0 }}>Application Status Test</h2>
        <p>If you can see this page, React is rendering correctly.</p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Test Button 1
        </button>
        <button
          style={{
            background: "#10b981",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Test Button 2
        </button>
      </div>

      <div style={{ fontSize: "14px", color: "#6b7280" }}>
        <p>
          This is a test page to check if React components can render properly.
        </p>
      </div>
    </div>
  );
};

export default TestPage;
