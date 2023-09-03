import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayOut from "./Components/LayOut/LayOut";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Gallery from "./Components/Gallery/Gallery";
import NotFount from "./Components/NotFount/NotFount";
import About from "./Components/About/About";
import Home from "./Components/Home/Home";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";

function App() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUser();
    }
  }, []);
  function saveUser() {
    let encodedToken = localStorage.getItem("userToken");
    let decoded = jwtDecode(encodedToken);
    // console.log(decoded);
    setUserData(decoded);
  }
  const routes = createBrowserRouter([
    {
      path: "",
      element: <LayOut userData={userData} setUserData={setUserData} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        { path: "login", element: <Login saveUser={saveUser} /> },
        { path: "register", element: <Register /> },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "gallery",
          element: (
            <ProtectedRoutes>
              <Gallery />
            </ProtectedRoutes>
          ),
        },
        {
          path: "about",
          element: (
            <ProtectedRoutes>
              <About />
            </ProtectedRoutes>
          ),
        },
        { path: "*", element: <NotFount /> },
      ],
    },
  ]);
  return <RouterProvider router={routes}></RouterProvider>;
}
export default App;
