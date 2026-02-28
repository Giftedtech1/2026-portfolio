import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import CaseStudies from './components/CaseStudies';
import CurrentlyBuilding from './components/CurrentlyBuilding';
import Services from './components/Services';
import WhyHireMe from './components/WhyHireMe';
import Testimonials from './components/Testimonials';
import AvailableForWork from './components/AvailableForWork';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden pt-0 selection:bg-primary/30 selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CaseStudies />
        <CurrentlyBuilding />
        <Services />
        <WhyHireMe />
        <Testimonials />
        <AvailableForWork />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
