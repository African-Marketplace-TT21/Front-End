import React, { useState } from "react";
import { Box, Button, Alert, AlertIcon } from "@chakra-ui/react";
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

      document
         .querySelectorAll(".loginalert")
         .forEach((i) => (i.style.display = "none"));
      // let success = false;
      const q = props.q;
      const faunaClient = props.faunaClient;
      // let error = 0;

      faunaClient
         .query(q.Paginate(q.Documents(q.Collection("users"))))
         .then((ret) => {
            let usermatch = [];
            const test = ret.data;

            faunaClient
               .query(q.Map(test, q.Lambda("x", q.Get(q.Var("x")))))
               .then((res) => {
                  // let a1, a2;
                  usermatch = res
                     .map((i) => i.data)
                     .filter((i) => i.email === email);
                  if (usermatch.length === 0) {
                     document.querySelector(".loginbademail").style.display =
                        "initial";
                     setTimeout(() => {
                        let temp = document.querySelector(".loginbademail");
                        temp ? (temp.style.display = "none") : {};
                     }, 6000);
                  } else {
                     if (
                        usermatch[0].passwordHash !== sha256(pass).toString()
                     ) {
                        document.querySelector(
                           ".loginbadpassword"
                        ).style.display = "initial";
                        setTimeout(() => {
                           let temp = document.querySelector(
                              ".loginbadpassword"
                           );
                           temp ? (temp.style.display = "none") : {};
                        }, 6000);
                     } else {
                        document.querySelector(".logingood").style.display =
                           "initial";
                        setTimeout(() => {
                           document.querySelector(".logingood").style.display =
                              "none";
                           props.setCurrentUser(usermatch[0]);
                           history.push("/dashboard");
                        }, 2000);
                     }
                  }
               });
         });

      // console.log("you clicked login");
   };
   // validate fires after Login button is clicked.
   // after validation, go to dashboard

   return (
      <Box className="login">
         <Alert
            status="error"
            className="loginbademail loginalert"
            display="none"
            borderRadius="8px"
            mb="1%"
         >
            <Box display="flex">
               <AlertIcon /> There is no account with this Email.
            </Box>
         </Alert>
         <Alert
            status="error"
            className="loginbadpassword loginalert"
            display="none"
            borderRadius="8px"
            mb="1%"
         >
            <Box display="flex">
               <AlertIcon /> {"Password isn't correct"}
            </Box>
         </Alert>
         <Alert
            status="success"
            className="logingood loginalert"
            display="none"
            borderRadius="8px"
            mb="1%"
         >
            <Box display="flex">
               <AlertIcon /> {"Looks Good! Going to your Dashboard!"}
            </Box>
         </Alert>
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
