import "../src/styles/app.scss";
import Home from "./pages/Home";

import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Service from "./pages/Service";
import { useState } from "react";
import Navbar from "./components/Navbar";
import History from "./components/History";
import Forgot from "./components/Forgot";
function App() {
  const [user, setUser] = useState(false);
  const [username, setusername] = useState("");
  const [useremail, setUseremail] = useState("");

  return (
    <>
      <Navbar
        user={user}
        setUser={setUser}
        username={username}
        setusername={setusername}
      />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route
          path="/login"
          element={
            <Login
              user={user}
              setUser={setUser}
              username={username}
              setusername={setusername}
              setUseremail={setUseremail}
            />
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/service" element={<Service />} />
        <Route
          path="/history"
          element={
            <History
              user={user}
              username={username}
              setUser={setUser}
              useremail={useremail}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
