import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategories } from "../../api/categories.api";

export default function CategoryHero() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetchCategories().then((cats) => {
      const matched = cats.find(c => c.slug === slug);
      setCategory(matched);
    });
  }, [slug]);

  if (!category) return null;

  return (
    <section className="relative h-[30vh] lg:h-[40vh] w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url(${category.image})` }}
      >
        {/* Cinematic Overlay from HTML */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <span className="text-accent text-[9px] lg:text-[11px] font-black tracking-[0.4em] lg:tracking-[0.6em] uppercase mb-2 lg:mb-4 block opacity-80">
          Collection 04
        </span>
        <h1 className="text-white text-5xl md:text-8xl lg:text-9xl font-[Oswald] leading-none tracking-tighter uppercase">
          {category.name}
        </h1>
      </div>
    </section>
  );
}