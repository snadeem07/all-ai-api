import { useState, useEffect } from 'react';
import { ComparisonTable } from './components/ComparisonTable';
import { ModelDetailCard } from './components/ModelDetailCard';
import { Button } from './components/ui/Button';
import { Card, CardContent } from './components/ui/Card';
import { aiModels } from './data/models';
import { useTheme } from './hooks/useTheme';
import {
  Sun,
  Moon,
  Download,
  Share2,
  LayoutGrid,
  Table2,
  Eye,
  Filter,
  X,
} from 'lucide-react';
import { exportToPDF, exportToImage, shareLink } from './lib/export';
import { cn } from './lib/utils';

type ViewMode = 'detailed' | 'simplified';
type DisplayMode = 'table' | 'cards';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [viewMode, setViewMode] = useState<ViewMode>('detailed');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('table');
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  // Load selected models from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const modelsParam = params.get('models');
    if (modelsParam) {
      const modelIds = modelsParam.split(',').filter(id =>
        aiModels.some(m => m.id === id)
      );
      setSelectedModels(modelIds);
    }
  }, []);

  const handleModelToggle = (modelId: string) => {
    setSelectedModels(prev => {
      if (prev.includes(modelId)) {
        return prev.filter(id => id !== modelId);
      }
      return [...prev, modelId];
    });
  };

  const handleExportPDF = async () => {
    try {
      await exportToPDF('comparison-content', 'ai-model-comparison.pdf');
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleExportImage = async () => {
    try {
      await exportToImage('comparison-content', 'ai-model-comparison.png');
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleShare = () => {
    shareLink(selectedModels);
    setShareMessage('Link copied to clipboard!');
    setTimeout(() => setShareMessage(''), 3000);
  };

  const displayedModels = selectedModels.length > 0
    ? aiModels.filter(m => selectedModels.includes(m.id))
    : aiModels;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">AI Model Comparison</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Compare leading AI models side-by-side
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* View Mode Toggle */}
              <div className="flex gap-1 p-1 bg-muted rounded-lg">
                <Button
                  size="sm"
                  variant={viewMode === 'simplified' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('simplified')}
                  className="text-xs"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Simple
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'detailed' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('detailed')}
                  className="text-xs"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Detailed
                </Button>
              </div>

              {/* Display Mode Toggle */}
              <div className="flex gap-1 p-1 bg-muted rounded-lg">
                <Button
                  size="sm"
                  variant={displayMode === 'table' ? 'default' : 'ghost'}
                  onClick={() => setDisplayMode('table')}
                >
                  <Table2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={displayMode === 'cards' ? 'default' : 'ghost'}
                  onClick={() => setDisplayMode('cards')}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>

              {/* Model Selector */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowModelSelector(!showModelSelector)}
              >
                <Filter className="w-4 h-4 mr-1" />
                Select Models
                {selectedModels.length > 0 && (
                  <span className="ml-1 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                    {selectedModels.length}
                  </span>
                )}
              </Button>

              {/* Export Dropdown */}
              <div className="relative group">
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
                <div className="absolute right-0 mt-1 w-48 bg-card border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button
                    onClick={handleExportPDF}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-accent rounded-t-md"
                  >
                    Export as PDF
                  </button>
                  <button
                    onClick={handleExportImage}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-accent rounded-b-md"
                  >
                    Export as Image
                  </button>
                </div>
              </div>

              {/* Share Button */}
              <Button size="sm" variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>

              {/* Theme Toggle */}
              <Button size="sm" variant="outline" onClick={toggleTheme}>
                {theme === 'light' ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Share Message */}
          {shareMessage && (
            <div className="mt-2 p-2 bg-green-500/10 text-green-500 rounded-md text-sm">
              {shareMessage}
            </div>
          )}
        </div>
      </header>

      {/* Model Selector */}
      {showModelSelector && (
        <div className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Select Models to Compare</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowModelSelector(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedModels.length > 0 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedModels([])}
                >
                  Clear All
                </Button>
              )}
              {aiModels.map(model => (
                <button
                  key={model.id}
                  onClick={() => handleModelToggle(model.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-sm border transition-colors',
                    selectedModels.includes(model.id)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background hover:bg-accent'
                  )}
                >
                  {model.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div id="comparison-content">
          {displayMode === 'table' ? (
            <ComparisonTable
              models={aiModels}
              selectedModels={selectedModels}
              viewMode={viewMode}
              onModelSelect={handleModelToggle}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {displayedModels.map(model => (
                <ModelDetailCard key={model.id} model={model} />
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2">About This Comparison</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This comparison table provides objective, data-driven insights into the capabilities
              and features of leading AI models. Data is regularly updated to reflect the latest
              information about each model.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-1">How to Use</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Click column headers to sort</li>
                  <li>• Use filters to narrow results</li>
                  <li>• Select specific models to compare</li>
                  <li>• Switch between table and card views</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Rating Scale</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>⭐ 1 star: Basic capability</li>
                  <li>⭐⭐⭐ 3 stars: Good performance</li>
                  <li>⭐⭐⭐⭐⭐ 5 stars: Exceptional</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Data Sources</h4>
                <p className="text-muted-foreground">
                  Information compiled from official documentation, benchmark tests, and
                  real-world usage data.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>AI Model Comparison Tool • Last Updated: January 2025</p>
          <p className="mt-1">
            Data subject to change. Please verify with official sources for the most current information.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
