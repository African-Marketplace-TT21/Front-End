import React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
   faBasketballBall,
   faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import {
   faTwitter,
   faFacebook,
   faInstagram,
} from "@fortawesome/free-brands-svg-icons";
function Footer() {
   return (
      <Box className="footer">
         <IconButton
            bgColor="rgba(25,25,25,0.3)"
            mr="1vw"
            icon={<FontAwesomeIcon color="#bbbbbb" icon={faTwitter} />}
         ></IconButton>
         <IconButton
            bgColor="rgba(25,25,25,0.3)"
            mr="1vw"
            icon={<FontAwesomeIcon color="#bbbbbb" icon={faFacebook} />}
         ></IconButton>
         <IconButton
            bgColor="rgba(25,25,25,0.3)"
            mr="1vw"
            icon={<FontAwesomeIcon color="#bbbbbb" icon={faInstagram} />}
         ></IconButton>
         <IconButton
            bgColor="rgba(25,25,25,0.3)"
            mr="1vw"
            icon={<FontAwesomeIcon color="#bbbbbb" icon={faBasketballBall} />}
         ></IconButton>
         <IconButton
            bgColor="rgba(25,25,25,0.3)"
            icon={<FontAwesomeIcon color="#bbbbbb" icon={faEnvelope} />}
         ></IconButton>
      </Box>
   );
}

export default Footer;
