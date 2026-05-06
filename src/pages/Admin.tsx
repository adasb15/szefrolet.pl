import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Plus, LogOut } from "lucide-react";
import logo from "@/assets/logo-szefrolet.png";

const categories = ["rolety", "okna", "drzwi", "inne"];

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("rolety");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login"); return; }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");

      if (!roles || roles.length === 0) {
        navigate("/login");
        return;
      }
      setIsAdmin(true);
    };
    checkAdmin();
  }, [navigate]);

  const { data: realizations = [], isLoading } = useQuery({
    queryKey: ["admin-realizations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("realizations")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin === true,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("realizations").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-realizations"] });
      toast({ title: "Usunięto realizację" });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast({ title: "Dodaj zdjęcie", variant: "destructive" });
      return;
    }

    setUploading(true);
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("realizations")
      .upload(filePath, imageFile);

    if (uploadError) {
      toast({ title: "Błąd uploadu", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("realizations").getPublicUrl(filePath);

    const { error: insertError } = await supabase.from("realizations").insert({
      title,
      description: description || null,
      category,
      image_url: urlData.publicUrl,
    });

    setUploading(false);

    if (insertError) {
      toast({ title: "Błąd zapisu", description: insertError.message, variant: "destructive" });
      return;
    }

    setTitle("");
    setDescription("");
    setCategory("rolety");
    setImageFile(null);
    queryClient.invalidateQueries({ queryKey: ["admin-realizations"] });
    toast({ title: "Dodano realizację!" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (isAdmin === null) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Ładowanie...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary text-primary-foreground px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="SzefRolet" className="h-8 w-auto" />
          <span className="font-heading text-lg font-semibold">Panel administratora</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary-foreground hover:text-primary">
          <LogOut className="w-4 h-4 mr-2" /> Wyloguj
        </Button>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-card rounded-lg p-6 shadow-sm mb-8">
          <h2 className="font-heading text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" /> Dodaj realizację
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Tytuł *</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={100} />
              </div>
              <div>
                <Label htmlFor="category">Kategoria</Label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="capitalize">{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Opis</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} />
            </div>
            <div>
              <Label htmlFor="image">Zdjęcie *</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>
            <Button type="submit" disabled={uploading}>
              {uploading ? "Dodawanie..." : "Dodaj realizację"}
            </Button>
          </form>
        </div>

        <h2 className="font-heading text-xl font-semibold mb-4">Istniejące realizacje ({realizations.length})</h2>

        {isLoading ? (
          <p className="text-muted-foreground">Ładowanie...</p>
        ) : realizations.length === 0 ? (
          <p className="text-muted-foreground">Brak realizacji. Dodaj pierwszą powyżej.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {realizations.map((r) => (
              <div key={r.id} className="bg-card rounded-lg overflow-hidden shadow-sm flex">
                <img src={r.image_url} alt={r.title} className="w-32 h-32 object-cover flex-shrink-0" />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-primary font-semibold">{r.category}</span>
                    <h3 className="font-semibold text-foreground">{r.title}</h3>
                    {r.description && <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{r.description}</p>}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="self-end mt-2"
                    onClick={() => deleteMutation.mutate(r.id)}
                  >
                    <Trash2 className="w-3 h-3 mr-1" /> Usuń
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
