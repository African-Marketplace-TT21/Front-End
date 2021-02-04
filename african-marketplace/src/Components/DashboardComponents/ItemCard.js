import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function ItemCard(props) {
   const { name, location, category, price, seller, description } = props.data;

   return (
      <Box className="itemcard">
         <Box p="1vh 1vh">
            <Text fontSize="xl" fontWeight="700">
               {name}
            </Text>
            <Text> Description: {description} </Text>
            <Text> Location: {location} </Text>
            <Text> Category: {category} </Text>
            <Text> Price: ${price} </Text>
            <Text> Seller: {seller} </Text>
         </Box>
      </Box>
   );
}
