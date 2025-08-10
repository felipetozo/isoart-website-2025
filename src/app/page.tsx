'use client';

import Hero from './components/hero/hero';
import SobreEmpresa from './components/sobre-empresa/sobre-empresa';
import SolucoesGrid from './components/solucoes-grid/solucoes-grid';
import ContactComponent from './components/contact/contact-component';


function Home() {
  return (
    <div>
      <main>
        <Hero />
        <SobreEmpresa />
        <SolucoesGrid />
        <ContactComponent />
      </main>
    </div>
  );
}

export default Home;