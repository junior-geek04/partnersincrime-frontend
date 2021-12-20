import "./App.css";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Login />} path="/" exact />
          <Route element={<Signup />} path="/signup" exact/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
