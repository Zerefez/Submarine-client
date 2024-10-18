import About from './components/about';
import Contact from './components/contact';
import Mockdata from './components/data/mockdata';
import Footer from './components/footer';
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
        <Contact/>
      </main>
      <Footer/>
    </>
  );
}

export default App;
