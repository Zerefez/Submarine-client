import Mockdata from './components/data/mockdata';
import Options from './components/options';
import Submarines from './components/submarines';
import About from './pages/about';
import Contact from './pages/contact';
import Footer from './pages/footer';
import Header from './pages/header';

import { useEffect, useState } from 'react';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.0.1:8080/live');
    ws.onopen = () => console.log('WebSocket connected');
    ws.onclose = () => console.log('WebSocket disconnected');
    setSocket(ws);

    return () => ws.close();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Submarines />
        <About />
        <Options />
        <Mockdata socket={socket} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
