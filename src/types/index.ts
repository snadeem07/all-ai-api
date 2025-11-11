export interface AIModel {
  id: string;
  name: string;
  provider: string;
  category: 'flagship' | 'mid-tier' | 'lightweight';

  // Technical Specifications
  contextWindow: number;
  maxOutput: number;
  knowledgeCutoff: string;
  supportedLanguages: number;
  apiAvailable: boolean;

  // Core Capabilities (1-5 rating)
  textGeneration: number;
  codingAbility: number;
  mathReasoning: number;
  logicalReasoning: number;
  creativeWriting: number;

  // Advanced Features
  imageUnderstanding: boolean;
  imageGeneration: boolean;
  fileUpload: boolean;
  webSearch: boolean;
  realTimeData: boolean;
  voiceAudio: boolean;

  // Integration & Tools
  apiAccess: boolean;
  thirdPartyIntegrations: boolean;
  customGPTs: boolean;
  pluginSupport: boolean;
  mobileApp: boolean;

  // Strengths & Use Cases
  bestForCoding: boolean;
  bestForCreative: boolean;
  bestForResearch: boolean;
  bestForBusiness: boolean;
  bestForEducation: boolean;

  // Limitations
  knownWeaknesses: string[];
  contentRestrictions: string[];
  rateLimits: string;
  regionalAvailability: string[];

  // User Experience (1-5 rating)
  responseSpeed: number;
  interfaceQuality: number;
  easeOfUse: number;
  customerSupport: number;

  // Additional details
  pricingModel: string;
  specialFeatures: string[];
  lastUpdated: string;
}

export interface ComparisonCategory {
  id: string;
  name: string;
  subcategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  type: 'number' | 'boolean' | 'string' | 'rating' | 'array' | 'date';
  unit?: string;
  description?: string;
}

export type ViewMode = 'detailed' | 'simplified';
export type SortDirection = 'asc' | 'desc';
export type FilterCriteria = {
  category?: string;
  provider?: string;
  minRating?: number;
  features?: string[];
};
