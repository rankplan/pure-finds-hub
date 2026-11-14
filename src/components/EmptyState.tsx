import { Leaf } from "lucide-react";

interface EmptyStateProps {
  hasFilters: boolean;
}

const EmptyState = ({ hasFilters }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="h-16 w-16 rounded-full bg-olive-light flex items-center justify-center mb-6">
      <Leaf className="h-7 w-7 text-olive" />
    </div>
    <h3 className="font-serif text-xl text-foreground mb-2">
      {hasFilters ? "No products match your filters" : "Awaiting product data"}
    </h3>
    <p className="text-sm text-muted-foreground max-w-sm">
      {hasFilters
        ? "Try adjusting your search or filters to find what you're looking for."
        : "Product catalogue data will be added soon. Check back shortly!"}
    </p>
  </div>
);

export default EmptyState;
