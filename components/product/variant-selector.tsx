"use client";

import { ProductOption, ProductVariant } from "@/lib/store/types";
import clsx from "clsx";

interface VariantSelectorProps {
  options: ProductOption[];
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onVariantChange: (variant: ProductVariant) => void;
}

export function VariantSelector({
  options,
  variants,
  selectedVariant,
  onVariantChange,
}: VariantSelectorProps) {
  const getSelectedOptionValue = (optionName: string) => {
    return selectedVariant.selectedOptions.find(
      (option) => option.name === optionName
    )?.value;
  };

  const getVariantFromSelectedOptions = (
    selectedOptions: Record<string, string>
  ) => {
    return variants.find((variant) =>
      variant.selectedOptions.every(
        (option) => selectedOptions[option.name] === option.value
      )
    );
  };

  const handleOptionClick = (optionName: string, optionValue: string) => {
    const selectedOptions = {
      ...Object.fromEntries(
        selectedVariant.selectedOptions.map((option) => [
          option.name,
          option.value,
        ])
      ),
    };
    selectedOptions[optionName] = optionValue;

    const newVariant = getVariantFromSelectedOptions(selectedOptions);
    if (newVariant) {
      onVariantChange(newVariant);
    }
  };

  return (
    <div className="grid gap-4">
      {options.map((option) => (
        <div key={option.id} className="flex flex-col gap-2">
          <p className="text-sm font-bold">{option.name}</p>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = getSelectedOptionValue(option.name) === value;
              const variant = getVariantFromSelectedOptions({
                ...Object.fromEntries(
                  selectedVariant.selectedOptions.map((opt) => [
                    opt.name,
                    opt.value,
                  ])
                ),
                [option.name]: value,
              });
              const isAvailable = variant?.availableForSale || false;

              return (
                <button
                  key={value}
                  onClick={() => handleOptionClick(option.name, value)}
                  className={clsx(
                    "flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900",
                    {
                      "cursor-default ring-2 ring-blue-600": isSelected,
                      "ring-1 ring-transparent transition duration-100 hover:scale-110 hover:ring-blue-600":
                        !isSelected && isAvailable,
                      "relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-0 hover:scale-100":
                        !isAvailable,
                      "cursor-pointer": isAvailable,
                    }
                  )}
                  disabled={!isAvailable}
                >
                  {value}
                  {!isAvailable && (
                    <div className="absolute inset-0 -z-10 bg-neutral-300 dark:bg-neutral-700" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
