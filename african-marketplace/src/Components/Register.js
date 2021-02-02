import React, { useState } from "react";
import { Box, Text, Button, Link, Stack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import {
   FormControl,
   FormLabel,
   FormErrorMessage,
   FormHelperText,
   Input,
   Select,
} from "@chakra-ui/react";
import axios from "axios";

export default function Register() {
   const [name, setName] = useState({ firstname: "", lastname: "" }); // [firstname, lastname]
   const [email, setEmail] = useState("");

   const [pass, setPass] = useState("");
   const [accountType, setAccountType] = useState("user");

   const submit = () => {
      // this only congregates state for now
      const info = {};
      info.name = name;
      info.email = email;
      info.pass = pass;
      info.accountType = accountType;

      console.log(info);

      // axios.post().then().catch()
   };

   return (
      <Box className="register">
         <FormControl id="reg-first-name" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
               placeholder="First name"
               onChange={(e) => setName({ ...name, firstname: e.target.value })}
            />
         </FormControl>
         <FormControl id="reg-last-name" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
               placeholder="Last name"
               onChange={(e) => setName({ ...name, lastname: e.target.value })}
            />
         </FormControl>
         <FormControl id="reg-email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
               placeholder="Email"
               onChange={(e) => setEmail(e.target.value)}
            />
         </FormControl>
         <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <PasswordInput
               placeholder="Password"
               pass={pass}
               setPass={setPass}
            />
         </FormControl>
         <FormControl id="customer-type" isRequired>
            <FormLabel>Account Type</FormLabel>
            <Select onChange={(e) => setAccountType(e.target.value)}>
               <option value="user">User</option>
               <option value="owner">Owner</option>
            </Select>
         </FormControl>

         <Box display="flex" justifyContent="space-around" mt="3%">
            <NavLink to="/">
               <Button onClick={submit}> Submit </Button>
            </NavLink>

            <NavLink to="/">
               <Button> Cancel </Button>
            </NavLink>
         </Box>
      </Box>
   );
}
