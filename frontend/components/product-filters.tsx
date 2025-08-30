"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

interface ProductFiltersProps {
  selectedCategoryType: string;
  selectedGender: string;
  selectedSubCategory: string;
  sortBy: string;
  onCategoryTypeChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onSubCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const subCategoriesList = [
  "Celebrity",
  "Summer",
  "Gym",
  "Office",
  "Winter",
  "Party, Dates, Special Occasion",
  "Traditional",
  "Spiritual & Devotional",
];

export const ProductFilters = ({
  selectedCategoryType,
  selectedGender,
  selectedSubCategory,
  sortBy,
  onCategoryTypeChange,
  onGenderChange,
  onSubCategoryChange,
  onSortChange,
}: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false); // for mobile toggle
  const [openSection, setOpenSection] = useState<string | null>(null); // accordion sections

  useEffect(() => {
    if (!subCategoriesList.includes(selectedSubCategory)) {
      onSubCategoryChange("");
    }
  }, [selectedGender, selectedCategoryType]);

  const FilterCard = ({
    title,
    children,
    section,
  }: {
    title: string;
    children: React.ReactNode;
    section: string;
  }) => (
    <Card className="rounded-xl bg-zinc-900 border border-lime-400/20 shadow-md">
      <CardHeader
        className="flex flex-row items-center justify-between cursor-pointer md:cursor-default"
        onClick={() =>
          setOpenSection(openSection === section ? null : section)
        }
      >
        <CardTitle className="text-base font-semibold text-white">
          {title}
        </CardTitle>
        <span className="md:hidden text-gray-400">
          {openSection === section ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </CardHeader>
      <CardContent
        className={`transition-all duration-300 overflow-hidden 
        ${openSection === section || typeof window === "undefined" ? "max-h-screen" : "max-h-0 md:max-h-screen"}
        `}
      >
        {children}
      </CardContent>
    </Card>
  );

  return (
    <aside className="w-full md:w-[240px] shrink-0 space-y-4">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          className="w-full border-lime-400/40 text-lime-400 hover:bg-zinc-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Filter className="mr-2 h-4 w-4" />
          {isOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Filters Container */}
      <div
        className={`space-y-4 ${
          isOpen ? "block" : "hidden md:block"
        }`}
      >
        {/* Type Selector */}
        <FilterCard title="Type" section="type">
          <RadioGroup value={selectedCategoryType} onValueChange={onCategoryTypeChange}>
            {["Perfume", "Attar"].map((type) => (
              <div key={type} className="flex items-center space-x-2 py-1">
                <RadioGroupItem
                  value={type}
                  id={type}
                  className="data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
                />
                <Label htmlFor={type} className="cursor-pointer text-sm text-gray-300 hover:text-lime-400">
                  {type}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </FilterCard>

        {/* Gender Selector */}
        <FilterCard title="Gender" section="gender">
          <RadioGroup value={selectedGender} onValueChange={onGenderChange}>
            {["Men", "Women"].map((g) => (
              <div key={g} className="flex items-center space-x-2 py-1">
                <RadioGroupItem
                  value={g}
                  id={g}
                  className="data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
                />
                <Label htmlFor={g} className="cursor-pointer text-sm text-gray-300 hover:text-lime-400">
                  {g}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </FilterCard>

        {/* SubCategory Selector */}
        <FilterCard title="Category" section="subcategory">
          <RadioGroup value={selectedSubCategory} onValueChange={onSubCategoryChange}>
            {subCategoriesList.map((sub) => (
              <div key={sub} className="flex items-center space-x-2 py-1">
                <RadioGroupItem
                  value={sub}
                  id={sub}
                  className="data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
                />
                <Label htmlFor={sub} className="cursor-pointer text-sm text-gray-300 hover:text-lime-400">
                  {sub}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </FilterCard>

        {/* Sort By */}
        <FilterCard title="Sort By" section="sort">
          <RadioGroup value={sortBy} onValueChange={onSortChange}>
            {[
              { value: "newest", label: "Newest" },
              { value: "price-low", label: "Price: Low to High" },
              { value: "price-high", label: "Price: High to Low" },
              { value: "rating", label: "Rating" },
            ].map(({ value, label }) => (
              <div key={value} className="flex items-center space-x-2 py-1">
                <RadioGroupItem
                  value={value}
                  id={value}
                  className="data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
                />
                <Label htmlFor={value} className="cursor-pointer text-sm text-gray-300 hover:text-lime-400">
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </FilterCard>
      </div>
    </aside>
  );
};
