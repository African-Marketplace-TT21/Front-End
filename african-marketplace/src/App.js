import React, { useState } from "react";
import "./App.css";
import { Route, NavLink } from "react-router-dom";
import { Box, Text, Button, Link, Image, Divider } from "@chakra-ui/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
   faPaperPlane,
   faLaptop,
   faCode,
   faHeadphones,
   faHeart,
   faFlag,
   faGem,
} from "@fortawesome/free-solid-svg-icons";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Pic01 from "./Assets/pic01.jpeg";
import Pic02 from "./Assets/pic02.jpeg";
import Pic03 from "./Assets/pic03.jpeg";
import Dashboard from "./Components/Dashboard";
import Market from "./Components/Market";
import TestItems from "./Mockdata/testitems";

library.add(faPaperPlane, faLaptop, faCode, faHeadphones, faHeart, faFlag);
const section3icons = [
   "paper-plane",
   "laptop",
   "code",
   "headphones",
   "heart",
   "flag",
];

const section3headers = [
   "ARCU ACCUMSAN",
   "AC AUGUE EGET",
   "MUS SCELERISQUE",
   "MAURIS IMPERDIET",
   "AENEAN PRIMIS",
   "TORTOR UT",
];

const section2headers = [
   "MAGNA PRIMIS LOBORTIS SED ULLAMCORPER",
   "TORTOR DOLORE FEUGIAT ELEMENTUM MAGNA",
   "AUGUE ELEIFEND ALIQUET SED CONDIMENTUM",
];

const section2text =
   "Aliquam ut ex ut augue consectetur interdum. Donec hendrerit imperdiet. Mauris eleifend fringilla nullam aenean mi ligula.";

// the three parts in section 2
function Section2Segments({ piconright, picsrc, title, bodytext, bgcolor }) {
   return (
      <Box className="sectionsegment" bgColor={bgcolor}>
         <Image src={picsrc} order={piconright * 1} w={"46%"} />
         <Box className="sectionsegment-inner">
            <Text mb="5%" fontSize="2xl">
               {title}
            </Text>
            <Text fontSize="lg">{bodytext}</Text>
         </Box>
      </Box>
   );
}

const s3scolor = [
   "rgba(0, 0, 0, 0.035)",
   "rgba(0, 0, 0, 0.07)",
   "rgba(0, 0, 0, 0.105)",
   "rgba(0, 0, 0, 0.14)",
   "rgba(0, 0, 0, 0.175)",
   "rgba(0, 0, 0, 0.21)",
];

function Section3Segments({ icon, header, s3scolor }) {
   return (
      <Box className="sectioncard" bgColor={s3scolor}>
         <FontAwesomeIcon icon={icon} />
         <Box className="sectioncard-inner">
            <Text mb="5%" fontSize="2xl">
               {header}
            </Text>
            <Text fontSize="lg">
               Augue consectetur sed interdum imperdiet et ipsum. Mauris lorem
               tincidunt nullam amet leo Aenean ligula consequat consequat.
            </Text>
         </Box>
      </Box>
   );
}

function AnimateScroll() {
   let count = 0;
   const target = document.getElementsByClassName("banner")[0].offsetHeight;
   let x = setInterval(() => {
      window.scroll({
         top: count * 10,
         behavior: "smooth",
      });
      count++;
      if (count * 10 > target) {
         clearInterval(x);
         return;
      }
   }, 4);
}

function App() {
   const [mockItems, setMockItems] = useState(TestItems);

   return (
      <Box width="100%" className="appbody">
         <Nav />
         <Route exact path="/">
            <Box className="banner">
               <Box className="banner-inner">
                  <Text
                     color="white"
                     fontSize="4xl"
                     letterSpacing="0.4rem"
                     borderTop="3px solid white"
                     borderBottom="3px solid white"
                     padding="1%"
                     mb="3vh"
                  >
                     AFRICAN MARKETPLACE
                  </Text>
                  <Text color="white" fontSize="lg" mb="3vh">
                     SAUTI AFRICA EMPOWERS SMALL BUSINESS OWNERS, PARTICULARLY
                     WOMEN, TO IMPROVE THEIR BUSINESS AND ECONOMIC OPPORTUNITIES
                     TO GROW OUT OF POVERTY.
                  </Text>
                  <NavLink to="/market">
                     <Button w="15vh"> Activate </Button>
                  </NavLink>
               </Box>
               <Box marginTop="25vh" marginBottom="5vh">
                  <Link
                     // href="#jumppoint"
                     onClick={AnimateScroll}
                  >
                     <Text fontSize="xl" color="white">
                        Learn More
                     </Text>
                  </Link>
               </Box>
            </Box>
            <Box id="jumppoint" className="section1" bgColor="#21b2a6">
               <Box width="70vh" mt="10vh">
                  <Text fontSize="3xl" color="white">
                     ARCU ALIQUET VEL LOBORTIS ATA NISL EGET AUGUE AMET ALIQUET
                     NISL CEP DONEC
                  </Text>
                  <Box
                     margin="3vh 0"
                     border="2px solid rgba(55, 55, 55, 0.17)"
                     bgColor="rgba(55, 55, 55, 0.17)"
                  />
                  <Text fontSize="lg" color="white">
                     Aliquam ut ex ut augue consectetur interdum. Donec amet
                     imperdiet eleifend fringilla tincidunt. Nullam dui leo
                     Aenean mi ligula, rhoncus ullamcorper.
                  </Text>
               </Box>

               <Box className="icons">
                  <Box>
                     <Box className="diamond"></Box>
                     <FontAwesomeIcon
                        color="#00ffcc"
                        size="2x"
                        icon={faGem}
                        style={{ position: "relative", top: "-45px" }}
                     />
                  </Box>
                  <Box>
                     <Box className="diamond"></Box>
                     <FontAwesomeIcon
                        size="2x"
                        color="#00f0ff"
                        icon={faHeart}
                        style={{ position: "relative", top: "-45px" }}
                     />
                  </Box>
                  <Box>
                     <Box className="diamond"></Box>
                     <FontAwesomeIcon
                        size="2x"
                        color="#76ddff"
                        icon={faCode}
                        style={{ position: "relative", top: "-50px" }}
                     />
                  </Box>
               </Box>
            </Box>
            {/* in section 2 there is some sort of media query that makes the image go on top when narrow */}
            <Box className="section2" bgColor="#2e3842" color="#fff">
               <Section2Segments
                  piconright={false}
                  picsrc={Pic01}
                  title={section2headers[0]}
                  bodytext={section2text}
                  bgcolor="rgba(0, 0, 0, 0.075)"
               />
               <Section2Segments
                  piconright={true}
                  picsrc={Pic02}
                  title={section2headers[1]}
                  bodytext={section2text}
                  bgcolor="rgba(0, 0, 0, 0.15)"
               />
               <Section2Segments
                  piconright={false}
                  picsrc={Pic03}
                  title={section2headers[2]}
                  bodytext={section2text}
                  bgcolor="rgba(0, 0, 0, 0.225)"
               />
            </Box>
            <Box className="section3">
               <Box className="section3-top">
                  <Text mt="12vh" mb="3%" fontSize="2xl">
                     ACCUMSAN MUS TORTOR NUNC ALIQUET
                  </Text>
                  <Divider />
                  <Text fontSize="lg" mt="3%">
                     Aliquam ut ex ut augue consectetur interdum. Donec amet
                     imperdiet eleifend fringilla tincidunt. Nullam dui leo
                     Aenean mi ligula, rhoncus ullamcorper.
                  </Text>
               </Box>
               <Box className="section3cards">
                  {section3icons.map((i, j) => {
                     return (
                        <Section3Segments
                           key={i + j}
                           icon={i}
                           header={section3headers[j]}
                           s3scolor={s3scolor[j]}
                        />
                     );
                  })}
               </Box>
            </Box>
            <Box className="homepage-end">
               <Box className="cta">
                  <Box className="cta-text">
                     <Text fontSize="2xl" letterSpacing="0.2rem">
                        ARCUE UT VEL COMMODO
                     </Text>
                     <Text fontSize="lg">
                        Aliquam ut ex ut augue consectetur interdum endrerit
                        imperdiet amet eleifend fringilla.
                     </Text>
                  </Box>
                  <Box className="cta-buttons">
                     <NavLink to="/market">
                        <Button mb="5%" width="75%">
                           Activate
                        </Button>
                     </NavLink>

                     <Button mt="5%" mb="10%" width="75%">
                        Learn More
                     </Button>
                  </Box>
               </Box>
               <Footer />
            </Box>
         </Route>
         <Route exact path="/register">
            <Register />
         </Route>
         <Route exact path="/login">
            <Login />
         </Route>
         <Route exact path="/dashboard">
            <Dashboard mockItems={mockItems} setMockItems={setMockItems} />
         </Route>
         <Route exact path="/market">
            <Market mockItems={mockItems} />
         </Route>
      </Box>
   );
}

export default App;
