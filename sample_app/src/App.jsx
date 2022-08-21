import { LicenseContextProvider } from "context/LicenseContext";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Licence from "components/Licence";
import NavBar from "components/NavBar";

function App() {
  return (
    <LicenseContextProvider>
      <NavBar />
      <div className="container-xl">
        <div className="flex justify-center items-center min-h-[100vh]">
          <Routes>
            <Route path="/" element={<Licence />} />
          </Routes>
        </div>
      </div>
    </LicenseContextProvider>
  );
}

export default App;
