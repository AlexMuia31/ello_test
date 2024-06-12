import { AppBar, Box, Container, Toolbar } from "@mui/material";
import Image from "next/image";
import React from "react";
import { NavTypo } from "../typographies/typographies";

const Navbar = () => {
  return (
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
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
