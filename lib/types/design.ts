export interface StockDesign {
  valueId: string;
  name: string;
  designUrl: string;
  valueCategory1: string;
  valueCategory2: string;
  valueCategory3: string;
  designId: string;
  fileType: string;
  widthHeight: string;
  watermarkedUrl: string;
  nonWatermarkedUrl: string;
}

export interface DesignSearchParams {
  search?: string;
  category?: string;
  limit?: number;
  offset?: number;
}

export interface DesignSearchResponse {
  designs: StockDesign[];
  total: number;
  categories: string[];
}

