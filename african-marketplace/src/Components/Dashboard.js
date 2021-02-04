import React, { useState } from "react";
// import { Route, Navlink } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";

import "../Dashboard.css";
import Items from "./DashboardComponents/Items";
import Overview from "./DashboardComponents/Overview";
import Settings from "./DashboardComponents/Settings";
import Profile from "./DashboardComponents/Profile";
import Orders from "./DashboardComponents/Orders";

export default function Dashboard(props) {
   const [currentdisplay, setCurrentdisplay] = useState("overview");

   function MainDis(element) {
      switch (element) {
         case "items":
            return (
               <Items
                  mockItems={props.mockItems}
                  setMockItems={props.setMockItems}
                  currentUser={props.currentUser}
                  currentdisplay={currentdisplay}
                  q={props.q}
                  faunaClient={props.faunaClient}
               ></Items>
            );
         case "profile":
            return <Profile currentUser={props.currentUser} />;
         case "overview":
            return <Overview currentUser={props.currentUser} />;
         case "orders":
            return <Orders currentUser={props.currentUser} />;
         case "settings":
            return <Settings currentUser={props.currentUser} />;

         default:
            return <> Displaying Nothing </>;
      }
   }

   function Menu() {
      return (
         <Box className="dashboard_menu">
            <Button ml="1vw" onClick={() => setCurrentdisplay("overview")}>
               Overview
            </Button>
            <Button ml="1vw" onClick={() => setCurrentdisplay("orders")}>
               Orders
            </Button>
            {props.currentUser.accountType === "owner" ? (
               <Button ml="1vw" onClick={() => setCurrentdisplay("items")}>
                  My Items
               </Button>
            ) : (
               <></>
            )}

            <Button ml="1vw" onClick={() => setCurrentdisplay("profile")}>
               Profile
            </Button>
            <Button ml="1vw" onClick={() => setCurrentdisplay("settings")}>
               Settings
            </Button>
         </Box>
      );
   }

   return (
      <Box className="dashboard">
         <Menu mockItems={props.mockItems} setMockItems={props.setMockItems} />
         {MainDis(currentdisplay)}
      </Box>
   );
}
