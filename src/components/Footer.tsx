import logo from "@/assets/logo-szefrolet.png";

const Footer = () => (
  <footer className="bg-secondary text-foreground/60 py-10">
    <div className="container mx-auto px-4 text-center">
      <img src={logo} alt="SzefRolet logo" className="h-20 w-auto mx-auto mb-3" />
      <p className="text-sm">© {new Date().getFullYear()} SzefRolet</p>
    </div>
  </footer>
);

export default Footer;
