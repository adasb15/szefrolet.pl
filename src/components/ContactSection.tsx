import { Phone, Mail } from "lucide-react";

const ContactSection = () => (
  <section id="kontakt" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-primary font-semibold uppercase tracking-[0.2em] text-sm mb-3">Skontaktuj się</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Kontakt</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <h3 className="font-heading text-2xl font-semibold text-foreground mb-6">Napisz do nas</h3>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Imię i nazwisko</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Jan Kowalski"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Telefon</label>
              <input
                type="tel"
                className="w-full px-4 py-3 rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="+48 123 456 789"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Wiadomość</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="Opisz czego potrzebujesz..."
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-8 py-3.5 rounded-md font-semibold hover:bg-primary/90 transition-colors w-full sm:w-auto"
            >
              Wyślij wiadomość
            </button>
          </form>
        </div>

        <div className="space-y-8 lg:pt-10">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Telefon</h4>
              <a href="tel:+48603346417" className="text-muted-foreground hover:text-primary transition-colors">
                +48 603 346 417
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Email</h4>
              <a href="mailto:szefrolet.kontakt@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                szefrolet.kontakt@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
