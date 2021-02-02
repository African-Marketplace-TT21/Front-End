import React, { useState } from "react";
import {
   Box,
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

function Menu(props) {
   return (
      <Box>
         <AddItemModal
            mockItems={props.mockItems}
            setMockItems={props.setMockItems}
         />
      </Box>
   );
}

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
      seller: "mockseller",
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
                     {" "}
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
                     {" "}
                     Cancel{" "}
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
}

export default function Dashboard(props) {
   return (
      <Box>
         <Menu mockItems={props.mockItems} setMockItems={props.setMockItems} />
      </Box>
   );
}
