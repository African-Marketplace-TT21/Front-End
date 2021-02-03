import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import PasswordInput from "./PasswordInput";
import { NavLink, useHistory } from "react-router-dom";
import sha256 from "crypto-js/sha256";

import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function Login(props) {
   const [email, setEmail] = useState("");
   const [pass, setPass] = useState("");
   const history = useHistory();

   const validate = () => {
      //find the user with matching email in data
      // check whether the password vanilla sha256 hash matches
      let success = false;
      if (props.mockAccounts.filter((i) => i.email == email).length === 0) {
         alert("This email does not belong to a registered account");
         return;
      } else {
         success =
            props.mockAccounts.filter((i) => i.email == email)[0]
               .passwordHash === sha256(pass).toString();
      }

      if (success) {
         props.setCurrentUser(
            props.mockAccounts.filter((i) => i.email == email)[0]
         );
         history.push("/dashboard");
      }
      // console.log("you clicked login");
   };
   // validate fires after Login button is clicked.
   // after validation, go to dashboard

   return (
      <Box className="login">
         <form>
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
         </form>
      </Box>
   );
}
