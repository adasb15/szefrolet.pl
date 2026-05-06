import heroImage from "@/assets/hero-windows.jpg";
import logo from "@/assets/logo-szefrolet.png";

const HeroSection = () => (
  <section id="hero" className="relative min-h-screen flex items-center">
    <div className="absolute inset-0">
      <img
        src={heroImage}
        alt="Nowoczesne okna z roletami w eleganckim wnętrzu"
        width={1920}
        height={1080}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-background/85" />
    </div>

    <div className="relative container mx-auto px-4 pt-24">
      <div className="max-w-2xl">
        <img src={logo} alt="SzefRolet logo" className="h-36 md:h-44 w-auto mb-8" />
        <p className="text-primary font-semibold uppercase tracking-[0.2em] text-sm mb-4">
          Sprzedaż · Montaż · Serwis
        </p>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
          Okna, drzwi i rolety <span className="text-primary">na miarę</span> Twoich potrzeb
        </h1>
        <p className="text-foreground/80 text-lg md:text-xl leading-relaxed mb-10 max-w-xl font-light">
          Kompleksowe rozwiązania dla otworów okiennych i drzwiowych. Profesjonalny montaż, najwyższa jakość materiałów i indywidualne podejście.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#kontakt"
            className="bg-primary text-primary-foreground px-8 py-4 rounded-md text-base font-semibold hover:bg-primary/90 transition-colors text-center"
          >
            Bezpłatna wycena
          </a>
          <a
            href="#uslugi"
            className="border border-foreground/30 text-foreground px-8 py-4 rounded-md text-base font-semibold hover:bg-foreground/10 transition-colors text-center"
          >
            Usługi
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
