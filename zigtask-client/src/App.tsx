import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import DarkModeToggle from "./components/DarkModeToggle";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const App = () => (
  <Router>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ZigTask
        </Typography>
        <DarkModeToggle />
      </Toolbar>
    </AppBar>
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  </Router>
);

export default App;
