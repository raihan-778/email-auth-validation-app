import React, { useState } from "react";

const Register = () => {
  const [userRegister, setUserRegister] = useState(null);
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const user = { name, email, password };
    console.log(name);

    setUserRegister(user);
    console.log(user);
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
              className="p-2 rounded-md mb-2 w-full"
              type="email"
              name="email"
              id="email"
            />
            <br />
            <input
              className="p-2 rounded-md mb-2 w-full"
              type="password"
              name="password"
              id="password"
            />{" "}
            <br />
            <button className="btn btn-success" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
