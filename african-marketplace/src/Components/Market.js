// After owner added an item in his dashboard, any user would be able to see it this page if the search location is correct.

import React from "react";
import { Box, Text, Input, Select } from "@chakra-ui/react";

// import TestItems from "../Mockdata/testitems";

// const testitems = [
//    {
//       name: "Robusta",
//       id: "cf203a5b-7d50-4120-9381-d636ce66f910",
//       category: "Coffee",
//       location: "Kenya",
//       description: "item1",
//       seller: "abc",
//       price: 40,
//    },
//    {
//       name: "Beef Jerky",
//       id: "6be9f0af-d729-4755-9a2e-915a90088ed7",
//       category: "Meat",
//       location: "Kenya",
//       description: "item2",
//       seller: "abc",
//       price: 30,
//    },
//    {
//       name: "Rosemary",
//       id: "03705b3e-d4fb-4866-9834-cb25cf1a4581",
//       category: "Herbs",
//       location: "Egypt",
//       description: "item3",
//       seller: "ggg",
//       price: 50,
//    },
// ];

function Card(props) {
   const { name, location, category, price, seller } = props.data;

   return (
      <Box className="itemcard">
         <Text> {name} </Text>
         <Text> Location: {location} </Text>
         <Text> Category: {category} </Text>
         <Text> Price: ${price} </Text>
         <Text> Seller: {seller} </Text>
      </Box>
   );
}

//filter would accept or reject items to be displayed on the market page according to the selected filters and search keyword
// function filter() {}

export default function Market(props) {
   return (
      <Box display="flex" flexDir="column" justifyContent="center">
         <Box className="marketfilter">
            <Input placeholder="Search" />

            <Select placeholder="Category" width="50%">
               <option value=""> Coffee </option>
               <option value=""> Fruits </option>
               <option value=""> Herbs </option>
               <option value=""> Meat </option>
               <option value=""> Tea </option>
               <option value=""> Vegetables </option>
            </Select>

            <Select placeholder="Location" width="50%">
               <option value=""> Egypt </option>
               <option value=""> Eritrea </option>
               <option value=""> Ethiopia </option>
               <option value=""> Kenya </option>
               <option value=""> Sudan </option>
               <option value=""> Tanzania </option>
            </Select>
         </Box>
         <Box className="marketresult">
            {props.mockItems.map((i) => (
               <Card key={i.id + i.description} data={i}></Card>
            ))}
         </Box>
      </Box>
   );
}
