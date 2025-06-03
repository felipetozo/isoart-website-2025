import MainNav from '@/app/views/components/MainNav';
import Hero from '@/app/views/components/Hero';
import SobreEmpresa from '@/app/views/components/SobreEmpresa';
import CarrosselClientes from '@/app/views/components/CarrosselClientes';
import SolucoesGrid from '@/app/views/components/SolucoesGrid';
import MainForm from '@/app/views/components/MainForm';
import Footer from '@/app/views/components/Footer';

export default function Home() {
  return (
    <div>
      <main>
        <MainNav />
        <Hero />
        <SobreEmpresa />
        <CarrosselClientes />
        <SolucoesGrid />
        <MainForm />
        <Footer />
      </main>
    </div>
  );
}
