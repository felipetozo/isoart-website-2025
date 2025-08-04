'use client';

import Hero from '@/app/components/hero/hero';
import SobreEmpresa from '@/app/components/sobre-empresa/sobre-empresa';
import SolucoesGrid from '@/app/components/solucoes-grid/solucoes-grid';
import MainForm from '@/app/components/main-form/main-form';

function Home() {
  return (
    <div>
      <main>
        <Hero />
        <SobreEmpresa />
        <SolucoesGrid />
        <MainForm />
      </main>
    </div>
  );
}

export default Home;