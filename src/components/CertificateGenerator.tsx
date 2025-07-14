import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Award, Download, Code } from 'lucide-react';
import { CertificateCanvas } from './CertificateCanvas';
import { generateCertificateDesigns } from '@/lib/certificateGenerator';
import { useToast } from '@/hooks/use-toast';

export interface CertificateDesign {
  id: string;
  name: string;
  theme: 'gold' | 'royal' | 'elegant' | 'modern' | 'classic';
  layout: string;
  colors: string[];
  elements: string[];
  code: string;
}

export const CertificateGenerator = () => {
  const [category, setCategory] = useState('');
  const [designs, setDesigns] = useState<CertificateDesign[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!category.trim()) {
      toast({
        title: "Category Required",
        description: "Please enter a certificate category to generate designs.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const generatedDesigns = await generateCertificateDesigns(category);
      setDesigns(generatedDesigns);
      toast({
        title: "Certificates Generated!",
        description: `Created ${generatedDesigns.length} unique certificate designs.`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate certificates. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getThemeColors = (theme: string) => {
    const themeMap = {
      gold: 'bg-certificate-gold text-certificate-gold-dark',
      royal: 'bg-certificate-royal text-white',
      elegant: 'bg-accent text-accent-foreground',
      modern: 'bg-primary text-primary-foreground',
      classic: 'bg-certificate-bronze text-white'
    };
    return themeMap[theme as keyof typeof themeMap] || themeMap.modern;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Award className="h-8 w-8 text-certificate-gold" />
          <h1 className="text-4xl font-bold bg-gradient-gold bg-clip-text text-transparent">
            Certificate Generator
          </h1>
          <Sparkles className="h-8 w-8 text-certificate-royal" />
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Generate beautiful, professional certificates using AI-powered design and Canvas.js rendering
        </p>
      </div>

      {/* Input Section */}
      <Card className="mb-8 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Certificate Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Enter certificate category (e.g., 'Summer Code Camp Certificate', 'AI for Farmers')"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              variant="premium"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Certificates
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {designs.length > 0 && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            Generated Certificate Designs
          </h2>
          
          <div className="grid gap-8">
            {designs.map((design, index) => (
              <Card key={design.id} className="overflow-hidden shadow-certificate">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Badge className={getThemeColors(design.theme)}>
                        {design.theme.toUpperCase()}
                      </Badge>
                      {design.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDesign(selectedDesign === index ? null : index)}
                      >
                        <Code className="h-4 w-4" />
                        {selectedDesign === index ? 'Hide Code' : 'Show Code'}
                      </Button>
                      <Button variant="royal" size="sm">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Certificate Preview */}
                  <div className="mb-6">
                    <CertificateCanvas design={design} category={category} />
                  </div>

                  {/* Design Info */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Design Elements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {design.elements.map((element, idx) => (
                        <Badge key={idx} variant="outline">{element}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Code Display */}
                  {selectedDesign === index && (
                    <div className="bg-muted rounded-lg p-4 border">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Canvas.js Implementation
                      </h4>
                      <pre className="text-sm overflow-x-auto whitespace-pre-wrap text-muted-foreground">
                        <code>{design.code}</code>
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {designs.length === 0 && !isGenerating && (
        <Card className="text-center py-12 bg-gradient-elegant">
          <CardContent>
            <Award className="h-16 w-16 mx-auto mb-4 text-certificate-gold" />
            <h3 className="text-xl font-semibold mb-2">Ready to Create Certificates</h3>
            <p className="text-muted-foreground">
              Enter a certificate category above to generate 5 unique, professional certificate designs
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};