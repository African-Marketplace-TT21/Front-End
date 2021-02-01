import React from "react";
import "./App.css";
import { Box, Text, Button, Link } from "@chakra-ui/react";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

function App() {
   return (
      <Box>
         <Nav />
         <Box className="banner">
            <Text fontSize="3xl"> AFRICAN MARKETPLACE </Text>
            <Text>
               {" "}
               SAUTI AFRICA EMPOWERS SMALL BUSINESS OWNERS, PARTICULARLY WOMEN,
               TO IMPROVE THEIR BUSINESS AND ECONOMIC OPPORTUNITIES TO GROW OUT
               OF POVERTY.{" "}
            </Text>
            <Button> Activate </Button>
            <Link> Learn More </Link>
         </Box>
         <Box className="section1">
            <Text>
               ARCU ALIQUET VEL LOBORTIS ATA NISL EGET AUGUE AMET ALIQUET NISL
               CEP DONEC
            </Text>
            <Text>
               Aliquam ut ex ut augue consectetur interdum. Donec amet imperdiet
               eleifend fringilla tincidunt. Nullam dui leo Aenean mi ligula,
               rhoncus ullamcorper.
            </Text>
            <Box className="icons"> </Box>
         </Box>
         {/* in section 2 there is some sort of media query that makes the image go on top when narrow */}
         <Box className="section2"></Box>
         <Box className="section3"></Box>
         <Box className="cta"></Box>
         <Footer />
      </Box>
   );
}

export default App;
