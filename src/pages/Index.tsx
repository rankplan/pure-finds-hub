import { useState, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import SortFilterBar from "@/components/SortFilterBar";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import { sampleProducts } from "@/lib/sampleProducts";
import type { Category, SortField, SortDirection, Product } from "@/lib/types";
import { Leaf } from "lucide-react";

const Index = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [sortField, setSortField] = useState<SortField>("price");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  const [countryFilter, setCountryFilter] = useState("all");

  const countries = useMemo(
    () => [...new Set(sampleProducts.map((p) => p.country))].sort(),
    []
  );

  const counts = useMemo(() => {
    const c: Record<Category, number> = {
      all: sampleProducts.length,
      soap: 0,
      "tallow-cream": 0,
      toothpaste: 0,
      textile: 0,
    };
    sampleProducts.forEach((p) => {
      if (p.category in c) c[p.category as Category]++;
    });
    return c;
  }, []);

  const filtered = useMemo(() => {
    let result = [...sampleProducts];

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (countryFilter !== "all") {
      result = result.filter((p) => p.country === countryFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    const getValue = (p: Product) => {
      switch (sortField) {
        case "price": return p.price;
        case "pricePerLb": return p.pricePerLb ?? Infinity;
        case "priceInclShipping": return p.price + (p.shippingCost ?? 0);
        case "name": return p.name.toLowerCase();
      }
    };

    result.sort((a, b) => {
      const va = getValue(a);
      const vb = getValue(b);
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [category, countryFilter, search, sortField, sortDir]);

  const hasFilters = search !== "" || category !== "all" || countryFilter !== "all";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-olive/10 flex items-center justify-center">
            <Leaf className="h-4.5 w-4.5 text-olive" />
          </div>
          <div>
            <h1 className="text-xl font-serif leading-none">Naturals Index</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Curated natural product catalogue</p>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Hero search */}
        <section className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground">
              Find Natural Products
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Compare prices, shipping costs, and sourcing across the best natural brands
            </p>
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </section>

        {/* Categories */}
        <CategoryTabs active={category} onChange={setCategory} counts={counts} />

        {/* Sort & filter */}
        <SortFilterBar
          sortField={sortField}
          sortDir={sortDir}
          onSortFieldChange={setSortField}
          onSortDirToggle={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
          countryFilter={countryFilter}
          countries={countries}
          onCountryChange={setCountryFilter}
          resultCount={filtered.length}
        />

        {/* Product grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState hasFilters={hasFilters} />
        )}
      </main>
    </div>
  );
};

export default Index;
