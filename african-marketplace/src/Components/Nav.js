import React from "react";
import { Box, Text, Button, Stack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
   Drawer,
   DrawerBody,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
   useDisclosure,
} from "@chakra-ui/react";

function Nav(props) {
   function DrawerExample() {
      const { isOpen, onOpen, onClose } = useDisclosure();
      const btnRef = React.useRef();

      return (
         <>
            <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
               Menu
            </Button>
            <Drawer
               isOpen={isOpen}
               placement="right"
               onClose={onClose}
               finalFocusRef={btnRef}
            >
               <DrawerOverlay>
                  <DrawerContent>
                     <DrawerCloseButton />

                     <DrawerBody>
                        <Stack>
                           <NavLink onClick={onClose} to="/">
                              Home
                           </NavLink>
                           <NavLink onClick={onClose} to="/about">
                              About Us
                           </NavLink>
                           <NavLink onClick={onClose} to="/team">
                              Meet the Team
                           </NavLink>

                           {props.currentUser.id === undefined ? (
                              <NavLink onClick={onClose} to="/register">
                                 Sign Up
                              </NavLink>
                           ) : (
                              <></>
                           )}

                           {props.currentUser.id === undefined ? (
                              <NavLink onClick={onClose} to="/login">
                                 Log In
                              </NavLink>
                           ) : (
                              <></>
                           )}

                           {props.currentUser.id === undefined ? (
                              <></>
                           ) : (
                              <NavLink onClick={onClose} to="/dashboard">
                                 Dashboard
                              </NavLink>
                           )}

                           {props.currentUser.id === undefined ? (
                              <></>
                           ) : (
                              <NavLink onClick={onClose} to="/market">
                                 Market
                              </NavLink>
                           )}

                           {props.currentUser.id === undefined ? (
                              <></>
                           ) : (
                              <NavLink
                                 to="/"
                                 onClick={(e) => {
                                    props.setCurrentUser({});
                                    onClose(e);
                                 }}
                              >
                                 Logout
                              </NavLink>
                           )}
                        </Stack>
                     </DrawerBody>
                  </DrawerContent>
               </DrawerOverlay>
            </Drawer>
         </>
      );
   }

   return (
      <Box>
         <nav className="navbar">
            <Text
               visibility={props.display === undefined ? "hidden" : "visible"}
            >
               AFRICAN MARKETPLACE
            </Text>
            <DrawerExample></DrawerExample>
         </nav>
      </Box>
   );
}

export default Nav;
