// import React, { useEffect, useState } from 'react';
// import * as io from 'socket.io-client';

// const socket = io.connect('http://127.0.0.1:8080/chat');

// function Chatting() {
//   const [chat, setChat] = useState<string[]>([]);
//   const [message, setMessage] = useState('');

//   const sendMessageHandler = () => {
//     socket.emit('message', message);
//     setMessage('');
//   };

//   useEffect(() => {
//     socket.on('message', message => {
//       setChat([...chat, message]);
//     });
//   }, [chat]);

//   return (
//     <div>
//       <div>
//         <h1>Messages</h1>
//         <ul>
//           {chat.map((data, idx) => {
//             return <li key={idx}>{data}</li>;
//           })}
//         </ul>
//       </div>

//       <div>
//         <h1>Chat Box</h1>
//         <input value={message} onChange={e => setMessage(e.target.value)} />
//         <button onClick={sendMessageHandler}>Send Message</button>
//       </div>
//     </div>
//   );
// }

// export default Chatting;
import WebSocket from 'ws';
