import React, { useEffect, useState } from 'react';

const JitsiMeet = () => {
  const [roomName, setRoomName] = useState('');

  const handleCreateRoom = () => {
    const generatedRoomName = `DiagnobotRoom-${Math.random().toString(36).substring(2, 10)}`;
    setRoomName(generatedRoomName);
  };

  useEffect(() => {
    if (roomName) {
      const domain = 'meet.jit.si'; // Public Jitsi Meet server
      const options = {
        roomName: roomName,
        width: '100%',
        height: '100%',
        parentNode: document.getElementById('jitsi-container'),
        configOverwrite: {
          enableWelcomePage: false,
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        },
      };
      const api = new window.JitsiMeetExternalAPI(domain, options);

      api.addEventListener('videoConferenceJoined', () => {
        console.log('Joined the meeting room:', roomName);
      });

      api.addEventListener('videoConferenceLeft', () => {
        console.log('Left the meeting room:', roomName);
      });
    }
  }, [roomName]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {roomName ? (
        <div id="jitsi-container" style={{ width: '100%', height: '80vh' }}></div>
      ) : (
        <>
          <div className="text-blue-700 text-2xl font-semibold mb-4">Create a Meeting Room</div>
          <button
            onClick={handleCreateRoom}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            Create Room
          </button>
        </>
      )}
    </div>
  );
};

export default JitsiMeet;