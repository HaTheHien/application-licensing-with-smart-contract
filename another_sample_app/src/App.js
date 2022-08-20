import { Route, Routes } from "react-router-dom";
import "./App.css";
import Licence from "./component/Licence";
import NavBar from "./component/NavBar";

export default function App() {
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
