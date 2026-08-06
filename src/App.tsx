// app.tsx

import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";

import Navigation from "./components/Navigation";
import CommandPalette from "./components/CommandPalette";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./components/theme-provider";
import Footer from "./components/Footer";

function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
    <BrowserRouter>
      <Navigation
        onCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      <AppRoutes />
      <Footer />
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;