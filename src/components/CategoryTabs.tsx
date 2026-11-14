import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

const categories: { value: Category; label: string; icon: string }[] = [
  { value: "all", label: "All", icon: "✦" },
  { value: "soap", label: "Soap", icon: "🧼" },
  { value: "tallow-cream", label: "Tallow Cream", icon: "🫙" },
  { value: "toothpaste", label: "Toothpaste", icon: "🪥" },
  { value: "textile", label: "Textile", icon: "🧵" },
];

interface CategoryTabsProps {
  active: Category;
  onChange: (cat: Category) => void;
  counts: Record<Category, number>;
}

const CategoryTabs = ({ active, onChange, counts }: CategoryTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={cn(
            "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2",
            active === cat.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground border border-border"
          )}
        >
          <span>{cat.icon}</span>
          <span>{cat.label}</span>
          <span className={cn(
            "text-xs tabular-nums",
            active === cat.value ? "text-primary-foreground/70" : "text-muted-foreground/60"
          )}>
            {counts[cat.value]}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
