import Hero from "@/components/Hero"
import Products from "@/components/Products"
import Workshops from "@/components/WorkShop"
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
      <Contact />
      <Footer />
    </main>
  )
}
