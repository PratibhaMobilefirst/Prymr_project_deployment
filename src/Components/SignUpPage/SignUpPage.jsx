import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { useState } from "react";

import { RxCrossCircled } from "react-icons/rx";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // setPassword(e.target.value);
  };

  // Perform password validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // -------------***********Validate form data ********** -------------
    if (
      formData.firstName !== "" &&
      formData.lastName !== "" &&
      formData.userName !== "" &&
      passwordValid &&
      formData.email.trim() !== ""
    ) {
      handleSignUp(e);
    } else {
      alert("Please fill out all the fields correctly");
    }
  };
  const handleBack = () => {
    const storedToken = localStorage.removeItem("token");
    navigate("/");
  };

  //-------------***********API INTEGRATION ********** -------------

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!storedToken) {
      alert("No token found. Please sign in again.");

      return;
    }
    try {
      const result = await fetch(
        "https://prymr-dev-backend.vercel.app/api/auth/completeProfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${storedToken}`,
          },

          body: JSON.stringify(formData),
        }
      )
        .then((response) => {
          // console.log(response);
          return response.json();
        })

        .then((data) => {
          // console.log(data);
          if (data.flag == null) {
            alert("Sign in successful");
            navigate("/home");
          } else {
            alert("Sign in failed, please complete the sign-up process.");
            navigate("/signup");
          }
        });
    } catch (error) {
      // console.error("Error signing in:", error);
      toast.error("Error in signing in");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="bg-black text-white p-3 h-[100vh]">
      <div className="relative pt-5">
        <RxCrossCircled
          className=" w-8 h-8 mx-[75%] top-[55.89px] "
          onClick={handleBack}
        />
        <h1 className="flex justify-center  text-[28px] font-bold h-39.19 ">
          Sign Up to get started on Prymr
        </h1>
      </div>
      <div className="m-6">
        <form onSubmit={handleSignUp}>
          <label>
            First Name
            <input
              className="w-[83vw] mt-1 h-[50px] gap-0 pl-2 bg-gray-800 rounded-tl-md "
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="Enter First Name"
              maxLength={80}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name
            <input
              className="w-[83vw] h-[50px] gap-0 pl-2 bg-gray-800 rounded-tl-md "
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Enter Last Name"
              onChange={handleChange}
              maxLength="100"
              required
            />
          </label>
          <label>
            User Name
            <input
              className="w-[83vw] h-[50px] gap-0 pl-2 bg-gray-800 rounded-tl-md "
              type="text"
              name="userName"
              value={formData.userName}
              placeholder="Enter User Name"
              onChange={handleChange}
              maxLength="80"
              required
            />
          </label>
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
            <button
              className="text-white  font-bold bg-opacity-300 bg-blue-600 gap-2 w-[35vw] h-[45px] rounded-full "
              type="submit"
            >
              Register Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignupPage;
