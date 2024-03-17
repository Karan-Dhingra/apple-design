import Features from "./components/Features";
import Hero from "./components/Hero";
import Highlight from "./components/Highlight";
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
    </main>
  );
}

export default App;
