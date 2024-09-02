import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./assets/components/LandingPage";
import Apod from "./assets/components/Apod";
import PicOfTheDay from "./assets/components/PicOfTheDay";
import Details from "./assets/components/Details";
function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apod" element={<Apod />} />
        <Route path="/pic" element={<PicOfTheDay />}></Route>
        <Route path="/image/:date" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
