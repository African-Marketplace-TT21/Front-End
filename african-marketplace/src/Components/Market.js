// After owner added an item in his dashboard, any user would be able to see it this page if the search location is correct.

import React, { useState, useEffect } from "react";
import { Box, Input, Select } from "@chakra-ui/react";
import ItemCard from "./ItemCard";
import { v4 as uuidv4 } from "uuid";

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

export default function Market(props) {
   const [searchterm, setSearchterm] = useState("");
   const [searchcategory, setSearchcategory] = useState("");
   const [searchlocation, setSearchlocation] = useState("");
   const q = props.q;
   const faunaClient = props.faunaClient;
   const [displayItems, setDisplayItems] = useState([]);

   useEffect(() => {
      faunaClient
         .query(q.Paginate(q.Documents(q.Collection("items"))))
         .then((ret) => {
            faunaClient
               .query(q.Map(ret.data, q.Lambda("x", q.Get(q.Var("x")))))
               .then((res) => {
                  // console.log(res.map((i) => i.data));
                  setDisplayItems(res.map((i) => i.data));
               });
         });
   }, []);
   //filter would accept or reject items to be displayed on the market page according to the selected filters and search keyword
   function filter(items) {
      // this is not the best practice to search stuff
      // let items_to_filter = props.mockItems;
      let items_to_filter = items;
      items_to_filter = items_to_filter.filter((i) =>
         !searchcategory.length ? i : i.category === searchcategory
      );
      if (!items_to_filter.length) {
         return [];
      }
      items_to_filter = items_to_filter.filter((i) =>
         !searchlocation.length ? i : i.location === searchlocation
      );
      if (!items_to_filter.length) {
         return [];
      }
      if (searchterm.length === 0) {
         return items_to_filter;
      }

      const tempkeys = Object.keys(items_to_filter[0]).filter(
         (i) => i != "price" && i != "id"
      );

      const final = [];
      const searchregex = new RegExp(searchterm, "i"); // we want to search in a case-insensitive way
      const check = () => {
         for (let j of items_to_filter) {
            for (let k of tempkeys) {
               if (j[k].match(searchregex) != null) {
                  final.push(j);
                  break;
               }
            }
         }
      };
      check();
      return final;
   }

   return (
      <Box className="market">
         <Box className="marketfilter">
            <Input
               placeholder="Search"
               onChange={(e) => setSearchterm(e.target.value)}
            />

            <Select
               placeholder="Category"
               width="50%"
               onChange={(e) => setSearchcategory(e.target.value)}
            >
               <option value="Coffee"> Coffee </option>
               <option value="Fruits"> Fruits </option>
               <option value="Herbs"> Herbs </option>
               <option value="Meat"> Meat </option>
               <option value="Tea"> Tea </option>
               <option value="Vegetables"> Vegetables </option>
            </Select>

            <Select
               placeholder="Location"
               width="50%"
               onChange={(e) => setSearchlocation(e.target.value)}
            >
               <option value="Egypt"> Egypt </option>
               <option value="Eritrea"> Eritrea </option>
               <option value="Ethiopia"> Ethiopia </option>
               <option value="Kenya"> Kenya </option>
               <option value="Sudan"> Sudan </option>
               <option value="Tanzania"> Tanzania </option>
            </Select>
         </Box>
         {props.currentUser.id === undefined ? (
            <h1>Please Log in to visit market</h1>
         ) : (
            <Box className="marketresult" mt="4vh">
               {filter(displayItems).map((i) => (
                  <ItemCard key={uuidv4() + "_market"} data={i}></ItemCard>
               ))}
            </Box>
         )}
      </Box>
   );
}
