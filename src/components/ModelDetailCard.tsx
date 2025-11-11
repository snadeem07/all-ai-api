import type { AIModel } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Star, Check, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface ModelDetailCardProps {
  model: AIModel;
}

export function ModelDetailCard({ model }: ModelDetailCardProps) {
  const RatingStars = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-0.5">
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

  const BooleanBadge = ({ value, label }: { value: boolean; label: string }) => {
    return (
      <Badge variant={value ? 'success' : 'secondary'} className="flex items-center gap-1">
        {value ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
        {label}
      </Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl mb-2">{model.name}</CardTitle>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="default">{model.provider}</Badge>
              <Badge variant="secondary">{model.category}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Technical Specifications */}
        <section>
          <h3 className="font-semibold text-lg mb-3">Technical Specifications</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Context Window</p>
              <p className="font-mono font-semibold">
                {model.contextWindow.toLocaleString()} tokens
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Max Output</p>
              <p className="font-mono font-semibold">
                {model.maxOutput.toLocaleString()} tokens
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Knowledge Cutoff</p>
              <p className="font-semibold">{model.knowledgeCutoff}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Supported Languages</p>
              <p className="font-semibold">{model.supportedLanguages}+</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">API Available</p>
              <BooleanBadge value={model.apiAvailable} label={model.apiAvailable ? 'Yes' : 'No'} />
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section>
          <h3 className="font-semibold text-lg mb-3">Core Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Text Generation</span>
              <RatingStars rating={model.textGeneration} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Coding Ability</span>
              <RatingStars rating={model.codingAbility} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Math Reasoning</span>
              <RatingStars rating={model.mathReasoning} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Logical Reasoning</span>
              <RatingStars rating={model.logicalReasoning} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Creative Writing</span>
              <RatingStars rating={model.creativeWriting} />
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section>
          <h3 className="font-semibold text-lg mb-3">Advanced Features</h3>
          <div className="flex flex-wrap gap-2">
            <BooleanBadge value={model.imageUnderstanding} label="Vision" />
            <BooleanBadge value={model.imageGeneration} label="Image Generation" />
            <BooleanBadge value={model.fileUpload} label="File Upload" />
            <BooleanBadge value={model.webSearch} label="Web Search" />
            <BooleanBadge value={model.realTimeData} label="Real-time Data" />
            <BooleanBadge value={model.voiceAudio} label="Voice/Audio" />
          </div>
        </section>

        {/* Best Use Cases */}
        <section>
          <h3 className="font-semibold text-lg mb-3">Best Use Cases</h3>
          <div className="flex flex-wrap gap-2">
            {model.bestForCoding && <Badge variant="success">Coding</Badge>}
            {model.bestForCreative && <Badge variant="success">Creative Writing</Badge>}
            {model.bestForResearch && <Badge variant="success">Research</Badge>}
            {model.bestForBusiness && <Badge variant="success">Business</Badge>}
            {model.bestForEducation && <Badge variant="success">Education</Badge>}
          </div>
        </section>

        {/* User Experience */}
        <section>
          <h3 className="font-semibold text-lg mb-3">User Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Response Speed</span>
              <RatingStars rating={model.responseSpeed} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Interface Quality</span>
              <RatingStars rating={model.interfaceQuality} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Ease of Use</span>
              <RatingStars rating={model.easeOfUse} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Customer Support</span>
              <RatingStars rating={model.customerSupport} />
            </div>
          </div>
        </section>

        {/* Limitations */}
        {model.knownWeaknesses.length > 0 && (
          <section>
            <h3 className="font-semibold text-lg mb-3">Known Weaknesses</h3>
            <ul className="list-disc list-inside space-y-1">
              {model.knownWeaknesses.map((weakness, idx) => (
                <li key={idx} className="text-sm text-muted-foreground">
                  {weakness}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Special Features */}
        {model.specialFeatures.length > 0 && (
          <section>
            <h3 className="font-semibold text-lg mb-3">Special Features</h3>
            <div className="flex flex-wrap gap-2">
              {model.specialFeatures.map((feature, idx) => (
                <Badge key={idx} variant="default">
                  {feature}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Pricing */}
        <section>
          <h3 className="font-semibold text-lg mb-3">Pricing</h3>
          <p className="text-sm">{model.pricingModel}</p>
        </section>

        {/* Additional Info */}
        <section className="text-xs text-muted-foreground pt-4 border-t">
          <p>Last Updated: {model.lastUpdated}</p>
          <p>Rate Limits: {model.rateLimits}</p>
        </section>
      </CardContent>
    </Card>
  );
}
