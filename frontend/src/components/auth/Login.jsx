import React, { useState } from "react";
import NavBar from "../shared/NavBar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  return (
    <div>
      <NavBar />

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            {/* ✅ Added htmlFor */}
            <Label htmlFor="email">Email</Label>
            <Input
              id="email" // ✅ Added id to match htmlFor
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler} // ✅ Updated function name
              placeholder="parikshit@gmail.com"
            />
          </div>

          <div className="my-2">
            {/* ✅ Added htmlFor */}
            <Label htmlFor="password">Password</Label>
            <Input
              id="password" // ✅ Added id
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler} // ✅ Updated function name
              placeholder="********"
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center gap-3">
                <Input
                  id="student" // ✅ Added id
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler} // ✅ Updated function name
                  className="cursor-pointer"
                />
                {/* ✅ htmlFor now matches input id */}
                <Label htmlFor="student">Student</Label>
              </div>

              <div className="flex items-center gap-3">
                <Input
                  id="recruiter" // ✅ Added id
                  type="radio"
                  name="role"
                  value="recruiter" // ✅ Changed from "Recruiter" to lowercase
                  checked={input.role === "recruiter"} // ✅ Updated comparison
                  onChange={changeEventHandler} // ✅ Updated function name
                  className="cursor-pointer"
                />
                {/* ✅ htmlFor now matches input id */}
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className='w-full my-4'>
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}

          <span className="text-sm">
            Don't have an account? {/* ✅ Capitalized "Don't" */}{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
