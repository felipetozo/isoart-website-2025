import styles from './page.module.css';

interface LandingPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { locale, slug } = await params;
  
  return (
    <div className={styles.container}>
      <iframe
        src="https://somosfaiskers.wixstudio.com/molduras"
        width="100%"
        height="1000"
        style={{ border: "none" }}
        allowFullScreen
      />
    </div>
  );
}