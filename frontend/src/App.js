import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyReports from "./pages/MyReports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<MyReports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;