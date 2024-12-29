import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase/firebase.init";

const Register = () => {
  const [userRegister, setUserRegister] = useState(null);
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    const user = { name, email, password };

    setRegisterError("");
    setSuccess("");

    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters");
      return;
    } else if (!/^(?=.*[A-Z])(?=.*\d).+$/.test(password)) {
      setRegisterError(
        "Password must contain at least one uppercase letter and one number"
      );
      return;
    } else if (!accepted) {
      setRegisterError("Please accept the terms and conditions");
      return;
    }

    console.log(user);
//create user using email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setUserRegister(user);
        // toast.success("User Register Successfully");
        setSuccess("User Registered Successfully");
        console.log("signUP", user);

        //update profile


        updateProfile(user,{
          displayName: name, photoURL: ""
        }).then(() => {
        toast.update("Profile Updated with displayName Successfully")
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });

        sendEmailVerification(user).
        then(()=>alert("Email Verification Sent "))	
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div>
      <div className=" rounded-md m-2 md:max-w-5xl">
        <form onSubmit={handleRegister} className="p-4">
          <div className="mx-auto w-3/4">
            <h2 className="text-2xl mb-2 font-semibold text-amber-400">
              Complete Your Registration Form
            </h2>{" "}
            <input
              className=" rounded-md p-2 mx-auto mb-2 w-full"
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              required
            />
            <br />
            <input
              required
              className="p-2 rounded-md mb-2 w-full"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              id="email"
            />
            <br />
            <div className="relative">
              {" "}
              <input
                required
                className="p-2 rounded-md mb-2 w-full "
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter Your Password"
              />
              <span
                className="absolute right-2 top-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-2xl" />
                ) : (
                  <FaEye className="text-2xl" />
                )}
              </span>{" "}
            </div>
            <br />
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms" className="text-sm ml-2" />I agree to the{" "}
            <a href="">terms and conditions</a>
            <br />
            <button className="btn btn-success mt-2" type="submit">
              Register
            </button>
          </div>
        </form>
        <div className="ml-6">
          {" "}
          {registerError ? (
            <h6 className="font-bold text-2xl text-red-700">{registerError}</h6>
          ) : (
            <h6 className="font-bold text-2xl text-green-700">{success}</h6>
          )}
          <p>
            Already have an account?{" "}
            <span className="text-blue-400 underline">
              <Link to="/login">Login here.</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
