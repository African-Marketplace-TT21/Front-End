import React, { useState } from "react";
import { Box, Text, Button, Link, Stack } from "@chakra-ui/react";
import PasswordInput from "./PasswordInput";
import { NavLink } from "react-router-dom";

import {
   FormControl,
   FormLabel,
   FormErrorMessage,
   FormHelperText,
   Input,
   Select,
} from "@chakra-ui/react";

export default function Login() {
   const [email, setEmail] = useState("");
   const [pass, setPass] = useState("");

   const validate = (e) => {
      console.log("you clicked login");
   };
   // validate fires after Login button is clicked.
   // after validation, go to dashboard

   return (
      <Box>
         <FormControl id="login-email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
               placeholder="Email"
               onChange={(e) => setEmail(e.target.value)}
            />
         </FormControl>
         <FormControl id="login-password" isRequired>
            <FormLabel>Password</FormLabel>
            <PasswordInput
               placeholder="Password"
               pass={pass}
               setPass={setPass}
            />
         </FormControl>
         <Button onClick={validate}> Login </Button>
         {/* if successful, go to /dashboard */}
         <NavLink to="/">
            <Button> Cancel </Button>
         </NavLink>
      </Box>
   );
}
