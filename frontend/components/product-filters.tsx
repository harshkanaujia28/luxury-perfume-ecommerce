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
import { cn } from "@/lib/utils";

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
    <aside className="w-full md:w-[240px] shrink-0 space-y-4 px-2 md:px-0">
      {/* Type Selector */}
      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-medium">Type</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedCategoryType}
            onValueChange={onCategoryTypeChange}
          >
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="Perfume" id="perfume" />
              <Label htmlFor="perfume" className="cursor-pointer text-sm">
                Perfume
              </Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="Attar" id="attar" />
              <Label htmlFor="attar" className="cursor-pointer text-sm">
                Attar
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Gender Selector */}
      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-medium">Gender</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedGender}
            onValueChange={onGenderChange}
          >
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="Men" id="men" />
              <Label htmlFor="men" className="cursor-pointer text-sm">
                Men
              </Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="Women" id="women" />
              <Label htmlFor="women" className="cursor-pointer text-sm">
                Women
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* SubCategory Selector */}
      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-medium">Category</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedSubCategory}
            onValueChange={onSubCategoryChange}
          >
            {subCategoriesList.map((sub) => (
              <div key={sub} className="flex items-center space-x-2 py-1">
                <RadioGroupItem value={sub} id={sub} />
                <Label htmlFor={sub} className="cursor-pointer text-sm">
                  {sub}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Sort By */}
      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-medium">Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={sortBy} onValueChange={onSortChange}>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="newest" id="newest" />
              <Label htmlFor="newest" className="cursor-pointer text-sm">
                Newest
              </Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="price-low" id="low-to-high" />
              <Label htmlFor="low-to-high" className="cursor-pointer text-sm">
                Price: Low to High
              </Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="price-high" id="high-to-low" />
              <Label htmlFor="high-to-low" className="cursor-pointer text-sm">
                Price: High to Low
              </Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="rating" id="rating" />
              <Label htmlFor="rating" className="cursor-pointer text-sm">
                Rating
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </aside>
  );
};
