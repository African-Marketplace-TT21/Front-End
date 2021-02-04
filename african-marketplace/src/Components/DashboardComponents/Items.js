import React, { useState, useEffect } from "react";
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
import "../../Dashboard.css";
import ItemAddValidation from "../../Validation_Schema/ItemAddValidation";
import * as yup from "yup";

var bigInt = 2354234896;

export default function Items(props) {
   const [displayItems, setDisplayItems] = useState([]);
   const q = props.q;
   const faunaClient = props.faunaClient;

   useEffect(() => {
      faunaClient
         .query(q.Paginate(q.Documents(q.Collection("items"))))
         .then((ret) => {
            faunaClient
               .query(q.Map(ret.data, q.Lambda("x", q.Get(q.Var("x")))))
               .then((res) => {
                  // console.log(res.map((i) => i.data));
                  setDisplayItems(
                     res
                        .map((i) => i.data)
                        .filter((i) => i.seller_id === props.currentUser.id)
                  );
               });
         });
   }, [props.currentdisplay]);

   function AddItemModal(props) {
      const { isOpen, onOpen, onClose } = useDisclosure();
      const initialRef = React.useRef();
      // const finalRef = React.useRef()
      const [submitDisabled, setSubmitDisabled] = useState(true);
      const [errors, setErrors] = useState({
         name: "",
         category: "",
         location: "",
         price: 0,
      });

      const [itemdata, setItemData] = useState({
         name: "",
         category: "",
         location: "",
         description: "",
         price: "",
         seller: props.currentUser.name,
         seller_id: props.currentUser.id,
      });

      const checkvalid = (e) => {
         yup.reach(ItemAddValidation, e.target.name)
            .validate(e.target.value)
            .then(() => {
               setErrors({
                  ...errors,
                  [e.target.name]: "",
               });
            })
            .catch((err) => {
               setErrors({
                  ...errors,
                  [e.target.name]:
                     e.target.name === "price"
                        ? "A number for price is needed"
                        : err.errors[0],
               });
            });
      };

      const checkSubmitStatus = () => {
         for (let i of Object.keys(errors)) {
            if (errors[i].length != 0) {
               setSubmitDisabled(true);
               return;
            }
         }
         setSubmitDisabled(false);
      };

      useEffect(() => {
         checkSubmitStatus();

         // if (
         //    itemdata.name == "" ||
         //    itemdata.category == "" ||
         //    itemdata.location == "" ||
         //    itemdata.price == ""
         // ) {
         //    if (document.querySelector(".additem_submit_button")) {
         //       document.querySelector(".additem_submit_button").disabled = true;
         //       return;
         //    }
         // }
         // if (errors.price.length > 0) {
         //    if (document.querySelector(".additem_submit_button")) {
         //       document.querySelector(".additem_submit_button").disabled = true;
         //       return;
         //    }
         // }

         // if (document.querySelector(".additem_submit_button")) {
         //    document.querySelector(".additem_submit_button").disabled = false;
         //    return;
         // }
      }, [errors, itemdata]);

      const update = (e) => {
         const { name, value } = e.target;
         if (name === "price") {
            setItemData({ ...itemdata, [name]: value * 1 });
            return;
         }
         setItemData({ ...itemdata, [name]: value });
      };

      // const addmockitem = () => {
      //    props.setMockItems(props.mockItems.concat(itemdata));
      // };

      const additem = () => {
         console.log(itemdata);
         faunaClient.query(
            q.Create(q.Collection("items"), {
               data: itemdata,
            })
         );
         setItemData({
            name: "",
            category: "",
            location: "",
            description: "",
            price: "",
            seller: props.currentUser.name,
            seller_id: props.currentUser.id,
         });
      };

      return (
         <>
            <Button onClick={onOpen}> Add Item </Button>

            <Modal
               isOpen={isOpen}
               onClose={onClose}
               closeOnOverlayClick={false}
               initialFocusRef={initialRef}
            >
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>Add Item</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                     <FormControl isRequired>
                        <FormLabel>Item Name</FormLabel>
                        <Input
                           ref={initialRef}
                           placeholder="Item Name"
                           name="name"
                           onChange={(e) => {
                              update(e);
                              checkvalid(e);
                           }}
                        />
                        {errors.name.length > 0 && (
                           <Box className="yuperror_2">
                              <Text>{errors.name}</Text>
                           </Box>
                        )}
                     </FormControl>
                     <FormControl>
                        <FormLabel>Item Description</FormLabel>
                        <Input
                           // ref={initialRef}
                           placeholder="Description"
                           name="description"
                           onChange={(e) => {
                              update(e);
                           }}
                        />
                     </FormControl>

                     <FormControl isRequired>
                        <FormLabel>Item Category</FormLabel>
                        <Select
                           name="category"
                           placeholder="Category"
                           onChange={(e) => {
                              update(e);
                              checkvalid(e);
                           }}
                        >
                           <option value="Coffee"> Coffee </option>
                           <option value="Fruits"> Fruits </option>
                           <option value="Herbs"> Herbs </option>
                           <option value="Meat"> Meat </option>
                           <option value="Tea"> Tea </option>
                           <option value="Vegetables"> Vegetables </option>
                        </Select>
                        {errors.category.length > 0 && (
                           <Box className="yuperror_2">
                              <Text>{errors.category}</Text>
                           </Box>
                        )}
                        <FormLabel>Item Location</FormLabel>
                        <Select
                           name="location"
                           placeholder="Location"
                           onChange={(e) => {
                              update(e);
                              checkvalid(e);
                           }}
                        >
                           <option value="Egypt"> Egypt </option>
                           <option value="Eritrea"> Eritrea </option>
                           <option value="Ethiopia"> Ethiopia </option>
                           <option value="Kenya"> Kenya </option>
                           <option value="Sudan"> Sudan </option>
                           <option value="Tanzania"> Tanzania </option>
                        </Select>
                        {errors.location.length > 0 && (
                           <Box className="yuperror_2">
                              <Text>{errors.location}</Text>
                           </Box>
                        )}
                     </FormControl>
                     <FormControl isRequired>
                        <FormLabel>Price</FormLabel>
                        <Input
                           name="price"
                           // ref={initialRef}
                           placeholder="$USD"
                           onChange={(e) => {
                              update(e);
                              checkvalid(e);
                           }}
                        />
                        {errors.price.length > 0 && (
                           <Box className="yuperror_2">
                              <Text>{errors.price}</Text>
                           </Box>
                        )}
                     </FormControl>
                  </ModalBody>

                  <ModalFooter>
                     {submitDisabled ? (
                        <Button></Button>
                     ) : (
                        <Button
                           colorScheme="blue"
                           mr={3}
                           onClick={(e) => {
                              // addmockitem();
                              additem();
                              onClose(e);
                           }}
                        >
                           Add Item
                        </Button>
                     )}

                     <Button variant="ghost" onClick={onClose}>
                        Cancel
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </>
      );
   }

   // const getmyitems = () => {
   //    // display current owner's items
   //    // mock: "mockseller"
   //    // const myusername = "mockseller";
   //    // return props.mockItems.filter(
   //    //    (i) => i.sellerid === props.currentUser.id
   //    // );

   //    return displayItems;
   // };

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
            {displayItems.map((i) => (
               <ItemCard
                  key={((Math.random() * bigInt) >> 1) + "_myitems"}
                  data={i}
               />
            ))}
         </Box>
      </Box>
   );
}
