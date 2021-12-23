import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/hompage.component.jsx";
import ShopPage from "./pages/shop/shop.component.jsx";



function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={< HomePage/>}></Route>
        <Route path="/shop" element={< ShopPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
