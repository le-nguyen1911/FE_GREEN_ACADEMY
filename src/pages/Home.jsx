import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Policy from "../components/Policy";
import Featuredcategories from "../components/Featuredcategories";
// import BestSeller from "../components/BestSeller";
import axios from 'axios'
import Slider from "../components/Slider";
import BestSeller from "../components/BestSeller";
import NewsletterBox from "../components/NewsletterBox";
import Despersonal from "../components/Despersonal";


const Home = () => {
 

  return (
    <>
      <div>
        <Sidebar />
        <Policy />
        <Featuredcategories />
        <Slider />
        <BestSeller />
        <Despersonal />
        <NewsletterBox />
      </div>
    </>
  );
};

export default Home;