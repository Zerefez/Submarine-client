import About from './components/about';
import Header from './components/header';
import Options from './components/options';
import Submarines from './components/submarines';

function App() {
  return (
    <>
      <Header/>
      <main>
        <Submarines/>
        <About/>
        <Options/>
      </main>
    </>
  );
}

export default App;
