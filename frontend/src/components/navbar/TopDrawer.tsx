import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { NavTypo } from "../typographies/typographies";
import { Close } from "@mui/icons-material";

interface TopDrawerProps {
  open: boolean; // Define open prop as a boolean
  setOpen: (isOpen: boolean) => void; // Define setOpen as a function taking a boolean and returning void
}

const TopDrawer: React.FC<TopDrawerProps> = ({ open, setOpen }) => {
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: { xs: "flex", sm: "none" } }}>
      <Drawer
        open={open}
        onClose={handleDrawerClose}
        anchor="top"
        sx={{
          ".MuiDrawer-paper": {
            bgcolor: "primary.main",
            color: "secondary.light",
            height: "25vh",
          },
        }}
      >
        <Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton sx={{ color: "info.main" }} onClick={handleDrawerClose}>
              <Close />
            </IconButton>
          </Box>
          <List>
            <ListItemButton onClick={handleDrawerClose}>
              <ListItemText primary="Discover Ello" />
            </ListItemButton>
            <ListItemButton onClick={handleDrawerClose}>
              <ListItemText primary="Parent Resources" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default TopDrawer;
