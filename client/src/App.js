import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lightTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useState } from "react";
import Authentication from "./pages/Authentication";
import Favourites from "./pages/Favourites";
import Cart from "./pages/Cart";
import FoodDetails from "./pages/FoodDetails";
import FoodListing from "./pages/FoodListing";
import Dishes from "./pages/Dishes";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import { useSelector } from "react-redux";

const Container = styled.div``;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  // const { open, message, severity } = useSelector((state) => state.snackbar);
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar
            setOpenAuth={setOpenAuth}
            openAuth={openAuth}
            currentUser={currentUser}
          />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/favorite" exact element={<Favourites />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/Dishes/:id" exact element={<FoodDetails />} />
            <Route path="/Dishes" exact element={<FoodListing />} />
            <Route path="/orders" exact element={<Orders />} />
            <Route path="/contact" exact element={<Contact />} />
            <Route path="/Dishes" exact element={<Dishes />} />
          </Routes>
          {openAuth && (
            <Authentication setOpenAuth={setOpenAuth} openAuth={openAuth} />
          )}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
