import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center px-4">
        <p className="mb-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Strona jest w trakcie budowy. Treści i realizacje mogą być jeszcze uzupełniane.
        </p>
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Nie znaleziono strony.</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Wróć na stronę główną
        </a>
      </div>
    </div>
  );
};

export default NotFound;
