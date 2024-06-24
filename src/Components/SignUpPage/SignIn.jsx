import { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import SocialMediaBtn from "./SocialMediaBtn";
import { RxCrossCircled } from "react-icons/rx";

const SignIn = ({ mediaBtn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = { username: username, password: password };
    try {
      const result = await fetch(
        "https://prymr-dev-backend.vercel.app/api/auth/completeProfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      )
        .then((response) => {
          console.log(response);
          return response.json();
        })

        .then((data) => {
          console.log(data);
          if (data.status) {
            localStorage.setItem("user-info", JSON.stringify(data));
            alert("Sign in successful");
            navigate("/home");
          } else {
            alert("Sign in failed");
          }
        });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  const handleForgetPassword = () => {
    alert("Directing to ForgetPassword");
  };

  return (
    <div className="bg-black text-white mx-auto h-[100%] mr-3">
      <div className="relative ">
        <RxCrossCircled className=" w-8 h-8 mx-[82%] top-[55.89px]  " />

        <h1 className="text-left h-[4vh] m-5 text-[28px] font-bold  ">
          Sign In to Prymr
        </h1>

        <img className="p-[16px] " src="\Images\or.png" alt="Or " />
      </div>
      <div className="m-6">
        <form onSubmit={handleSubmit}>
          <label>
            Email Address / Username
            <input
              className="w-[388px] mt-1 h-[50px] gap-0 pl-2 bg-gray-800 rounded-tl-md "
              type="email"
              name="username"
              value={formData.username}
              placeholder="Enter Email Address"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password
            <input
              className="w-[388px] mt-1 h-[50px] pl-2  gap-0  bg-gray-800 rounded-tl-md "
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter text here"
              onChange={handleChange}
              required
            />
          </label>

          <Link to="/forgetpassword">
            <p
              className="flex font-inter text-lg font-medium leading-6 justify-end m-2"
              onClick={handleForgetPassword}
            >
              Forget Password ?
            </p>
          </Link>
          <button
            className="text-white mt-10 font-bold bg-opacity-300 bg-blue-600 gap-1 w-[95%] h-[45px] rounded-full "
            type="submit"
          >
            Sign In
          </button>
          <span className="flex mt-3 justify-center">
            <p>
              Don’t have an account?
              <Link to="/signup" className="text-base">
                Sign Up
              </Link>
            </p>
          </span>
        </form>
      </div>
      <img
        src="\Images\Line.png"
        className=" flex justify-center mx-auto mt-44 [h-10vh] align-center"
        alt=""
      />
    </div>
  );
};
export default SignIn;
