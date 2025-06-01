from fastapi import FastAPI, WebSocket, WebSocketDisconnect, APIRouter

router = APIRouter()
from typing import Optional, Dict

app = FastAPI()

@router.get("/")
async def get():
    with open("../app/templates/chat.html", "r") as f:
        html_content = f.read()
    return HTMLResponse(content=html_content)


class ChatRoom:
    def __init__(self):
        self.doctor_ws: Optional[WebSocket] = None
        self.user_ws: Optional[WebSocket] = None

    async def connect(self, websocket: WebSocket, user_type: str):
        await websocket.accept()
        if user_type == "doctor":
            self.doctor_ws = websocket
        elif user_type == "user":
            self.user_ws = websocket

    def disconnect(self, websocket: WebSocket):
        if websocket == self.doctor_ws:
            self.doctor_ws = None
        elif websocket == self.user_ws:
            self.user_ws = None

    async def relay(self, sender: WebSocket, message: str):
        target = self.user_ws if sender == self.doctor_ws else self.doctor_ws
        if target:
            await target.send_text(message)

# room_id -> ChatRoom
rooms: Dict[str, ChatRoom] = {}

@app.websocket("/ws/room/{room_id}/{user_type}")
async def websocket_endpoint(websocket: WebSocket, room_id: str, user_type: str):
    if user_type not in {"doctor", "user"}:
        await websocket.close(code=4000)
        return

    if room_id not in rooms:
        rooms[room_id] = ChatRoom()

    room = rooms[room_id]
    await room.connect(websocket, user_type)

    try:
        while True:
            msg = await websocket.receive_text()
            await room.relay(websocket, msg)
    except WebSocketDisconnect:
        room.disconnect(websocket)

        # Optional: cleanup empty rooms
        if not room.doctor_ws and not room.user_ws:
            del rooms[room_id]
