import Hero from "./components/Hero";
import Highlight from "./components/Highlight";
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
    </main>
  );
}

export default App;
