from langchain_ollama import OllamaLLM

from core.config import settings


llm = OllamaLLM(
    model=settings.OLLAMA_MODEL
)



def generate_response(
    question: str,
    context: str
):

    prompt = f"""
    You are SmartSupport AI.

    Answer using only company information.

    Keep answers short.

    Company Data:
    {context}


    Question:
    {question}
    """


    return llm.invoke(prompt)