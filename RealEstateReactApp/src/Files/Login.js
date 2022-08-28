import React from "react";

import Poster from "../Components.js/Poster";
import HouseList from "../Components.js/HouseList";

const Login = () => {
  return (
    <div className="pt-10">
      <div>
        <h1 className="text-blue-600 text-center"> Log In</h1>
      </div>

      <div>
        <form className="grid justify-center " method="post">
         
          <div> 
            <div>
              <input
                type="email"
                name="email"
                id=""
                className="bg-slate-200 px-2 pr-20 w-200 h-10 my-2 rounded-lg flex justify-center items-center text-white text-lg"
                placeholder="Email ID"
              />
            </div>
          </div>
          <div className="row">
            <div>
              <input
                type="text"
                name="password"
                id=""
                className="bg-slate-200 px-2 w-200 pr-20 h-10 my-2 rounded-lg flex justify-center items-center text-white text-lg"
                placeholder="Password"
              />
            </div>
          </div>
          
          
          <center>
            <button className="bg-violet-700 hover:bg-violet-800 transition w-100 pl-5 pr-5 lg:max-w-[100px] h-12 rounded-lg mb-5 flex items-center	align-items-center justify-center items-center text-white text-lg">
              Log In
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default Login;
