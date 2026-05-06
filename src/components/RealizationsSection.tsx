import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { realizations } from "@/data/realizations";

const categories = ["Wszystkie", "rolety", "okna", "drzwi", "inne"];

const RealizationsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Wszystkie");
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; description: string | null } | null>(null);

  const filtered = activeCategory === "Wszystkie"
    ? realizations
    : realizations.filter((r) => r.category === activeCategory);

  return (
    <section id="realizacje" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold uppercase tracking-[0.2em] text-sm mb-3">Portfolio</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Realizacje</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-primary/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">Brak realizacji w tej kategorii.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedImage({ url: r.image_url, title: r.title, description: r.description })}
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={r.image_url}
                    alt={r.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs uppercase tracking-wider text-primary font-semibold">{r.category}</span>
                  <h3 className="font-heading text-lg font-semibold text-foreground mt-1">{r.title}</h3>
                  {r.description && (
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{r.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-2">
          {selectedImage && (
            <div>
              <img src={selectedImage.url} alt={selectedImage.title} className="w-full rounded-md" />
              <div className="p-4">
                <h3 className="font-heading text-xl font-semibold">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-muted-foreground mt-2">{selectedImage.description}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RealizationsSection;
