import roletyZewImg from "@/assets/service-rolety-zewnetrzne-real.png";
import roletkiWewImg from "@/assets/service-roletki-wewnetrzne.png";
import plisyImg from "@/assets/service-plisy.png";
import oknaPcvImg from "@/assets/service-okna-pcv.jpg";
import drzwiZewImg from "@/assets/service-drzwi-zewnetrzne.png";
import drzwiWewImg from "@/assets/service-drzwi-wewnetrzne.png";
import moskRamkowaImg from "@/assets/service-moskitiera-ramkowa.webp";
import moskDrzwiowaImg from "@/assets/service-moskitiera-drzwiowa.jpg";
import moskPlisPionImg from "@/assets/service-moskitiera-plisowana-pionowa.jpg";
import moskPlisPoziomImg from "@/assets/service-moskitiera-plisowana-pozioma.jpg";
import parapetyImg from "@/assets/service-parapety.jpg";

const services = [
  {
    title: "Rolety zewnętrzne",
    desc: "Rolety zewnętrzne aluminiowe nadstawne i podtynkowe. Ochrona przed słońcem, hałasem i włamaniem.",
    img: roletyZewImg,
  },
  {
    title: "Roletki wewnętrzne",
    desc: "Roletki materiałowe dzień-noc w szerokim wyborze kolorów i tkanin. Idealne do każdego wnętrza.",
    img: roletkiWewImg,
  },
  {
    title: "Plisy okienne",
    desc: "Plisy okienne jedno- i dwukierunkowe. Doskonałe do okien nietypowych, dachowych i fasadowych.",
    img: plisyImg,
  },
  {
    title: "Okna PCV",
    desc: "Energooszczędne okna PCV z najlepszych profili na rynku. Wysoka izolacyjność termiczna i akustyczna.",
    img: oknaPcvImg,
  },
  {
    title: "Drzwi zewnętrzne",
    desc: "Drzwi wejściowe i balkonowe o nowoczesnym wzornictwie, wysokiej izolacyjności i bezpieczeństwie.",
    img: drzwiZewImg,
  },
  {
    title: "Drzwi wewnętrzne",
    desc: "Drzwi wewnętrzne pokojowe i łazienkowe. Szeroka gama wzorów i kolorów.",
    img: drzwiWewImg,
  },
  {
    title: "Moskitiery ramkowe",
    desc: "Moskitiery ramkowe okienne w różnych kolorach ram. Prosta montaż i skuteczna ochrona przed owadami.",
    img: moskRamkowaImg,
  },
  {
    title: "Moskitiery drzwiowe",
    desc: "Moskitiery drzwiowe na zawiasach do drzwi balkonowych i tarasowych. Wygodne otwieranie i zamykanie.",
    img: moskDrzwiowaImg,
  },
  {
    title: "Moskitiery plisowane pionowe",
    desc: "Moskitiery plisowane pionowe do drzwi przesuwnych i tarasowych. Eleganckie i funkcjonalne rozwiązanie.",
    img: moskPlisPionImg,
  },
  {
    title: "Moskitiery plisowane poziome",
    desc: "Moskitiery plisowane poziome do okien dachowych i świetlików. Precyzyjne dopasowanie do okna.",
    img: moskPlisPoziomImg,
  },
  {
    title: "Parapety wewnętrzne i zewnętrzne",
    desc: "Parapety PCV, konglomeratowe, kamienne oraz aluminiowe parapety zewnętrzne. Trwałość i estetyka.",
    img: parapetyImg,
  },
];

const ServicesSection = () => (
  <section id="uslugi" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-primary font-semibold uppercase tracking-[0.2em] text-sm mb-3">Oferta</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Usługi</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.title}
            className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-56 overflow-hidden">
              <img
                src={s.img}
                alt={s.title}
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
