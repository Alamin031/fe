"use client";

import Link from "next/link";
import Image from "next/image";

import type { Category } from "@/app/types";

interface CategorySliderProps {
  categories: Category[];
}

export function CategorySlider({ categories }: CategorySliderProps) {
  const safeCategories = Array.isArray(categories) ? categories : [];
  return (
    <div className="overflow-x-auto scrollbar-thin pb-4">
      <div className="flex gap-4 min-w-max md:justify-center">
        {safeCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group flex flex-col items-center gap-3"
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-muted transition-all duration-300 group-hover:bg-accent group-hover:shadow-md md:h-24 md:w-24">
              <Image
                src={
                  typeof category.banner === "string" &&
                  category.banner.trim() !== ""
                    ? category.banner
                    : typeof category.image === "string" &&
                      category.image.trim() !== ""
                    ? category.image
                    : "/placeholder.svg"
                }
                alt={category.name}
                fill
                className="object-cover p-3 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
