import React from "react";
import { Box } from "@chakra-ui/core";

export function Key({ keys, keyCodes, ...props }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minW="4rem"
      h="3.75rem"
      borderRadius="7px"
      border="2px solid black"
      mr="3px"
      boxSizing="border-box"
      {...props}
    >
      <code>{keys}</code>
    </Box>
  );
}
