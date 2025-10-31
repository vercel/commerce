import { readFile } from 'fs/promises';
import type { DesignSearchResponse, StockDesign } from 'lib/types/design';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

// Cache the parsed CSV data in memory
let cachedDesigns: StockDesign[] | null = null;

async function loadDesigns(): Promise<StockDesign[]> {
  if (cachedDesigns) {
    return cachedDesigns;
  }

  const csvPath = path.join(process.cwd(), 'public', 'data', 'lookup_values.csv');
  const csvContent = await readFile(csvPath, 'utf-8');
  const lines = csvContent.split('\n');

  // Skip header row
  const designs: StockDesign[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (!line) continue;

    // Parse CSV line (handle quoted values)
    const values = parseCSVLine(line);
    if (values.length < 11) continue;

    const design: StockDesign = {
      valueId: values[0] ?? '',
      name: values[1] ?? '',
      designUrl: values[2] ?? '',
      valueCategory1: values[3] ?? '',
      valueCategory2: values[4] ?? '',
      valueCategory3: values[5] ?? '',
      designId: values[6] ?? '',
      fileType: values[7] ?? '',
      widthHeight: values[8] ?? '',
      watermarkedUrl: values[9] ?? '',
      nonWatermarkedUrl: values[10] ?? ''
    };

    // Only include designs with valid image URLs
    const hasValidUrl =
      (design.watermarkedUrl && design.watermarkedUrl.startsWith('http')) ||
      (design.nonWatermarkedUrl && design.nonWatermarkedUrl.startsWith('http'));

    if (hasValidUrl) {
      designs.push(design);
    }
  }

  cachedDesigns = designs;
  return designs;
}

function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

function extractCategories(designs: StockDesign[]): string[] {
  const categorySet = new Set<string>();

  designs.forEach((design) => {
    if (design.valueCategory2) categorySet.add(design.valueCategory2);
  });

  return Array.from(categorySet).sort();
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search')?.toLowerCase() || '';
    const category = searchParams.get('category') || '';
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    const allDesigns = await loadDesigns();

    // Filter designs based on search and categories
    let filteredDesigns = allDesigns.filter((design) => {
      // Search filter (searches in ID and name)
      if (search) {
        const matchesSearch =
          design.valueId.toLowerCase().includes(search) ||
          design.name.toLowerCase().includes(search);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (category && design.valueCategory2 !== category) return false;

      return true;
    });

    const total = filteredDesigns.length;
    const paginatedDesigns = filteredDesigns.slice(offset, offset + limit);

    // Get available categories from all designs (not filtered)
    const categories = extractCategories(allDesigns);

    const response: DesignSearchResponse = {
      designs: paginatedDesigns,
      total,
      categories
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error loading designs:', error);
    return NextResponse.json({ error: 'Failed to load designs' }, { status: 500 });
  }
}

