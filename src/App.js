import Mockdata from './components/data/mockdata';
import Options from './components/options';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import Footer from './components/pages/footer';
import Header from './components/pages/header';
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
