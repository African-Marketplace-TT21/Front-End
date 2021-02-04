import React from "react";
import { Text, Box } from "@chakra-ui/react";

export default function Profile(props) {
   return (
      <Box m="3%">
         <Text fontSize="3xl"> Orders </Text>
         <Text mt="2%"> Hello! {props.currentUser.name} </Text>
         <Text> Profile is not yet implemented </Text>
      </Box>
   );
}
