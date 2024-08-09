import { useState } from "react";

import { AuroraHero } from "./assets/components/AuroraHero";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div><AuroraHero/></div>
    </>
  );
}

export default App;
