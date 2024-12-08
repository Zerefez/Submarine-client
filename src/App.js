import Data from './components/data/displayData';
import Options from './components/options';
import Submarines from './components/submarines';
import About from './pages/about';
import Contact from './pages/contact';
import Footer from './pages/footer';
import Header from './pages/header';

import { useEffect, useState } from 'react';

function App() {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState(''); // Track WebSocket status
  const [submarines, setSubmarines] = useState([
    { available: false, value: '1', label: 'Zerefez' },
    { available: false, value: '2', label: 'KHALed' },
    { available: false, value: '3', label: 'Muhandizi' },
    { available: false, value: '4', label: 'Shah Rukh Khanizzi' },
    { available: false, value: '5', label: 'Ahmadizzi Uchiha' },
    { available: false, value: '6', label: 'Danielizzi' },
    { available: false, value: '7', label: 'ERMRZZI' },
    { available: false, value: '8', label: 'Chrisizzi' },
    { available: false, value: '9', label: 'ALIZZI' },
  ]);

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.0.1:8080/live');

    console.log(ws);

    if (ws.readyState === 0) {
      console.log('WebSocket state: CONNECTING');
      setStatus('CONNECTING');
    } else if (ws.readyState === 1) {
      console.log('WebSocket state: OPEN');
      setStatus('OPEN');
    } else if (ws.readyState === 2) {
      console.log('WebSocket state: CLOSING');
      setStatus('CLOSING');
    } else if (ws.readyState === 3) {
      console.log('WebSocket state: CLOSED');
      setStatus('CLOSED');
    }

    ws.addEventListener('message', function (message) {
      document.getElementById('wsupdate').innerHTML = message.data;
    });

    setSocket(ws);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Submarines
          socket={socket}
          submarines={submarines}
          setSubmarines={setSubmarines}
        />
        <About />
        <Options
          socket={socket}
          submarines={submarines}
          setSubmarines={setSubmarines}
        />
        <Data socket={socket} status={status} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
