import {
  Badge,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import React, { FC, useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { createTheme } from "@mui/material/styles";

const mdTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#bee3db",
    },
    secondary: {
      main: "#ffd6ba",
    },
    background: {
    //   default: "#555b6e",
      paper: "#89b0ae",
    },
  },
});

const Wrapper: FC<any> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header open={open} toggleDrawer={toggleDrawer} />
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Wrapper;
