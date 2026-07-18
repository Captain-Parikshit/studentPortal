import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import NavBar from "./components/shared/NavBar";
import Login from "./components/auth/login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
//4:33:50 time 
const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
])

function App() {
  return (
    <>
      <RouterProvider router = {appRouter}/>
    </>
  );
}

export default App;
