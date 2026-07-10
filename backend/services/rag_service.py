import chromadb

from sentence_transformers import SentenceTransformer


embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


client = chromadb.PersistentClient(
    path="chroma_db"
)


collection = client.get_or_create_collection(
    name="company_documents"
)


def store_document(
    text: str,
    company_id: str
):

    chunks = []

    words = text.split()


    for i in range(0, len(words), 200):

        chunk = " ".join(
            words[i:i+200]
        )

        chunks.append(chunk)


    embeddings = embedding_model.encode(
        chunks
    ).tolist()


    for index, chunk in enumerate(chunks):

        collection.add(

            ids=[
                f"{company_id}_{index}"
            ],

            documents=[
                chunk
            ],

            embeddings=[
                embeddings[index]
            ],

            metadatas=[
                {
                    "company_id": company_id
                }
            ]
        )


    return len(chunks)



def search_document(
    question: str,
    company_id: str
):

    question_embedding = embedding_model.encode(
        question
    ).tolist()


    result = collection.query(

        query_embeddings=[
            question_embedding
        ],

        n_results=3,

        where={
            "company_id": company_id
        }
    )


    documents = result.get(
        "documents"
    )


    if not documents:

        return []


    return documents[0]