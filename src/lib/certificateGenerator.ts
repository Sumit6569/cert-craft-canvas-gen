import type { CertificateDesign } from '@/components/CertificateGenerator';

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const generateCertificateDesigns = async (category: string, apiKey?: string): Promise<CertificateDesign[]> => {
  const openaiApiKey = apiKey || localStorage.getItem('openai_api_key');
  
  if (!openaiApiKey) {
    throw new Error('OpenAI API key is required');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: `You are a professional certificate designer. Generate 5 unique certificate design concepts for the given category. 
            Return a JSON array with exactly 5 objects, each containing:
            - name: Creative design name
            - theme: One of [gold, royal, elegant, modern, classic, vibrant, minimalist]
            - layout: Brief description of the layout
            - colors: Array of 3 hex colors [background, primary, accent]
            - elements: Array of 4-5 design elements/features
            
            Make each design unique and appropriate for the category. Ensure valid JSON format.`
          },
          {
            role: 'user',
            content: `Create 5 certificate designs for: ${category}`
          }
        ],
        temperature: 0.8,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data: OpenAIResponse = await response.json();
    const designsJson = data.choices[0].message.content;
    
    let aiDesigns;
    try {
      aiDesigns = JSON.parse(designsJson);
    } catch (parseError) {
      console.error('Failed to parse AI response:', designsJson);
      throw new Error('Invalid response format from AI');
    }

    return aiDesigns.map((design: any, index: number) => ({
      id: `cert-ai-${index + 1}`,
      name: design.name || `AI Design ${index + 1}`,
      theme: design.theme || 'modern',
      layout: design.layout || 'Professional certificate layout',
      colors: design.colors || ['#F1F5F9', '#0F172A', '#475569'],
      elements: design.elements || ['Border', 'Typography', 'Layout', 'Decoration'],
      code: generateCanvasCode(design, category, index + 1)
    }));

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    // Fallback to original designs if API fails
    return getFallbackDesigns(category);
  }
};

const getFallbackDesigns = (category: string): CertificateDesign[] => {

  const baseDesigns = [
    {
      theme: 'gold',
      name: 'Golden Excellence',
      elements: ['Gold border', 'Elegant typography', 'Corner ornaments', 'Classic layout'],
      layout: 'Traditional centered design with ornate borders'
    },
    {
      theme: 'royal',
      name: 'Royal Prestige',
      elements: ['Royal blue accents', 'Geometric patterns', 'Formal typography', 'Regal border'],
      layout: 'Formal layout with geometric decorative elements'
    },
    {
      theme: 'elegant',
      name: 'Modern Elegance',
      elements: ['Purple gradients', 'Clean lines', 'Modern fonts', 'Minimalist design'],
      layout: 'Contemporary design with subtle decorative elements'
    },
    {
      theme: 'modern',
      name: 'Professional Modern',
      elements: ['Clean typography', 'Simple border', 'Professional layout', 'Minimal decoration'],
      layout: 'Clean, professional design perfect for corporate use'
    },
    {
      theme: 'classic',
      name: 'Vintage Classic',
      elements: ['Bronze accents', 'Traditional fonts', 'Vintage styling', 'Classic ornaments'],
      layout: 'Traditional certificate design with vintage appeal'
    }
  ];

  return baseDesigns.map((design, index) => ({
    id: `cert-${index + 1}`,
    name: `${design.name} - ${category}`,
    theme: design.theme as any,
    layout: design.layout,
    colors: getThemeColors(design.theme),
    elements: design.elements,
    code: generateCanvasCode(design, category, index + 1)
  }));
};

const getThemeColors = (theme: string): string[] => {
  const colorMap = {
    gold: ['#FEF3C7', '#D97706', '#92400E'],
    royal: ['#EDE9FE', '#3730A3', '#1E1B4B'],
    elegant: ['#F3E8FF', '#7C3AED', '#581C87'],
    modern: ['#F1F5F9', '#0F172A', '#475569'],
    classic: ['#FEF7ED', '#92400E', '#78350F']
  };
  return colorMap[theme as keyof typeof colorMap] || colorMap.modern;
};

const generateCanvasCode = (design: any, category: string, designNumber: number): string => {
  return `// Certificate Design ${designNumber}: ${design.name}
import { Canvas as FabricCanvas, Text, Rect, Circle } from 'fabric';

const createCertificate${designNumber} = (canvasElement) => {
  // Initialize canvas
  const canvas = new FabricCanvas(canvasElement, {
    width: 800,
    height: 600,
    backgroundColor: '${getThemeColors(design.theme)[0]}',
  });

  // Add decorative border
  const border = new Rect({
    left: 40,
    top: 40,
    width: 720,
    height: 520,
    fill: 'transparent',
    stroke: '${getThemeColors(design.theme)[1]}',
    strokeWidth: 4,
    rx: 10,
    ry: 10,
  });
  canvas.add(border);

  // Add title
  const title = new Text('CERTIFICATE', {
    left: 400,
    top: 120,
    fontSize: 42,
    fontWeight: 'bold',
    fill: '${getThemeColors(design.theme)[1]}',
    textAlign: 'center',
    fontFamily: 'serif',
  });
  title.set({ originX: 'center', originY: 'center' });
  canvas.add(title);

  // Add category
  const categoryText = new Text('${category}', {
    left: 400,
    top: 300,
    fontSize: 24,
    fontWeight: 'bold',
    fill: '${getThemeColors(design.theme)[1]}',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  });
  categoryText.set({ originX: 'center', originY: 'center' });
  canvas.add(categoryText);

  ${design.theme === 'gold' || design.theme === 'classic' ? `
  // Add corner decorations
  const corners = [
    { left: 80, top: 80 },
    { left: 720, top: 80 },
    { left: 80, top: 520 },
    { left: 720, top: 520 }
  ];
  
  corners.forEach(pos => {
    const decoration = new Circle({
      left: pos.left,
      top: pos.top,
      radius: 15,
      fill: '${getThemeColors(design.theme)[1]}',
      opacity: 0.3,
    });
    canvas.add(decoration);
  });` : ''}

  ${design.theme === 'royal' || design.theme === 'elegant' ? `
  // Add geometric patterns
  for (let i = 0; i < 3; i++) {
    const leftPattern = new Rect({
      left: 60 + (i * 8),
      top: 200 + (i * 40),
      width: 4,
      height: 30,
      fill: '${getThemeColors(design.theme)[1]}',
      opacity: 0.4,
      angle: 45,
    });
    canvas.add(leftPattern);
  }` : ''}

  canvas.renderAll();
  return canvas;
};

// Usage:
// const canvas = createCertificate${designNumber}(document.getElementById('canvas'));`;
};