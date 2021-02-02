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
                        <NavLink onClick={onClose} to="/register">
                           Sign Up
                        </NavLink>
                        <NavLink onClick={onClose} to="/login">
                           Log In
                        </NavLink>
                        <NavLink onClick={onClose} to="/dashboard">
                           Temporary: Dashboard
                        </NavLink>
                        <NavLink onClick={onClose} to="/market">
                           Temporary: Market
                        </NavLink>
                        {/* tbd: may these should be replaced by a dashboard button and a logout button when logged in  */}
                     </Stack>
                  </DrawerBody>
               </DrawerContent>
            </DrawerOverlay>
         </Drawer>
      </>
   );
}

function Nav(props) {
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
