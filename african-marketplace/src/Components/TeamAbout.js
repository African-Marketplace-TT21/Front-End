import React from "react";
import { Box, Text, Divider } from "@chakra-ui/react";
import Footer from "./Footer";

export default function TeamAbout(props) {
   const TeamComponent = () => {
      return (
         <Box>
            <Box className="meetteam">
               <Box className="meetteam-inner">
                  <Text color="white" fontSize="4xl" fontWeight="650">
                     MEET THE TEAM
                  </Text>
                  <Text color="white" fontSize="lg" mb="3vh" mt="2vh">
                     ALIQUAM UT EX UT INTERDUM DONEC AMET IMPERDIET ELEIFEND
                  </Text>
               </Box>
            </Box>
            <Box className="team_mid">
               <Text fontSize="2xl" fontWeight="700">
                  {" "}
                  LOREM IPSUM DOLOR SIT AMET{" "}
               </Text>
               <Text fontSize="lg" mt="2vh" letterSpacing="0.15rem">
                  {" "}
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
               </Text>
            </Box>
         </Box>
      );
   };

   const AboutComponent = () => {
      return (
         <Box>
            <Box className="meetteam">
               <Box className="meetteam-inner">
                  <Text color="white" fontSize="4xl" fontWeight="650">
                     ABOUT US
                  </Text>
                  <Text color="white" fontSize="lg" mb="3vh" mt="2vh">
                     ALIQUAM UT EX UT INTERDUM DONEC AMET IMPERDIET ELEIFEND{" "}
                  </Text>
               </Box>
            </Box>
            <Box className="about_mid">
               <Text fontSize="2xl" fontWeight="700">
                  {" "}
                  LOREM IPSUM DOLOR{" "}
               </Text>
               <Text fontSize="lg" mt="2vh" letterSpacing="0.15rem">
                  Morbi mattis mi consectetur tortor elementum, varius
                  pellentesque velit convallis. Aenean tincidunt lectus auctor
                  mauris maximus, ac scelerisque ipsum tempor. Duis vulputate ex
                  et ex tincidunt, quis lacinia velit aliquet. Duis non
                  efficitur nisi, id malesuada justo. Maecenas sagittis felis ac
                  sagittis semper. Curabitur purus leo, tempus sed finibus eget,
                  fringilla quis risus. Maecenas et lorem quis sem varius
                  sagittis et a est. Maecenas iaculis iaculis sem. Donec vel
                  dolor at arcu tincidunt bibendum. Interdum et malesuada fames
                  ac ante ipsum primis in faucibus. Fusce ut aliquet justo.
                  Donec id neque ipsum. Integer eget ultricies odio. Nam vel ex
                  a orci fringilla tincidunt. Aliquam eleifend ligula non velit
                  accumsan cursus. Etiam ut gravida sapien.
                  <br></br>
                  Vestibulum ultrices risus velit, sit amet blandit massa auctor
                  sit amet. Sed eu lectus sem. Phasellus in odio at ipsum
                  porttitor mollis id vel diam. Praesent sit amet posuere risus,
                  eu faucibus lectus. Vivamus ex ligula, tempus pulvinar ipsum
                  in, auctor porta quam. Proin nec dui cursus, posuere dui eget
                  interdum. Fusce lectus magna, sagittis at facilisis vitae,
                  pellentesque at etiam. Quisque posuere leo quis sem commodo,
                  vel scelerisque nisi scelerisque. Suspendisse id quam vel
                  tortor tincidunt suscipit. Nullam auctor orci eu dolor
                  consectetur, interdum ullamcorper ante tincidunt. Mauris felis
                  nec felis elementum varius.
               </Text>
               <Divider mt="2vh" mb="2vh" />
               <Text fontSize="2xl" fontWeight="700">
                  {" "}
                  FEUGIAT ALIQUAM{" "}
               </Text>
               <Text fontSize="lg" mt="2vh" letterSpacing="0.15rem">
                  Nam sapien ante, varius in pulvinar vitae, rhoncus id massa.
                  Donec varius ex in mauris ornare, eget euismod urna egestas.
                  Etiam lacinia tempor ipsum, sodales porttitor justo. Aliquam
                  dolor quam, semper in tortor eu, volutpat efficitur quam.
                  Fusce nec fermentum nisl. Aenean erat diam, tempus aliquet
                  erat.
                  <br></br>
                  Etiam iaculis nulla ipsum, et pharetra libero rhoncus ut.
                  Phasellus rutrum cursus velit, eget condimentum nunc blandit
                  vel. In at pulvinar lectus. Morbi diam ante, vulputate et
                  imperdiet eget, fermentum non dolor. Ut eleifend sagittis
                  tincidunt. Sed viverra commodo mi, ac rhoncus justo. Duis
                  neque ligula, elementum ut enim vel, posuere finibus justo.
                  Vivamus facilisis maximus nibh quis pulvinar. Quisque
                  hendrerit in ipsum id tellus facilisis fermentum. Proin mauris
                  dui, at vestibulum sit amet, auctor bibendum neque.
               </Text>
            </Box>
         </Box>
      );
   };

   return (
      <Box>
         {props.about ? <AboutComponent /> : <TeamComponent />}
         <Box>
            <Footer />
         </Box>
      </Box>
   );
}
