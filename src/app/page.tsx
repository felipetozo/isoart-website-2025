'use client';

import { useEffect } from 'react';
import Hero from '@/app/components/Hero/Hero';
import SobreEmpresa from '@/app/components/SobreEmpresa/SobreEmpresa';
import CarrosselClientes from '@/app/components/CarrosselClientes/CarrosselClientes';
import SolucoesGrid from '@/app/components/SolucoesGrid/SolucoesGrid';
import MainForm from '@/app/components/MainForm/MainForm';
import Lenis from 'lenis';

function Home() {
  useEffect(() => {
    // Initialize Lenis only in the browser
    const lenis = new Lenis({
      autoRaf: true,
    });

    // Listen for the scroll event and log the event data
    lenis.on('scroll', (e) => {
      console.log(e);
    });

    // Cleanup on component unmount
    return () => lenis.destroy();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      <main>
        <Hero />
        <SobreEmpresa />
        <CarrosselClientes />
        <SolucoesGrid />
        <MainForm />
      </main>
    </div>
  );
}

export default Home;