import React from "react";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


export default function App() {
  return(
  <BrowserRouter>
    <Header />
    <div className={'main'}>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  </BrowserRouter>
  )
}
