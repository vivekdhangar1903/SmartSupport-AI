import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";


function Dashboard(){


    const navigate = useNavigate();


    const [companies, setCompanies] = useState([]);



    useEffect(()=>{


        async function getCompanies(){


            const token = localStorage.getItem(
                "token"
            );


            const response = await api.get(
                "/company/my-companies",
                {
                    headers:{
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );


            setCompanies(
                response.data
            );

        }


        getCompanies();


    }, []);



    return (

    <div className="min-h-screen bg-gray-100">


        <div className="bg-slate-950 text-white px-10 py-5 flex justify-between">


            <h1 className="text-2xl font-bold">

                SmartSupport AI

            </h1>


            <button

                onClick={
                    ()=>{
                        localStorage.removeItem("token");
                        navigate("/");
                    }
                }

                className="bg-white text-black px-4 py-2 rounded-lg"

            >

                Logout

            </button>


        </div>



        <div className="p-10">


            <h2 className="text-3xl font-bold mb-8">

                Your Workspaces

            </h2>



            <div className="grid md:grid-cols-2 gap-6">


                {

                    companies.map(

                        (company)=>(


                            <div

                                key={company.company_id}

                                className="bg-white rounded-2xl shadow-lg p-6"


                            >


                                <h3 className="text-2xl font-bold mb-3">

                                    🏢 {company.name}

                                </h3>



                                <p className="text-gray-500 mb-6">

                                    AI powered knowledge workspace

                                </p>



                                <div className="flex gap-3">


                                    <button


                                        className="border px-5 py-2 rounded-lg hover:bg-gray-100"


                                        onClick={
                                            ()=>
                                            navigate(
                                                `/upload/${company.company_id}`
                                            )
                                        }


                                    >

                                        📄 Upload


                                    </button>



                                    <button


                                        className="bg-black text-white px-5 py-2 rounded-lg"


                                        onClick={
                                            ()=>
                                            navigate(
                                                `/chat/${company.company_id}`
                                            )
                                        }


                                    >

                                        💬 AI Chat


                                    </button>


                                </div>



                            </div>

                        )

                    )

                }


            </div>


        </div>


    </div>

);

}


export default Dashboard;