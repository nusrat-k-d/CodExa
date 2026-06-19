import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyReports from "./pages/MyReports";
import Login from "./pages/Login";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;