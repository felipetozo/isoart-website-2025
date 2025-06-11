import Hero from '@/app/components/Hero/Hero';
import SobreEmpresa from '@/app/components/SobreEmpresa/SobreEmpresa';
import CarrosselClientes from '@/app/components/CarrosselClientes/CarrosselClientes';
import SolucoesGrid from '@/app/components/SolucoesGrid/SolucoesGrid';
import MainForm from '@/app/components/MainForm/MainForm';

export default function Home() {
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
