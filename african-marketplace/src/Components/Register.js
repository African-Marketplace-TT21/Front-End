import React, { useState } from "react";
import { Box, Button, Alert, AlertIcon } from "@chakra-ui/react";
import { NavLink, useHistory } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import sha256 from "crypto-js/sha256";
import { v4 as uuidv4 } from "uuid";
// import axios from "axios";

export default function Register(props) {
   const q = props.q;
   const faunaClient = props.faunaClient;
   const history = useHistory();
   const [name, setName] = useState({ firstname: "", lastname: "" }); // [firstname, lastname]
   const [email, setEmail] = useState("");

   const [pass, setPass] = useState("");
   const [accountType, setAccountType] = useState("user");

   const submit = () => {
      // this would validate and add an entry to the mock data for now
      const info = {};
      info.name = name.firstname + " " + name.lastname;
      info.email = email;
      info.passwordHash = sha256(pass).toString();
      info.id = uuidv4();
      info.accountType = accountType;

      // console.log(info);
      if (accountType === "owner") {
         info.items = [];
      }
      if (props.mockAccounts.filter((i) => i.email == email).length === 0) {
         // props.setMockAccounts(props.mockAccounts.concat(info));
         faunaClient.query(
            q.Create(q.Collection("users"), {
               data: info,
            })
         );
         // register succeeded, go to homepage.
         // tbd: some visual hint
         history.push("/");
      } else {
         document.querySelector(".registerfail").style.display = "initial";
         setTimeout(() => {
            document.querySelector(".registerfail").style.display = "none";
         }, 4000);
      }

      // axios.post().then().catch()
   };

   return (
      <Box className="register">
         {/* {console.log(uuidv4())} */}
         <Alert
            status="error"
            className="registerfail"
            display="none"
            borderRadius="8px"
            mb="1%"
         >
            <Box display="flex">
               <AlertIcon /> This Email is already taken.
            </Box>
         </Alert>
         <form>
            <FormControl id="reg-first-name" isRequired>
               <FormLabel>First Name</FormLabel>
               <Input
                  placeholder="First name"
                  onChange={(e) =>
                     setName({ ...name, firstname: e.target.value })
                  }
               />
            </FormControl>
            <FormControl id="reg-last-name" isRequired>
               <FormLabel>Last Name</FormLabel>
               <Input
                  placeholder="Last name"
                  onChange={(e) =>
                     setName({ ...name, lastname: e.target.value })
                  }
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
               <Button onClick={submit}> Submit </Button>

               <NavLink to="/">
                  <Button> Cancel </Button>
               </NavLink>
            </Box>{" "}
         </form>
      </Box>
   );
}
