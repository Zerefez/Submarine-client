import About from './components/about';
import Header from './components/header';
import Mockdata from './components/mockdata';
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
