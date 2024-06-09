import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <AppBar>
        <Toolbar>test</Toolbar>
      </AppBar>
      <Box sx={{ minHeight: "100vh" }}>{children}</Box>
    </Box>
  );
};

export default Layout;
