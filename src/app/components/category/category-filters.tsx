/* eslint-disable react-hooks/static-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { cn } from "@/app/lib/utils";
import { formatPrice } from "@/app/lib/utils/format";
import { useEffect } from "react";
import { categoriesService } from "@/app/lib/api/services/categories";
import { brandsService } from "@/app/lib/api/services/brands";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

// These can be made dynamic via props or API in the future
const defaultStorageOptions = ["64GB", "128GB", "256GB", "512GB", "1TB"];
const defaultRamOptions = ["4GB", "6GB", "8GB", "12GB", "16GB"];

// Props for dynamic filters
export interface CategoryFiltersProps {
  brands?: { id: string; name: string }[];
  storageOptions?: string[];
  ramOptions?: string[];
  minPrice?: number;
  maxPrice?: number;
  onChange?: (filters: {
    brands: string[];
    storage: string[];
    ram: string[];
    priceRange: [number, number];
  }) => void;
}

export function CategoryFilters({
  brands = [],
  storageOptions = defaultStorageOptions,
  ramOptions = defaultRamOptions,
  minPrice = 0,
  maxPrice = 300000,
  onChange,
}: CategoryFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedStorage, setSelectedStorage] = useState<string[]>([]);
  const [selectedRam, setSelectedRam] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    brands: true,
    price: true,
    storage: true,
    ram: false,
  });

  // Emit filter changes to parent
  useEffect(() => {
    if (onChange) {
      onChange({
        brands: selectedBrands,
        storage: selectedStorage,
        ram: selectedRam,
        priceRange,
      });
    }
  }, [selectedBrands, selectedStorage, selectedRam, priceRange, onChange]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleStorage = (storage: string) => {
    setSelectedStorage((prev) =>
      prev.includes(storage)
        ? prev.filter((s) => s !== storage)
        : [...prev, storage]
    );
  };

  const toggleRam = (ram: string) => {
    setSelectedRam((prev) =>
      prev.includes(ram) ? prev.filter((r) => r !== ram) : [...prev, ram]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([minPrice, maxPrice]);
    setSelectedBrands([]);
    setSelectedStorage([]);
    setSelectedRam([]);
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedStorage.length > 0 ||
    selectedRam.length > 0 ||
    priceRange[0] > minPrice ||
    priceRange[1] < maxPrice;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">Active Filters:</span>
          {selectedBrands.map((brand) => (
            <Button
              key={brand}
              variant="secondary"
              size="sm"
              className="h-7 gap-1 text-xs"
              onClick={() => toggleBrand(brand)}
            >
              {brand}
              <X className="h-3 w-3" />
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground"
            onClick={clearAllFilters}
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Brands */}
      <div>
        <button
          onClick={() => toggleSection("brands")}
          className="flex w-full items-center justify-between py-2 font-semibold"
        >
          Brands
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              expandedSections.brands && "rotate-180"
            )}
          />
        </button>
        {expandedSections.brands && (
          <div className="mt-2 space-y-2">
            {brands.map((brand) => (
              <label
                key={brand.id}
                className="flex cursor-pointer items-center gap-3"
              >
                <Checkbox
                  checked={selectedBrands.includes(brand.name)}
                  onCheckedChange={() => toggleBrand(brand.name)}
                />
                <span className="text-sm">{brand.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleSection("price")}
          className="flex w-full items-center justify-between py-2 font-semibold"
        >
          Price Range
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              expandedSections.price && "rotate-180"
            )}
          />
        </button>
        {expandedSections.price && (
          <div className="mt-4 space-y-4">
            <Slider
              value={priceRange as number[]}
              onValueChange={(val: number[]) =>
                setPriceRange([val[0], val[1]])
              }
              min={minPrice}
              max={maxPrice}
              step={5000}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        )}
      </div>

      {/* Storage */}
      <div>
        <button
          onClick={() => toggleSection("storage")}
          className="flex w-full items-center justify-between py-2 font-semibold"
        >
          Storage
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              expandedSections.storage && "rotate-180"
            )}
          />
        </button>
        {expandedSections.storage && (
          <div className="mt-2 flex flex-wrap gap-2">
            {storageOptions.map((storage) => (
              <button
                key={storage}
                onClick={() => toggleStorage(storage)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm transition-colors",
                  selectedStorage.includes(storage)
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground/50"
                )}
              >
                {storage}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RAM */}
      <div>
        <button
          onClick={() => toggleSection("ram")}
          className="flex w-full items-center justify-between py-2 font-semibold"
        >
          RAM
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              expandedSections.ram && "rotate-180"
            )}
          />
        </button>
        {expandedSections.ram && (
          <div className="mt-2 flex flex-wrap gap-2">
            {ramOptions.map((ram) => (
              <button
                key={ram}
                onClick={() => toggleRam(ram)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm transition-colors",
                  selectedRam.includes(ram)
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground/50"
                )}
              >
                {ram}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-semibold">Filters</h2>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="rounded-full bg-foreground px-2 py-0.5 text-xs text-background">
                  {selectedBrands.length +
                    selectedStorage.length +
                    selectedRam.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
