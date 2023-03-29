import React from 'react';

class chat extends React.Component {
  ws: any;

  componentDidMount() {
    this.ws = new WebSocket('wss://j8a208.p.ssafy.io/ws/chat');
    this.ws.onopen = () => {
      console.log('connected!!');
    };
    this.ws.onmessage = (evt: MessageEvent) => {
      console.log(evt);
      console.log(evt.data);
    };
  }

  sendMessage = () => {
    // 화살표함수로 만들것!!
    this.ws.send('hello this is client Message'); // 서버로 메세지 보내는건 send
  };

  render() {
    return (
      <>
        <div>Learn React</div>
        <button onClick={this.sendMessage}>메세지 보내기</button>
      </>
    );
  }
}

export default chat;
