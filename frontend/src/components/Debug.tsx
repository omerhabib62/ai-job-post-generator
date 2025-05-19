import React, { useEffect } from "react";

export const Debug: React.FC = () => {
  useEffect(() => {
    console.log("Debug component mounted");
    // Print any environment variables or paths that might be relevant
    console.log("Import.meta.env:", import.meta.env);
    console.log("Window location:", window.location.href);

    // Check for any potential errors with the imports
    try {
      // Check some key imports
      import("@/components/layout/MainLayout").catch((e) =>
        console.error("MainLayout import error:", e)
      );
      import("@/contexts/AuthContext").catch((e) =>
        console.error("AuthContext import error:", e)
      );
    } catch (e) {
      console.error("Import testing error:", e);
    }
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        background: "rgba(0,0,0,0.7)",
        color: "white",
        padding: "10px",
        borderRadius: "4px",
        zIndex: 9999,
      }}
    >
      🐞 Debug Mode Active
    </div>
  );
};
