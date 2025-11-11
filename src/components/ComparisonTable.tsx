import { useState, useMemo } from 'react';
import type { AIModel } from '../types';
import { Badge } from './ui/Badge';
import {
  Check,
  X,
  Star,
  ChevronUp,
  ChevronDown,
  Filter
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ComparisonTableProps {
  models: AIModel[];
  selectedModels?: string[];
  viewMode: 'detailed' | 'simplified';
  onModelSelect?: (modelId: string) => void;
}

type SortField = keyof AIModel | null;
type SortDirection = 'asc' | 'desc' | null;

export function ComparisonTable({
  models,
  selectedModels = [],
  viewMode,
  onModelSelect
}: ComparisonTableProps) {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [providerFilter, setProviderFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const providers = useMemo(() => {
    const unique = new Set(models.map(m => m.provider));
    return ['all', ...Array.from(unique)];
  }, [models]);

  const categories = useMemo(() => {
    const unique = new Set(models.map(m => m.category));
    return ['all', ...Array.from(unique)];
  }, [models]);

  const filteredAndSortedModels = useMemo(() => {
    let filtered = models;

    if (providerFilter !== 'all') {
      filtered = filtered.filter(m => m.provider === providerFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(m => m.category === categoryFilter);
    }

    if (selectedModels.length > 0) {
      filtered = filtered.filter(m => selectedModels.includes(m.id));
    }

    if (sortField && sortDirection) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortDirection === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        return 0;
      });
    }

    return filtered;
  }, [models, providerFilter, categoryFilter, selectedModels, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const BooleanIcon = ({ value }: { value: boolean }) => {
    return value ? (
      <Check className="w-5 h-5 text-green-500 mx-auto" />
    ) : (
      <X className="w-5 h-5 text-red-500 mx-auto" />
    );
  };

  const RatingStars = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-0.5 justify-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'w-4 h-4',
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            )}
          />
        ))}
      </div>
    );
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-4 items-center p-4 bg-card rounded-lg border">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <span className="font-medium text-sm">Filters:</span>
        </div>

        <select
          value={providerFilter}
          onChange={(e) => setProviderFilter(e.target.value)}
          className="px-3 py-1.5 rounded-md border bg-background text-sm"
        >
          {providers.map(p => (
            <option key={p} value={p}>
              {p === 'all' ? 'All Providers' : p}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-1.5 rounded-md border bg-background text-sm"
        >
          {categories.map(c => (
            <option key={c} value={c}>
              {c === 'all' ? 'All Categories' : c}
            </option>
          ))}
        </select>

        <span className="text-sm text-muted-foreground ml-auto">
          Showing {filteredAndSortedModels.length} models
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-muted/50">
            <tr>
              <th className="sticky left-0 z-10 bg-muted/50 px-4 py-3 text-left font-semibold border-b border-r">
                Model
              </th>
              <th
                className="px-4 py-3 text-center font-semibold border-b cursor-pointer hover:bg-muted/80"
                onClick={() => handleSort('provider')}
              >
                <div className="flex items-center justify-center gap-1">
                  Provider <SortIcon field="provider" />
                </div>
              </th>

              {/* Technical Specs */}
              <th
                className="px-4 py-3 text-center font-semibold border-b cursor-pointer hover:bg-muted/80"
                onClick={() => handleSort('contextWindow')}
              >
                <div className="flex items-center justify-center gap-1">
                  Context <SortIcon field="contextWindow" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-center font-semibold border-b cursor-pointer hover:bg-muted/80"
                onClick={() => handleSort('maxOutput')}
              >
                <div className="flex items-center justify-center gap-1">
                  Max Output <SortIcon field="maxOutput" />
                </div>
              </th>

              {/* Capabilities */}
              {viewMode === 'detailed' && (
                <>
                  <th
                    className="px-4 py-3 text-center font-semibold border-b cursor-pointer hover:bg-muted/80"
                    onClick={() => handleSort('codingAbility')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Coding <SortIcon field="codingAbility" />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-center font-semibold border-b cursor-pointer hover:bg-muted/80"
                    onClick={() => handleSort('mathReasoning')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Math <SortIcon field="mathReasoning" />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-center font-semibold border-b cursor-pointer hover:bg-muted/80"
                    onClick={() => handleSort('creativeWriting')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Creative <SortIcon field="creativeWriting" />
                    </div>
                  </th>
                </>
              )}

              {/* Features */}
              <th className="px-4 py-3 text-center font-semibold border-b">
                Vision
              </th>
              <th className="px-4 py-3 text-center font-semibold border-b">
                Image Gen
              </th>
              <th className="px-4 py-3 text-center font-semibold border-b">
                Web Search
              </th>
              <th className="px-4 py-3 text-center font-semibold border-b">
                API
              </th>

              {viewMode === 'detailed' && (
                <>
                  <th className="px-4 py-3 text-center font-semibold border-b">
                    Mobile
                  </th>
                  <th
                    className="px-4 py-3 text-center font-semibold border-b cursor-pointer hover:bg-muted/80"
                    onClick={() => handleSort('responseSpeed')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Speed <SortIcon field="responseSpeed" />
                    </div>
                  </th>
                </>
              )}

              <th className="px-4 py-3 text-center font-semibold border-b">
                Pricing
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedModels.map((model) => (
              <tr
                key={model.id}
                className={cn(
                  'hover:bg-muted/30 transition-colors',
                  selectedModels.includes(model.id) && 'bg-primary/5'
                )}
                onClick={() => onModelSelect?.(model.id)}
              >
                <td className="sticky left-0 z-10 bg-background px-4 py-3 border-b border-r">
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold">{model.name}</div>
                    <Badge variant="secondary" className="w-fit">
                      {model.category}
                    </Badge>
                  </div>
                </td>
                <td className="px-4 py-3 text-center border-b">
                  {model.provider}
                </td>
                <td className="px-4 py-3 text-center border-b">
                  <span className="font-mono text-sm">
                    {formatNumber(model.contextWindow)}
                  </span>
                </td>
                <td className="px-4 py-3 text-center border-b">
                  <span className="font-mono text-sm">
                    {formatNumber(model.maxOutput)}
                  </span>
                </td>

                {viewMode === 'detailed' && (
                  <>
                    <td className="px-4 py-3 border-b">
                      <RatingStars rating={model.codingAbility} />
                    </td>
                    <td className="px-4 py-3 border-b">
                      <RatingStars rating={model.mathReasoning} />
                    </td>
                    <td className="px-4 py-3 border-b">
                      <RatingStars rating={model.creativeWriting} />
                    </td>
                  </>
                )}

                <td className="px-4 py-3 border-b">
                  <BooleanIcon value={model.imageUnderstanding} />
                </td>
                <td className="px-4 py-3 border-b">
                  <BooleanIcon value={model.imageGeneration} />
                </td>
                <td className="px-4 py-3 border-b">
                  <BooleanIcon value={model.webSearch} />
                </td>
                <td className="px-4 py-3 border-b">
                  <BooleanIcon value={model.apiAccess} />
                </td>

                {viewMode === 'detailed' && (
                  <>
                    <td className="px-4 py-3 border-b">
                      <BooleanIcon value={model.mobileApp} />
                    </td>
                    <td className="px-4 py-3 border-b">
                      <RatingStars rating={model.responseSpeed} />
                    </td>
                  </>
                )}

                <td className="px-4 py-3 text-sm border-b text-center">
                  {model.pricingModel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
