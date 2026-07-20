import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import NavBar from "./components/shared/NavBar";
import Login from "./components/auth/login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
//5:56:00 time 
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
  {
    path:'/Jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
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
