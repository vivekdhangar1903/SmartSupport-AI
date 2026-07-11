import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../api/axios";


function Documents(){


    const { companyId } = useParams();


    const [documents,setDocuments] = useState([]);



    useEffect(()=>{


        async function loadDocuments(){


            const token =
            localStorage.getItem("token");


            const response =
            await api.get(

                `/documents/list/${companyId}`,

                {
                    headers:{
                        Authorization:
                        `Bearer ${token}`
                    }
                }

            );


            setDocuments(
                response.data
            );


        }


        loadDocuments();


    },[companyId]);



    return (

        <div className="min-h-screen bg-gray-100">


            <div className="bg-slate-950 text-white p-5">

                <h1 className="text-2xl font-bold">

                    Knowledge Base

                </h1>

            </div>



            <div className="p-10">


                {
                    documents.map(

                        (doc)=>(

                            <div

                            key={doc.id}

                            className="bg-white p-5 mb-4 rounded-xl shadow"

                            >


                                <h2 className="text-xl font-bold">

                                    📄 {doc.filename}

                                </h2>



                                <p className="text-gray-500">

                                    Uploaded:
                                    {doc.uploaded_at}

                                </p>


                            </div>

                        )

                    )
                }


            </div>


        </div>

    );

}


export default Documents;