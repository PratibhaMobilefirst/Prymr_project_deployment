import React from "react";
import { Link } from "react-router-dom";
import WalletComponent from "../SignupIn/WalletComponent";

const Buttongroups = () => {
  const handleSignin = () => {
    alert("Directing to Signin");
  };
  const handleSignup = () => {
    alert("Directing toSignUp");
  };
  const handleForgetPassword = () => {
    alert("Directing to ForgetPassword");
  };
  return (
    <div>
      <div className="mt-10">
        <WalletComponent className="bg-[#2D78E6] mt-20 mb-5 w-[95%] h-[45px] " />
        <Link to="/signup">
          <button
            className="text-gray-900 mt-4 font-bold bg-opacity-300 bg-white opacity-50 gap-2 w-[95%] border h-[45px] rounded-full "
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </Link>
        <Link to="/forgetpassword">
          <p
            className="text-white mt-2 flex justify-center "
            onClick={handleForgetPassword}
          >
            Forget Password
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Buttongroups;
