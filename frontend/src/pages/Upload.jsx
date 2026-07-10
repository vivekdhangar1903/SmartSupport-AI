import { useState } from "react";

import { useParams } from "react-router-dom";

import api from "../api/axios";


function Upload(){


    const { companyId } = useParams();


    const [file,setFile] = useState(null);



    async function uploadPDF(){


        const token = localStorage.getItem("token");


        const formData = new FormData();


        formData.append(
            "file",
            file
        );


        const response = await api.post(

            `/documents/upload/${companyId}`,

            formData,

            {
                headers:{

                    Authorization:
                    `Bearer ${token}`,

                    "Content-Type":
                    "multipart/form-data"

                }
            }

        );


        alert(
            response.data.message
        );


    }



   return (

    <div className="min-h-screen bg-gray-100">


        <div className="bg-slate-950 text-white p-5">


            <h1 className="text-2xl font-bold">

                SmartSupport AI

            </h1>


            <p className="text-gray-300">

                Train your AI with company documents

            </p>


        </div>




        <div className="flex justify-center mt-20">


            <div className="bg-white shadow-xl rounded-2xl p-10 w-96 text-center">


                <div className="text-6xl mb-5">

                    📄

                </div>



                <h2 className="text-2xl font-bold mb-3">

                    Upload Knowledge Base

                </h2>



                <p className="text-gray-500 mb-6">

                    Upload PDF documents for AI learning

                </p>



                <input

                    className="mb-6"

                    type="file"

                    accept=".pdf"

                    onChange={
                        (e)=>
                        setFile(
                            e.target.files[0]
                        )
                    }

                />



                <button

                    onClick={uploadPDF}

                    className="w-full bg-black text-white py-3 rounded-xl"

                >

                    Upload Document

                </button>


            </div>


        </div>


    </div>

);


}


export default Upload;