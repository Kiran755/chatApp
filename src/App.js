import './App.css';
import Auth from "./components/Auth";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
function App() {
  return (

    <div className="App">
      <Routes>
        <Route path="/chatApp" element={<Auth />}></Route>
        <Route path="/MainPage" element={<MainPage />}></Route>
      </Routes>
    </div >
  );
}


export default App;
