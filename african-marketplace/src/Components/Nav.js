import React from "react";
import { Box, Text, Button, Link, Stack } from "@chakra-ui/react";
import {
   Drawer,
   DrawerBody,
   DrawerFooter,
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
                        <Link>Home</Link>
                        <Link>About Us</Link>
                        <Link>Meet the Team</Link>
                        <Link>Sign Up</Link>
                        <Link>Log In</Link>
                     </Stack>
                  </DrawerBody>

                  <DrawerFooter>
                     <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
                     </Button>
                     <Button color="blue">Save</Button>
                  </DrawerFooter>
               </DrawerContent>
            </DrawerOverlay>
         </Drawer>
      </>
   );
}

function Nav() {
   return (
      <Box>
         <nav className="navbar">
            <Text> AFRICAN MARKETPLACE</Text>
            <DrawerExample></DrawerExample>
         </nav>
      </Box>
   );
}

export default Nav;
