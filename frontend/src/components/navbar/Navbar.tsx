import { AppBar, Box, Container, IconButton, Toolbar } from "@mui/material";
import Image from "next/image";
import React from "react";
import { NavTypo } from "../typographies/typographies";
import TopDrawer from "./TopDrawer";
import { Menu } from "@mui/icons-material";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Box>
      <AppBar sx={{ bgcolor: "secondary.light" }}>
        <Toolbar>
          <Container maxWidth="xl">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Image src="/logo.png" width={100} height={50} alt="logo" />
              </Box>
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  gap: 4,
                  color: "secondary.main",
                }}
              >
                <NavTypo>Discover Ello</NavTypo>
                <NavTypo>Parent Resources</NavTypo>
              </Box>
              <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                <IconButton
                  sx={{ color: "primary.main" }}
                  onClick={handleDrawerOpen}
                >
                  <Menu />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <TopDrawer setOpen={setOpen} open={open} />
    </Box>
  );
};

export default Navbar;
