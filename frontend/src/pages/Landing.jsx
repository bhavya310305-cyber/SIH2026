import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import HowItWorks from "../components/HowItWorks";
import Stakeholders from "../components/Stakeholders";
import Heatmap from "../components/Heatmap";
import ExplainableAI from "../components/ExplainableAI";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";


function Landing() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <Stakeholders />

     
      <section id="about" className="bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-18 px-6 py-16 lg:grid-cols-2">
          <Heatmap />
          <ExplainableAI />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Landing;