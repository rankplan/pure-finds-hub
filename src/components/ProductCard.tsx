import type { Product } from "@/lib/types";
import { ExternalLink, MapPin } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const categoryLabels: Record<string, string> = {
  soap: "Soap",
  "tallow-cream": "Tallow Cream",
  toothpaste: "Toothpaste",
  textile: "Textile",
};

const ProductCard = ({ product }: ProductCardProps) => {
  const priceInclShipping = product.price + (product.shippingCost ?? 0);

  return (
    <div className="group bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:border-accent/40 transition-all duration-300 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-lg leading-snug text-foreground group-hover:text-accent transition-colors truncate">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">{product.brand}</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium shrink-0">
          {categoryLabels[product.category] ?? product.category}
        </span>
      </div>

      {/* Description */}
      {product.description && (
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {product.description}
        </p>
      )}

      {/* Price grid */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <div className="bg-background rounded-xl p-3">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground/70 mb-1">Price</p>
          <p className="text-lg font-semibold text-foreground tabular-nums">${product.price.toFixed(2)}</p>
        </div>
        {product.pricePerLb != null && (
          <div className="bg-background rounded-xl p-3">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground/70 mb-1">Per lb</p>
            <p className="text-lg font-semibold text-foreground tabular-nums">${product.pricePerLb.toFixed(2)}</p>
          </div>
        )}
        <div className="bg-background rounded-xl p-3">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground/70 mb-1">Incl. shipping</p>
          <p className="text-lg font-semibold text-foreground tabular-nums">${priceInclShipping.toFixed(2)}</p>
        </div>
        <div className="bg-background rounded-xl p-3 flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground/60" />
          <p className="text-sm text-foreground">{product.country}</p>
        </div>
      </div>

      {product.weight && (
        <p className="text-xs text-muted-foreground">Weight: {product.weight}</p>
      )}

      {product.url && (
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
        >
          Visit shop
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  );
};

export default ProductCard;
