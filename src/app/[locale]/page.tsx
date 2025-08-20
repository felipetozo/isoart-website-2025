import Hero from '../components/hero/hero';
import SobreEmpresa from '../components/sobre-empresa/sobre-empresa';
import SolucoesGrid from '../components/solucoes-grid/solucoes-grid';
import ContactComponent from '../components/contact/contact-component';

export default function HomePage() {
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
