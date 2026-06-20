import { Capabilities } from "./components/sections/Capabilities"
import { EditorsLetter } from "./components/sections/EditorsLetter"
// import { FeaturedStory } from "./components/sections/FeaturedStory"
import { Hero } from "./components/sections/Hero"
import { ContactSection } from "./components/sections/Contact"
// import { Interlude } from "./components/sections/Interlude"
import { Marquee } from "./components/sections/Marquee"
import { Portfolio } from "./components/sections/Portfolio"
// import { ProcessChapters } from "./components/sections/ProcessChapters"
// import { Stats } from "./components/sections/Stats"
import { Testimonials } from "./components/sections/Testimonials"
import { ClientSection } from "./components/sections/Clients"



function App() {
  return  <>
      <Hero />
      <Marquee />
      <EditorsLetter />
      {/* <Interlude
        kicker="Margin Note"
        quote="A brand is not what you say about yourself; it is what the room says when you leave it."
        attribution="Studio principle Nº 1"
      /> */}
      
      <Capabilities />
      <ClientSection />
      {/* <FeaturedStory /> */}
      <Portfolio />
      {/* <Interlude
        kicker="Margin Note"
        quote="Restraint is the loudest move in a room full of noise."
        attribution="Studio principle Nº 7"
      /> */}
      {/* <ProcessChapters /> */}
      <Testimonials />
      <ContactSection />
      {/* <CTA /> */}
    </>
}

export default App
