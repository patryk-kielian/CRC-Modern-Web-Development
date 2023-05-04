import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateNewTraining from "./pages/CreateNewTraining";
import Login from "./pages/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-new-training" element={<CreateNewTraining />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
