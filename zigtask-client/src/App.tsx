import { AppBar, Toolbar, Typography } from "@mui/material";
import DarkModeToggle from "./components/DarkModeToggle";

const App = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        ZigTask
      </Typography>
      <DarkModeToggle />
    </Toolbar>
  </AppBar>
);

export default App;
