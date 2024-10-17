import About from './components/about';
import Mockdata from './components/data/mockdata';
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
        <Mockdata/>
      </main>
    </>
  );
}

export default App;
