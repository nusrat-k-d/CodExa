import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyReports from "./pages/MyReports";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const token = localStorage.getItem("token");
  return (

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Home /> : <Login />}
        />
        <Route
          path="/reports"
          element={token ? <MyReports /> : <Login />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route 
          path="/register" 
          element={<Register />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;