'use client';

import type { DesignSearchResponse, StockDesign } from 'lib/types/design';
import Image from 'next/image';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

interface DesignGridItemProps {
  design: StockDesign;
  isSelected: boolean;
  onSelect: (designId: string) => void;
}

const DesignGridItem = memo(
  function DesignGridItem({ design, isSelected, onSelect }: DesignGridItemProps) {
    const handleClick = useCallback(() => {
      onSelect(design.valueId);
    }, [design.valueId, onSelect]);

    return (
      <button
        onClick={handleClick}
        className={`group relative flex flex-col items-center rounded-lg border-2 bg-white p-4 transition-all hover:shadow-lg ${
          isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-blue-300'
        }`}
      >
        <div className="relative mb-2 h-32 w-full">
          {design.watermarkedUrl ? (
            <Image
              src={design.watermarkedUrl}
              alt={design.name}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
              No image
            </div>
          )}
        </div>
        <div className="text-center text-xs font-semibold text-gray-900">{design.valueId}</div>
        <div className="line-clamp-2 text-center text-xs text-gray-600">{design.name}</div>
      </button>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison: only re-render if these specific props change
    return (
      prevProps.design.valueId === nextProps.design.valueId &&
      prevProps.isSelected === nextProps.isSelected
    );
  }
);

interface DesignGridProps {
  designs: StockDesign[];
  selectedDesignId: string | null;
  loading: boolean;
  total: number;
  offset: number;
  limit: number;
  onSelectDesign: (designId: string) => void;
  onLoadMore: () => void;
}

const DesignGrid = memo(function DesignGrid({
  designs,
  selectedDesignId,
  loading,
  total,
  offset,
  limit,
  onSelectDesign,
  onLoadMore
}: DesignGridProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-7xl">
        {loading && offset === 0 ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-gray-500">Loading designs...</div>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {designs.length} of {total} designs
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {designs.map((design) => (
                <DesignGridItem
                  key={design.valueId}
                  design={design}
                  isSelected={selectedDesignId === design.valueId}
                  onSelect={onSelectDesign}
                />
              ))}
            </div>

            {/* Load More Button */}
            {offset + limit < total && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={onLoadMore}
                  disabled={loading}
                  className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
});

interface StockDesignViewerProps {
  initialSearch?: string;
  initialCategory?: string;
}

export default function StockDesignViewer({
  initialSearch = '',
  initialCategory = ''
}: StockDesignViewerProps) {
  const [designs, setDesigns] = useState<StockDesign[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDesign, setSelectedDesign] = useState<StockDesign | null>(null);
  const [offset, setOffset] = useState(0);
  const limit = 50;
  
  // Use ref to store designs map for stable callback
  const designsMapRef = useRef<Map<string, StockDesign>>(new Map());
  // Track if we've auto-selected to avoid re-fetching when selection changes
  const hasAutoSelectedRef = useRef(false);

  const fetchDesigns = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      });

      if (search) params.append('search', search);
      if (selectedCategory) params.append('category', selectedCategory);

      const response = await fetch(`/api/designs?${params.toString()}`);
      const data: DesignSearchResponse = await response.json();

      setDesigns(data.designs);
      setTotal(data.total);
      setCategories(data.categories);

      // Update designs map
      const newMap = new Map<string, StockDesign>();
      data.designs.forEach((design) => {
        newMap.set(design.valueId, design);
      });
      designsMapRef.current = newMap;

      // Auto-select first design if none selected (only once)
      if (data.designs.length > 0 && !hasAutoSelectedRef.current && data.designs[0]) {
        setSelectedDesign(data.designs[0]);
        hasAutoSelectedRef.current = true;
      }
    } catch (error) {
      console.error('Failed to fetch designs:', error);
    } finally {
      setLoading(false);
    }
  }, [search, selectedCategory, offset]);

  useEffect(() => {
    fetchDesigns();
  }, [fetchDesigns]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setOffset(0);
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
    }
    setOffset(0);
  };

  const handleSelectDesign = useCallback((designId: string) => {
    const design = designsMapRef.current.get(designId);
    if (design) {
      setSelectedDesign(design);
    }
  }, []);

  const loadMore = () => {
    setOffset((prev) => prev + limit);
  };

  // Get main categories (limited to top 20)
  const mainCategories = categories.slice(0, 20);

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Search Bar */}
      <div className="border-b bg-white p-4 shadow-sm">
        <form onSubmit={handleSearch} className="mx-auto max-w-7xl">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="SEARCH.."
              className="w-full rounded-md border border-gray-300 px-4 py-3 pl-12 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </form>
      </div>

      {/* Category Filters */}
      <div className="border-b bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {mainCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Design Grid */}
        <DesignGrid
          designs={designs}
          selectedDesignId={selectedDesign?.valueId ?? null}
          loading={loading}
          total={total}
          offset={offset}
          limit={limit}
          onSelectDesign={handleSelectDesign}
          onLoadMore={loadMore}
        />

        {/* Selected Design Panel */}
        {selectedDesign && (
          <div className="w-96 border-l bg-white p-6 shadow-lg">
            <div className="sticky top-6">
              <div className="mb-4 flex items-start justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{selectedDesign.valueId}</h2>
                <button
                  onClick={() => setSelectedDesign(null)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
                {selectedDesign.watermarkedUrl && (
                  <Image
                    src={selectedDesign.watermarkedUrl}
                    alt={selectedDesign.name}
                    fill
                    className="object-contain p-4"
                    sizes="384px"
                    priority
                  />
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Name</h3>
                  <p className="text-gray-900">{selectedDesign.name}</p>
                </div>

                {selectedDesign.valueCategory2 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Category</h3>
                    <p className="text-gray-900">{selectedDesign.valueCategory2}</p>
                  </div>
                )}

                {selectedDesign.fileType && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">File Type</h3>
                    <p className="text-gray-900">{selectedDesign.fileType}</p>
                  </div>
                )}

                {selectedDesign.widthHeight && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Dimensions</h3>
                    <p className="text-gray-900">{selectedDesign.widthHeight}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

