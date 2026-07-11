import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import api from "../api/axios";


function Chat(){


    const { companyId } = useParams();


    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(()=>{


    async function loadHistory(){


        const token =
        localStorage.getItem("token");


        const response =
        await api.get(

            `/chat/history/${companyId}`,

            {
                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }

        );


        setMessages(
            response.data
        );


    }


    loadHistory();

},[companyId]);



    async function askAI(){


    if(!question.trim()){
        return;
    }


    try{


        setLoading(true);


        const token =
        localStorage.getItem("token");


        const response = await api.post(

            `/chat/ask/${companyId}`,

            {
                question: question
            },

            {
                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }

        );


        setMessages(
            [
                ...messages,

                {
                    question: question,
                    answer: response.data.answer
                }
            ]
        );


        setQuestion("");


    }


    catch(error){


        alert(
            "AI response failed"
        );


    }


    finally{


        setLoading(false);


    }}



    return (

        <div className="min-h-screen bg-gray-100 flex flex-col">


            <div className="bg-slate-950 text-white p-5">

                <h1 className="text-2xl font-bold">
                    SmartSupport AI
                </h1>

                <p className="text-gray-300">
                    Ask questions from your company documents
                </p>

            </div>



            <div className="flex-1 p-8 overflow-y-auto">


                {

                    messages.length === 0 && !loading &&

                    <div className="text-center text-gray-400 mt-20 text-xl">

                        Ask anything from your uploaded documents

                    </div>

                }



                {

                    messages.map(

                        (msg,index)=>(

                            <div key={index}>


                                <div className="flex justify-end mb-4">

                                    <div className="bg-black text-white p-4 rounded-2xl max-w-xl">

                                        {msg.question}

                                    </div>

                                </div>



                                <div className="flex justify-start mb-6">

                                    <div className="bg-white shadow p-4 rounded-2xl max-w-xl">

                                        🤖 {msg.answer}

                                    </div>

                                </div>


                            </div>

                        )

                    )

                }




                {

                    loading &&

                    <div className="flex justify-start mb-6">

                        <div className="bg-white shadow p-4 rounded-2xl">

                            🤖 AI is thinking...

                        </div>

                    </div>

                }



            </div>




            <div className="bg-white p-5 flex gap-3 shadow">


                <input

                    className="flex-1 border rounded-xl p-3"

                    placeholder="Ask your AI assistant..."

                    value={question}

                    onChange={
                        (e)=>setQuestion(e.target.value)
                    }

                />



                <button

                    disabled={loading}

                    className="bg-black text-white px-8 rounded-xl"

                    onClick={askAI}

                >

                    {
                        loading ? "Thinking..." : "Send"
                    }


                </button>


            </div>


        </div>

    );

}


export default Chat;