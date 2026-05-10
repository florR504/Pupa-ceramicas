import Hero from "@/components/Hero"
import Products from "@/components/Products"
import Workshops from "@/components/WorkShop"
import PotteryCare from "@/components/PotteryCare"
import Reviews from "@/components/Reviews"
import About from "@/components/About"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <Products />
      <About />
      <Workshops />
      <Reviews />
      <PotteryCare />
      <Contact />
      <Footer />
    </main>
  )
}
