"use client";

import { useEffect } from "react";
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
  useEffect(() => {
    if (!subCategoriesList.includes(selectedSubCategory)) {
      onSubCategoryChange("");
    }
  }, [selectedGender, selectedCategoryType]);

  return (
    <aside className="w-full md:w-[240px] shrink-0 space-y-4">
      {/* Type Selector */}
      <Card className="rounded-xl bg-zinc-900 border border-lime-400/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-white">Type</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedCategoryType} onValueChange={onCategoryTypeChange}>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem
                value="Perfume"
                id="perfume"
                className="data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
              />
              <Label htmlFor="perfume" className="cursor-pointer text-sm text-gray-300 hover:text-lime-400">
                Perfume
              </Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem
                value="Attar"
                id="attar"
                className="data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
              />
              <Label htmlFor="attar" className="cursor-pointer text-sm text-gray-300 hover:text-lime-400">
                Attar
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Gender Selector */}
      <Card className="rounded-xl bg-zinc-900 border border-lime-400/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-white">Gender</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedGender} onValueChange={onGenderChange}>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem
                value="Men"
                id="men"
                className="data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
              />
              <Label htmlFor="men" className="cursor-pointer text-sm text-gray-300 hover:text-lime-400">
                Men
              </Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem
                value="Women"
                id="women"
                className="data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
              />
              <Label htmlFor="women" className="cursor-pointer text-sm text-gray-300 hover:text-lime-400">
                Women
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* SubCategory Selector */}
      <Card className="rounded-xl bg-zinc-900 border border-lime-400/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-white">Category</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      {/* Sort By */}
      <Card className="rounded-xl bg-zinc-900 border border-lime-400/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-white">Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={sortBy} onValueChange={onSortChange}>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem
                value="newest"
                id="newest"
                className="data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
              />
              <Label htmlFor="newest" className="cursor-pointer text-sm text-gray-300 hover:text-lime-400">
                Newest
              </Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem
                value="price-low"
                id="low-to-high"
                className="data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
              />
              <Label htmlFor="low-to-high" className="cursor-pointer text-sm text-gray-300 hover:text-lime-400">
                Price: Low to High
              </Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem
                value="price-high"
                id="high-to-low"
                className="data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
              />
              <Label htmlFor="high-to-low" className="cursor-pointer text-sm text-gray-300 hover:text-lime-400">
                Price: High to Low
              </Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem
                value="rating"
                id="rating"
                className="data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
              />
              <Label htmlFor="rating" className="cursor-pointer text-sm text-gray-300 hover:text-lime-400">
                Rating
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </aside>
  );
};
