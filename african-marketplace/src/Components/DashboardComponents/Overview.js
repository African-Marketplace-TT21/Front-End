import { chakra } from "@chakra-ui/react";
import React from "react";
import { Text, Box } from "@chakra-ui/react";

export default function Overview(props) {
   return (
      <Box m="3%">
         <Text fontSize="3xl"> Overview </Text>
         <Text mt="2%"> Hello! {props.currentUser.name} </Text>
         <Text> Overview is not yet implemented </Text>
      </Box>
   );
}
