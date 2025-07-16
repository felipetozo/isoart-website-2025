'use client';

import Hero from '@/app/components/Hero/Hero';
import SobreEmpresa from '@/app/components/SobreEmpresa/SobreEmpresa';
import CarrosselClientes from '@/app/components/CarrosselClientes/CarrosselClientes';
import SolucoesGrid from '@/app/components/SolucoesGrid/SolucoesGrid';
import MainForm from '@/app/components/MainForm/MainForm';

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