import Mockdata from './components/data/mockdata';
import Options from './components/options';
import Submarines from './components/submarines';
import About from './pages/about';
import Contact from './pages/contact';
import Footer from './pages/footer';
import Header from './pages/header';

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
