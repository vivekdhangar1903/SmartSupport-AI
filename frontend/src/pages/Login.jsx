import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";


function Login(){


    const navigate = useNavigate();


    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");



    async function handleLogin(){


        try{


            const response = await api.post(
                "/auth/login",
                {
                    email: email,
                    password: password
                }
            );


            localStorage.setItem(
                "token",
                response.data.access_token
            );


            navigate(
                "/dashboard"
            );


        }


        catch(error){


            alert(
                "Login failed"
            );


        }


    }



    return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center">


        <div className="bg-white w-96 rounded-2xl shadow-2xl p-8">


            <h1 className="text-3xl font-bold text-center text-gray-900">

                SmartSupport AI

            </h1>


            <p className="text-center text-gray-500 mt-2 mb-8">

                AI powered company assistant

            </p>



            <label className="font-medium">

                Email

            </label>


            <input

                className="w-full mt-2 mb-5 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"

                placeholder="Enter email"

                value={email}

                onChange={
                    (e)=>setEmail(e.target.value)
                }

            />



            <label className="font-medium">

                Password

            </label>


            <input

                className="w-full mt-2 mb-6 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"

                placeholder="Enter password"

                type="password"

                value={password}

                onChange={
                    (e)=>setPassword(e.target.value)
                }

            />



            <button

                onClick={handleLogin}

                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"

            >

                Login

            </button>


        </div>


    </div>

);

}


export default Login;