import React, { useState } from "react";
import { Box, Button, Alert, AlertIcon, Text } from "@chakra-ui/react";
import { NavLink, useHistory } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import {
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   Select,
} from "@chakra-ui/react";
import sha256 from "crypto-js/sha256";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import RegValidation from "../Validation_Schema/RegValidation";

export default function Register(props) {
   const q = props.q;
   const faunaClient = props.faunaClient;
   const history = useHistory();
   const [name, setName] = useState({ firstname: "", lastname: "" }); // [firstname, lastname]
   const [email, setEmail] = useState("");

   const [pass, setPass] = useState("");
   const [accountType, setAccountType] = useState("");
   const [errors, setErrors] = useState({
      firstname: name.firstname,
      lastname: name.lastname,
      email: email,
      pass: pass,
      accountType: accountType,
   });

   const submit = () => {
      document
         .querySelectorAll(".registeralert")
         .forEach((i) => (i.style.display = "none"));

      const info = {};
      info.name = name.firstname + " " + name.lastname;
      info.email = email;
      info.passwordHash = sha256(pass).toString();
      info.id = uuidv4();
      info.accountType = accountType;

      for (let i of Object.keys(info)) {
         if (info[i].length === 0) {
            document.querySelector(".registerbadinputs").style.display =
               "initial";
            setTimeout(() => {
               document.querySelector(".registerbadinputs").style.display =
                  "none";
            }, 4000);
            return;
         }
      }

      for (let i of Object.keys(errors)) {
         if (errors[i].length != 0) {
            document.querySelector(".registerbadinputs").style.display =
               "initial";
            setTimeout(() => {
               document.querySelector(".registerbadinputs").style.display =
                  "none";
            }, 4000);
            return;
         }
      }

      // console.log(info);
      if (accountType === "owner") {
         info.items = [];
      }

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

                  if (usermatch.length !== 0) {
                     document.querySelector(".registerfail").style.display =
                        "initial";
                     setTimeout(() => {
                        document.querySelector(".registerfail").style.display =
                           "none";
                     }, 4000);
                  } else {
                     faunaClient.query(
                        q.Create(q.Collection("users"), {
                           data: info,
                        })
                     );
                     // register succeeded, go to homepage.
                     document.querySelector(".registergood").style.display =
                        "initial";
                     setTimeout(() => {
                        document.querySelector(".registergood").style.display =
                           "none";
                        history.push("/login");
                     }, 2000);
                  }
               });
         });
   };

   const validate = (e) => {
      yup.reach(RegValidation, e.target.name)
         .validate(e.target.value)
         .then(() => {
            setErrors({
               ...errors,
               [e.target.name]: "",
            });
         })
         .catch((err) => {
            setErrors({
               ...errors,
               [e.target.name]: err.errors[0],
            });
         });
   };

   return (
      <Box className="register">
         {/* {console.log(uuidv4())} */}
         <Alert
            status="error"
            className="registerfail registeralert"
            display="none"
            borderRadius="8px"
            mb="1%"
         >
            <Box display="flex">
               <AlertIcon /> This Email is already taken.
            </Box>
         </Alert>

         <Alert
            status="error"
            className="registerbadinputs registeralert"
            display="none"
            borderRadius="8px"
            mb="1%"
         >
            <Box display="flex">
               <AlertIcon /> Your inputs are no good!
            </Box>
         </Alert>

         <Alert
            status="success"
            className="registergood registeralert"
            display="none"
            borderRadius="8px"
            mb="1%"
         >
            <Box display="flex">
               <AlertIcon /> Looks Good! Taking you to login!
            </Box>
         </Alert>

         <form>
            <FormControl id="reg-first-name" isRequired>
               <FormLabel>First Name </FormLabel>
               <InputGroup>
                  {" "}
                  <Input
                     name="firstname"
                     placeholder="First name"
                     onChange={(e) => {
                        setName({ ...name, firstname: e.target.value });
                        validate(e);
                     }}
                  />{" "}
                  {errors.firstname.length > 0 && (
                     <Box className="yuperror" mr="-20vw">
                        <Text>
                           {errors.firstname}
                           {"  "}
                           {/* a whitespace hack here */}
                        </Text>
                     </Box>
                  )}
               </InputGroup>
            </FormControl>
            <FormControl id="reg-last-name" isRequired>
               <FormLabel>Last Name</FormLabel>
               <InputGroup>
                  {" "}
                  <Input
                     name="lastname"
                     placeholder="Last name"
                     onChange={(e) => {
                        setName({ ...name, lastname: e.target.value });
                        validate(e);
                     }}
                  />
                  {errors.lastname.length > 0 && (
                     <Box className="yuperror" mr="-20vw">
                        <Text>
                           {errors.lastname}
                           {"  "}
                        </Text>
                     </Box>
                  )}
               </InputGroup>
            </FormControl>
            <FormControl id="reg-email" isRequired>
               <FormLabel>Email</FormLabel>
               <InputGroup>
                  {" "}
                  <Input
                     name="email"
                     placeholder="Email"
                     onChange={(e) => {
                        setEmail(e.target.value);
                        validate(e);
                     }}
                  />
                  {errors.email.length > 0 && (
                     <Box className="yuperror" mr="-20vw">
                        <Text>
                           {errors.email}
                           {"  "}
                        </Text>
                     </Box>
                  )}
               </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
               <FormLabel>Password</FormLabel>

               <Box>
                  {" "}
                  <PasswordInput
                     placeholder="Password"
                     pass={pass}
                     setPass={setPass}
                     validate={validate}
                  />
                  {errors.pass.length > 0 && (
                     <Box className="yuperror_2">
                        <Text>{errors.pass}</Text>
                     </Box>
                  )}{" "}
               </Box>
            </FormControl>
            <FormControl id="customer-type" isRequired>
               <FormLabel>Account Type</FormLabel>

               <Select
                  name="accountType"
                  onChange={(e) => {
                     setAccountType(e.target.value);
                     validate(e);
                  }}
                  placeholder="Select Account Type"
               >
                  <option value="user">User</option>
                  <option value="owner">Owner</option>
               </Select>
               {errors.accountType.length > 0 && (
                  <Box className="yuperror_2" mr="-20vw">
                     <Text>
                        {errors.accountType}
                        {"  "}
                     </Text>
                  </Box>
               )}
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
