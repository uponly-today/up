import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Chat from "@/components/Chat";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <main id="top">
        <Hero />

        <section id="chat" className="relative mx-auto max-w-6xl px-5 pb-28">
          <Reveal className="mb-10 text-center">
            <p className="font-display text-sm uppercase tracking-[0.3em] text-up">
              Live agent
            </p>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Your private agent for Base.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-fog">
              Read-only and yours. No wallet connection, no keys, no trace —
              just the chain, decoded.
            </p>
          </Reveal>
          <Reveal>
            <Chat />
          </Reveal>
        </section>

        <Features />
        <HowItWorks />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
