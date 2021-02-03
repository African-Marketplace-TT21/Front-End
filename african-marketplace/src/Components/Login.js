import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import PasswordInput from "./PasswordInput";
import { NavLink } from "react-router-dom";

import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function Login() {
   const [email, setEmail] = useState("");
   console.log(email);
   const [pass, setPass] = useState("");

   const validate = () => {
      console.log("you clicked login");
   };
   // validate fires after Login button is clicked.
   // after validation, go to dashboard

   return (
      <Box className="login">
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
         <Box display="flex" justifyContent="space-around" mt="3%">
            <Button onClick={validate}> Login </Button>
            {/* if successful, go to /dashboard */}
            <NavLink to="/">
               <Button> Cancel </Button>
            </NavLink>
         </Box>
      </Box>
   );
}
