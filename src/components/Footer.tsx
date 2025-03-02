import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.default",
        padding: 1,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        textAlign: "center",
        fontSize: "12px",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        <span>Created by Reka Forgacs | </span>
        <Link
          href="https://www.linkedin.com/in/reka-forgacs"
          target="_blank"
          rel="noopener"
          color="inherit"
        >
          LinkedIn
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
