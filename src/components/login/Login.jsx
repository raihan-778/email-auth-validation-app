import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase/firebase.init";

const Login = () => {
  const [loginUser, setLoginUser] = useState(null);
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  null;

  const emailRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // reset Register Error & success

    setRegisterError("");
    setSuccess("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;

        if (user?.uid && toast.success(`${user.email} login successfully`))
          setSuccess("User Login Successfully");
        setLoginUser(user);
      })
      .catch((error) => {
        setRegisterError(error.message);
        toast.error("No User found with this email or password");
      });
    console.log("login button clicked", email);
  };

  const handleResetPassword = () => {
    const email = emailRef.current.value;
    console.log("send email to reset password");
    if (!email) {
      setRegisterError("Please Enter Your Email");
      console.log("Please Enter Your Email", emailRef.current.value);
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setRegisterError("Please Enter Your Valid Email");

      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => alert("Check your email for password reset"))
      .catch((error) => setRegisterError(error.message));
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a
                  onClick={handleResetPassword}
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <h6>
                New user?{" "}
                <span className="text-blue-600 underline">
                  {" "}
                  <Link to="/register">Register Here</Link>
                </span>
              </h6>
            </div>
          </form>
          <div className="ml-6">
            {" "}
            {registerError ? (
              <h6 className="font-bold text-2xl text-red-700">
                {registerError}
              </h6>
            ) : (
              <h6 className="font-bold text-2xl text-green-700">{success}</h6>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
