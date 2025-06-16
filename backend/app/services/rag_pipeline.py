from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from services.mongodb import get_vectorstore

def generate_diagnosis(query: str):
    vectorstore = get_vectorstore()
    retriever = vectorstore.as_retriever()
    qa = RetrievalQA.from_chain_type(llm=ChatOpenAI(), retriever=retriever)
    return qa.run(query)
