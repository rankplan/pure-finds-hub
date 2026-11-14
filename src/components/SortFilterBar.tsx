import { ArrowUpDown, Filter } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import type { SortField, SortDirection } from "@/lib/types";

interface SortFilterBarProps {
  sortField: SortField;
  sortDir: SortDirection;
  onSortFieldChange: (f: SortField) => void;
  onSortDirToggle: () => void;
  countryFilter: string;
  countries: string[];
  onCountryChange: (c: string) => void;
  resultCount: number;
}

const SortFilterBar = ({
  sortField, sortDir, onSortFieldChange, onSortDirToggle,
  countryFilter, countries, onCountryChange, resultCount,
}: SortFilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground tabular-nums">{resultCount}</span> products
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
          <Select value={sortField} onValueChange={(v) => onSortFieldChange(v as SortField)}>
            <SelectTrigger className="h-9 w-[160px] text-xs bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="pricePerLb">Price per lb</SelectItem>
              <SelectItem value="priceInclShipping">Price incl. shipping</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
          <button
            onClick={onSortDirToggle}
            className="h-9 w-9 flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-colors text-xs"
          >
            {sortDir === "asc" ? "↑" : "↓"}
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          <Select value={countryFilter} onValueChange={onCountryChange}>
            <SelectTrigger className="h-9 w-[140px] text-xs bg-card">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All countries</SelectItem>
              {countries.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SortFilterBar;
