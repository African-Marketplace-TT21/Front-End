import React from "react";
import { InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react";
// import PropTypes from 'prop-types'

export default function PasswordInput(props) {
   const { pass, setPass } = props;
   const [show, setShow] = React.useState(false);
   const handleClick = () => setShow(!show);

   return (
      <InputGroup size="md">
         <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            name="password"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
         />
         <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
               {show ? "Hide" : "Show"}
            </Button>
         </InputRightElement>
      </InputGroup>
   );
}
