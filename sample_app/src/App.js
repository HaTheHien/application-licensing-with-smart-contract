import { Route, Routes } from "react-router-dom";
import "./App.css";
import Licence from "./components/Licence";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Routes>
            <Route path="/" element={<Licence />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
