import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo-szefrolet.png";

const navLinks = [
  { label: "Strona główna", href: "#hero" },
  { label: "Usługi", href: "#uslugi" },
  { label: "Realizacje", href: "#realizacje" },
  { label: "O nas", href: "#o-nas" },
  { label: "Kontakt", href: "#kontakt" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <a href="#hero" className="flex items-center gap-2">
          <img src={logo} alt="SzefRolet logo" className="h-14 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+48123456789"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Zadzwoń
          </a>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-secondary border-t border-muted-foreground/10 px-4 pb-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-foreground/80 hover:text-primary transition-colors text-sm uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+48123456789"
            className="flex items-center justify-center gap-2 mt-3 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-semibold"
          >
            <Phone className="w-4 h-4" />
            +48 123 456 789
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
