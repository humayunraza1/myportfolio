import React from "react"
import PortfolioWebsite from "../components/PortfolioWebsite";
import { Toaster } from "sonner";

function Home () {
  return (
    <>
    <PortfolioWebsite/>
    <Toaster 
          position="top-right" 
          richColors 
          theme="dark"
        />
    </>
  )
};

export default Home;
