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

    async function deleteDocument(id){


    const token =
    localStorage.getItem("token");


    await api.delete(

        `/documents/delete/${id}`,

        {
            headers:{
                Authorization:
                `Bearer ${token}`
            }
        }

    );


    setDocuments(

        documents.filter(

            (doc)=>doc.id !== id

        )

    );


}



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

                                <button
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                                onClick={
                                    ()=>{
                                        deleteDocument(doc.id);
                                    }
                                }
                                >
                                    Delete
                                </button>



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