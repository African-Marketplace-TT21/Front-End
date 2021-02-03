import React, { useState } from "react";
// import { Route, Navlink } from "react-router-dom";
import {
   Box,
   Text,
   Button,
   FormControl,
   FormLabel,
   Input,
   Select,
   useDisclosure,
} from "@chakra-ui/react";

import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalCloseButton,
   ModalBody,
   ModalFooter,
} from "@chakra-ui/react";
import ItemCard from "./ItemCard";
import "../Dashboard.css";

function AddItemModal(props) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   // const initialRef = React.useRef()
   // const finalRef = React.useRef()

   const [itemdata, setItemData] = useState({
      name: "",
      category: "",
      location: "",
      description: "",
      price: 0,
      seller: props.currentUser.name,
      sellerid: props.currentUser.id,
   });

   const update = (e) => {
      const { name, value } = e.target;
      setItemData({ ...itemdata, [name]: value });
   };

   const addmockitem = () => {
      props.setMockItems(props.mockItems.concat(itemdata));
   };

   return (
      <>
         <Button onClick={onOpen}> Add Item </Button>

         <Modal
            isOpen={isOpen}
            onClose={onClose}
            //  initialFocusRef={initialRef}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Add Item</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <FormControl>
                     <FormLabel>Item Name</FormLabel>
                     <Input
                        // ref={initialRef}
                        placeholder="Item Name"
                        name="name"
                        onChange={update}
                     />
                  </FormControl>
                  <FormControl>
                     <FormLabel>Item Description</FormLabel>
                     <Input
                        // ref={initialRef}
                        placeholder="Description"
                        name="description"
                        onChange={update}
                     />
                  </FormControl>

                  <FormControl>
                     <FormLabel>Item Category</FormLabel>
                     <Select
                        name="category"
                        placeholder="Category"
                        onChange={update}
                     >
                        <option value="Coffee"> Coffee </option>
                        <option value="Fruits"> Fruits </option>
                        <option value="Herbs"> Herbs </option>
                        <option value="Meat"> Meat </option>
                        <option value="Tea"> Tea </option>
                        <option value="Vegetables"> Vegetables </option>
                     </Select>
                     <FormLabel>Item Location</FormLabel>
                     <Select
                        name="location"
                        placeholder="Location"
                        onChange={update}
                     >
                        <option value="Egypt"> Egypt </option>
                        <option value="Eritrea"> Eritrea </option>
                        <option value="Ethiopia"> Ethiopia </option>
                        <option value="Kenya"> Kenya </option>
                        <option value="Sudan"> Sudan </option>
                        <option value="Tanzania"> Tanzania </option>
                     </Select>
                  </FormControl>
                  <FormControl>
                     <FormLabel>Price</FormLabel>
                     <Input
                        name="price"
                        // ref={initialRef}
                        placeholder="$USD"
                        onChange={update}
                     />
                  </FormControl>
               </ModalBody>

               <ModalFooter>
                  <Button
                     colorScheme="blue"
                     mr={3}
                     onClick={(e) => {
                        addmockitem();
                        onClose(e);
                     }}
                  >
                     Add Item
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                     Cancel
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
}

export default function Dashboard(props) {
   const [currentdisplay, setCurrentdisplay] = useState("overview");

   function MainDis(element) {
      switch (element) {
         case "items":
            return (
               <Items
                  mockItems={props.mockItems}
                  setMockItems={props.setMockItems}
                  currentUser={props.currentUser}
               ></Items>
            );
         case "profile":
            return <> Displaying My Profile </>;
         case "overview":
            return (
               <>
                  <Text> Overview </Text>
                  <Text> Hello! {props.currentUser.name} </Text>
               </>
            );
         case "orders":
            return <> Displaying My Orders </>;
         case "settings":
            return <> Displaying Settings </>;

         default:
            return <> Displaying Nothing </>;
      }
   }

   function Items(props) {
      const getmyitems = () => {
         // display current owner's items
         // mock: "mockseller"
         // const myusername = "mockseller";
         return props.mockItems.filter(
            (i) => i.sellerid === props.currentUser.id
         );
      };

      return (
         <Box mt="2%" display="flex" alignItems="center" flexDir="column">
            <Box
               ml="2%"
               display="flex"
               p="2%"
               justifyContent="space-between"
               w="100vw"
            >
               <Text fontSize="3xl"> My Items </Text>
               <AddItemModal
                  mockItems={props.mockItems}
                  setMockItems={props.setMockItems}
                  currentUser={props.currentUser}
               />
            </Box>
            <Box className="myitems">
               {getmyitems().map((i) => (
                  <ItemCard key={i.id + i.description + "_myitems"} data={i} />
               ))}
            </Box>
         </Box>
      );
   }

   function Menu() {
      return (
         <Box className="dashboard_menu">
            <Button ml="1vw" onClick={() => setCurrentdisplay("overview")}>
               Overview
            </Button>
            <Button ml="1vw" onClick={() => setCurrentdisplay("orders")}>
               Orders
            </Button>
            {props.currentUser.accountType === "owner" ? (
               <Button ml="1vw" onClick={() => setCurrentdisplay("items")}>
                  My Items
               </Button>
            ) : (
               <></>
            )}

            <Button ml="1vw" onClick={() => setCurrentdisplay("profile")}>
               Profile
            </Button>
            <Button ml="1vw" onClick={() => setCurrentdisplay("settings")}>
               Settings
            </Button>
         </Box>
      );
   }

   return (
      <Box className="dashboard">
         <Menu mockItems={props.mockItems} setMockItems={props.setMockItems} />
         {MainDis(currentdisplay)}
      </Box>
   );
}
