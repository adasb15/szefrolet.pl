import { Shield, Clock, Award, Wrench } from "lucide-react";

const features = [
  { icon: Shield, title: "Gwarancja jakości", desc: "Gwarancja na wszystkie produkty i montaż" },
  { icon: Clock, title: "Szybka realizacja", desc: "Sprawna obsługa i terminowa realizacja zamówień" },
  { icon: Award, title: "Pasja i zaangażowanie", desc: "Indywidualne podejście do każdego klienta" },
  { icon: Wrench, title: "Fachowy montaż", desc: "Profesjonalny sprzęt i solidne wykonanie" },
];

const AboutSection = () => (
  <section id="o-nas" className="py-24 bg-secondary text-foreground">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-primary font-semibold uppercase tracking-[0.2em] text-sm mb-3">Dlaczego warto</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
          Zaufaj profesjonaliście
        </h2>
        <p className="text-foreground/75 text-lg leading-relaxed">
          Zajmuję się sprzedażą i montażem stolarki otworowej. Oferuję kompleksową obsługę — od bezpłatnego pomiaru i doradztwa, przez dostawę, aż po profesjonalny montaż i serwis.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f) => (
          <div key={f.title} className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 text-primary mb-4">
              <f.icon className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-foreground/65 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
