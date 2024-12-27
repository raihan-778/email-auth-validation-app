import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase/firebase.init";

const Login = () => {
  const [loginUser, setLoginUser] = useState;
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  null;

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

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
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <h6>New user?</h6>
              <span>
                <Link to="/register">Register Here</Link>
              </span>
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
