import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyReports from "./pages/MyReports";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Progress from "./pages/Progress";
import ReportDetails from "./pages/ReportDetails";

function App() {
  const token = localStorage.getItem("token");
  return (

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Home /> : <Register />}
        />
        <Route
          path="/reports"
          element={token ? <MyReports /> : <Login />}
        />
        <Route
          path="/progress"
          element={token ? <Progress /> : <Login />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/report/:id"
          element={token ? <ReportDetails /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;