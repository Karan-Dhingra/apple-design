import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Highlight from "./components/Highlight";
import HowItWorks from "./components/HowItWorks";
import Model from "./components/Model";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="bg-black">
      {/* Navbar */}
      <Navbar />
      {/* Hero */}
      <Hero />
      {/* Highlights */}
      <Highlight />
      {/* Model */}
      <Model />
      {/* Features */}
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}

export default App;
