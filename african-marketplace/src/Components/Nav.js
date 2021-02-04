import React from "react";
import { Box, Text, Button, Stack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
   Drawer,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
   useDisclosure,
} from "@chakra-ui/react";

function Nav(props) {
   // const [t, setT] = useState(false);
   function MenuDrawer() {
      const { isOpen, onOpen, onClose } = useDisclosure();
      // const btnRef = React.useRef();
      let timeout;
      return (
         <>
            <Button
               // ref={btnRef}
               colorScheme="teal"
               onClick={(e) => {
                  onOpen(e);
               }}
               onMouseOver={() => {
                  timeout = setTimeout(onOpen, 750);
               }}
               onMouseLeave={() => {
                  clearTimeout(timeout);
               }}
            >
               Menu
            </Button>
            <Drawer
               isOpen={isOpen}
               placement="right"
               onClose={onClose}
               // finalFocusRef={btnRef}
            >
               <DrawerOverlay>
                  <DrawerContent background="transparent" boxShadow="">
                     <DrawerCloseButton
                        size="md"
                        color="white"
                        border="2px solid gray"
                        bgColor="#21b2a6"
                     />

                     <Stack className="menu-drawer">
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
            <MenuDrawer></MenuDrawer>
         </nav>
      </Box>
   );
}

export default Nav;
