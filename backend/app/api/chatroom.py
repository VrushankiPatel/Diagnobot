from fastapi import WebSocket, WebSocketDisconnect, APIRouter
from fastapi.responses import HTMLResponse
import os
from typing import Optional, Dict, List

router = APIRouter()

@router.get("/")
async def get_chat_page():
    file_path = os.path.join(os.path.dirname(__file__), "templates/chat.html")
    with open(file_path, "r") as f:
        html_content = f.read()
    return HTMLResponse(content=html_content)


class ChatRoom:
    def __init__(self):
        self.user_ws: Optional[WebSocket] = None
        self.chat_history: List[Dict[str, str]] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.user_ws = websocket

    def disconnect(self):
        self.user_ws = None

    async def handle_user_message(self, message: str):
        self.chat_history.append({"role": "user", "content": message})

        # Get response from fine-tuned model (replace with actual call)
        reply = await self.get_llm_response()

        self.chat_history.append({"role": "assistant", "content": reply})

        if self.user_ws:
            await self.user_ws.send_text(reply)

    async def get_llm_response(self) -> str:
        # 🔁 Replace this with call to your actual fine-tuned LLM
        # Example for OpenAI-compatible API:
        """
        import openai
        response = await openai.ChatCompletion.acreate(
            model="your-fine-tuned-model-id",
            messages=self.chat_history
        )
        return response['choices'][0]['message']['content']
        """
        return f"Echoing: {self.chat_history[-1]['content']}"  # Dummy fallback


rooms: Dict[str, ChatRoom] = {}

@router.websocket("/ws/{room_id}")
async def websocket_chat(websocket: WebSocket, room_id: str):
    if room_id not in rooms:
        rooms[room_id] = ChatRoom()

    room = rooms[room_id]
    await room.connect(websocket)

    try:
        while True:
            msg = await websocket.receive_text()
            await room.handle_user_message(msg)
    except WebSocketDisconnect:
        room.disconnect()
        del rooms[room_id]
