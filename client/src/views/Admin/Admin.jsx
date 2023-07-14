import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import {  Outlet } from "react-router-dom";
import { useState } from "react";

import Topbar from "./scenes/global/Topbar"
import SidebarMenu from "./scenes/global/Sidebar";

import styles from './Admin.module.css'



function Admin() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
 


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={styles.admin}>
          <SidebarMenu isSidebar={isSidebar} />
          <main className={styles.content}>
            <Topbar />
            <Outlet />
           
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Admin