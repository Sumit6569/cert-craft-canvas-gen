import React, { useEffect, useRef } from 'react';
import { Canvas as FabricCanvas, Text, Rect, Circle } from 'fabric';
import type { CertificateDesign } from './CertificateGenerator';

interface CertificateCanvasProps {
  design: CertificateDesign;
  category: string;
}

export const CertificateCanvas: React.FC<CertificateCanvasProps> = ({ design, category }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Fabric.js canvas
    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });

    fabricCanvasRef.current = canvas;

    // Create certificate based on design theme
    createCertificate(canvas, design, category);

    return () => {
      canvas.dispose();
    };
  }, [design, category]);

  const createCertificate = (canvas: FabricCanvas, design: CertificateDesign, category: string) => {
    // Clear existing objects
    canvas.clear();

    // Set background based on theme
    const backgrounds = {
      gold: '#FEF3C7',
      royal: '#EDE9FE', 
      elegant: '#F3E8FF',
      modern: '#F1F5F9',
      classic: '#FEF7ED'
    };
    
    canvas.backgroundColor = backgrounds[design.theme] || backgrounds.modern;

    // Add decorative border
    const border = new Rect({
      left: 40,
      top: 40,
      width: 720,
      height: 520,
      fill: 'transparent',
      stroke: getThemeColor(design.theme),
      strokeWidth: 4,
      rx: 10,
      ry: 10,
    });
    canvas.add(border);

    // Add inner decorative elements based on theme
    if (design.theme === 'gold' || design.theme === 'classic') {
      // Add corner decorations
      addCornerDecorations(canvas, design.theme);
    }

    if (design.theme === 'royal' || design.theme === 'elegant') {
      // Add geometric patterns
      addGeometricPatterns(canvas, design.theme);
    }

    // Add certificate title
    const title = new Text('CERTIFICATE', {
      left: 400,
      top: 120,
      fontSize: 42,
      fontWeight: 'bold',
      fill: getThemeColor(design.theme),
      textAlign: 'center',
      fontFamily: 'serif',
    });
    title.set({ originX: 'center', originY: 'center' });
    canvas.add(title);

    // Add subtitle
    const subtitle = new Text('OF ACHIEVEMENT', {
      left: 400,
      top: 170,
      fontSize: 18,
      fill: getSecondaryColor(design.theme),
      textAlign: 'center',
      fontFamily: 'serif',
      letterSpacing: 2,
    });
    subtitle.set({ originX: 'center', originY: 'center' });
    canvas.add(subtitle);

    // Add category text
    const categoryText = new Text(category, {
      left: 400,
      top: 300,
      fontSize: 24,
      fontWeight: 'bold',
      fill: getThemeColor(design.theme),
      textAlign: 'center',
      fontFamily: 'sans-serif',
    });
    categoryText.set({ originX: 'center', originY: 'center' });
    canvas.add(categoryText);

    // Add recipient line
    const recipientLabel = new Text('This certifies that', {
      left: 400,
      top: 240,
      fontSize: 16,
      fill: getSecondaryColor(design.theme),
      textAlign: 'center',
      fontFamily: 'serif',
    });
    recipientLabel.set({ originX: 'center', originY: 'center' });
    canvas.add(recipientLabel);

    const recipientLine = new Rect({
      left: 300,
      top: 350,
      width: 200,
      height: 2,
      fill: getThemeColor(design.theme),
    });
    canvas.add(recipientLine);

    const recipientText = new Text('[Recipient Name]', {
      left: 400,
      top: 340,
      fontSize: 20,
      fill: getSecondaryColor(design.theme),
      textAlign: 'center',
      fontFamily: 'serif',
      fontStyle: 'italic',
    });
    recipientText.set({ originX: 'center', originY: 'center' });
    canvas.add(recipientText);

    // Add completion text
    const completionText = new Text('has successfully completed', {
      left: 400,
      top: 380,
      fontSize: 16,
      fill: getSecondaryColor(design.theme),
      textAlign: 'center',
      fontFamily: 'serif',
    });
    completionText.set({ originX: 'center', originY: 'center' });
    canvas.add(completionText);

    // Add date and signature areas
    addDateAndSignature(canvas, design.theme);

    canvas.renderAll();
  };

  const addCornerDecorations = (canvas: FabricCanvas, theme: string) => {
    const color = getThemeColor(theme);
    
    // Top-left corner
    const topLeft = new Circle({
      left: 80,
      top: 80,
      radius: 15,
      fill: color,
      opacity: 0.3,
    });
    canvas.add(topLeft);

    // Top-right corner  
    const topRight = new Circle({
      left: 720,
      top: 80,
      radius: 15,
      fill: color,
      opacity: 0.3,
    });
    canvas.add(topRight);

    // Bottom-left corner
    const bottomLeft = new Circle({
      left: 80,
      top: 520,
      radius: 15,
      fill: color,
      opacity: 0.3,
    });
    canvas.add(bottomLeft);

    // Bottom-right corner
    const bottomRight = new Circle({
      left: 720,
      top: 520,
      radius: 15,
      fill: color,
      opacity: 0.3,
    });
    canvas.add(bottomRight);
  };

  const addGeometricPatterns = (canvas: FabricCanvas, theme: string) => {
    const color = getThemeColor(theme);
    
    // Left pattern
    for (let i = 0; i < 3; i++) {
      const rect = new Rect({
        left: 60 + (i * 8),
        top: 200 + (i * 40),
        width: 4,
        height: 30,
        fill: color,
        opacity: 0.4,
        angle: 45,
      });
      canvas.add(rect);
    }

    // Right pattern
    for (let i = 0; i < 3; i++) {
      const rect = new Rect({
        left: 740 - (i * 8),
        top: 200 + (i * 40),
        width: 4,
        height: 30,
        fill: color,
        opacity: 0.4,
        angle: -45,
      });
      canvas.add(rect);
    }
  };

  const addDateAndSignature = (canvas: FabricCanvas, theme: string) => {
    const color = getSecondaryColor(theme);

    // Date section
    const dateLabel = new Text('Date:', {
      left: 150,
      top: 480,
      fontSize: 14,
      fill: color,
      fontFamily: 'serif',
    });
    canvas.add(dateLabel);

    const dateLine = new Rect({
      left: 200,
      top: 490,
      width: 120,
      height: 1,
      fill: color,
    });
    canvas.add(dateLine);

    // Signature section
    const signatureLabel = new Text('Authorized Signature:', {
      left: 450,
      top: 480,
      fontSize: 14,
      fill: color,
      fontFamily: 'serif',
    });
    canvas.add(signatureLabel);

    const signatureLine = new Rect({
      left: 580,
      top: 490,
      width: 150,
      height: 1,
      fill: color,
    });
    canvas.add(signatureLine);
  };

  const getThemeColor = (theme: string): string => {
    const colors = {
      gold: '#D97706',
      royal: '#3730A3',
      elegant: '#7C3AED',
      modern: '#0F172A',
      classic: '#92400E'
    };
    return colors[theme as keyof typeof colors] || colors.modern;
  };

  const getSecondaryColor = (theme: string): string => {
    const colors = {
      gold: '#92400E',
      royal: '#1E1B4B',
      elegant: '#581C87',
      modern: '#475569',
      classic: '#78350F'
    };
    return colors[theme as keyof typeof colors] || colors.modern;
  };

  return (
    <div className="w-full flex justify-center">
      <div className="border border-border rounded-lg overflow-hidden shadow-lg">
        <canvas 
          ref={canvasRef} 
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};