'use client';

import Hero from './components/hero/hero';
import SobreEmpresa from './components/sobre-empresa/sobre-empresa';
import SolucoesGrid from './components/solucoes-grid/solucoes-grid';
import ContactComponent from './components/contact/contact-component';
import MainForm from './components/main-form/main-form';

function Home() {
  return (
    <div>
      <main>
        <Hero />
        <SobreEmpresa />
        <SolucoesGrid />
        <ContactComponent />
        <MainForm />
      </main>
    </div>
  );
}

export default Home;