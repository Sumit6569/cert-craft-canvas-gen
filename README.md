# Certificate Generator

A modern, AI-powered certificate generator that creates beautiful, professional certificates using Canvas.js and intelligent design templates.

## ✨ Features

- **AI-Powered Design Generation**: Generate 5 unique certificate designs for any category
- **Interactive Canvas**: Real-time certificate editing with Fabric.js
- **Multiple Themes**: Gold, Royal, Elegant, Modern, and Classic design themes
- **Code Export**: View and copy the Canvas.js implementation code for each design
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Professional Templates**: Carefully crafted layouts with proper typography and spacing

## 🚀 Demo

Enter any certificate category (e.g., "Summer Code Camp", "AI for Farmers", "Leadership Training") and watch as the AI generates 5 unique, professional certificate designs with their corresponding implementation code.

## 🛠️ Technologies Used

- **React 18** - Modern React with TypeScript
- **Fabric.js v6** - Powerful HTML5 canvas library for interactive graphics
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type-safe development

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm (recommended: install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd certificate-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── CertificateGenerator.tsx    # Main generator component
│   ├── CertificateCanvas.tsx       # Canvas rendering component
│   └── ui/                         # Reusable UI components
├── lib/
│   ├── certificateGenerator.ts     # AI design generation logic
│   └── utils.ts                    # Utility functions
├── pages/
│   └── Index.tsx                   # Main page
└── index.css                       # Global styles and design tokens
```

## 🎨 Design System

The project uses a carefully crafted design system with:
- **Semantic color tokens** for consistent theming
- **Professional typography** with proper hierarchy
- **Certificate-specific color palettes** (gold, royal blue, elegant purple, etc.)
- **Responsive layouts** that work on all devices

## 🔧 Key Components

### CertificateGenerator
The main component that handles:
- Category input and validation
- Design generation workflow
- UI state management
- Error handling

### CertificateCanvas
Renders certificates using Fabric.js:
- Real-time canvas rendering
- Interactive design elements
- Export functionality
- Responsive canvas sizing

### Certificate Generator Logic
AI-powered design generation:
- Theme-based color palettes
- Layout algorithms
- Code generation for each design
- Category-specific customization

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the dist/ folder to Netlify
```

## 🎯 Usage Examples

1. **Educational Certificates**
   - "Computer Science Bootcamp"
   - "Digital Marketing Course"
   - "Data Science Workshop"

2. **Professional Training**
   - "Leadership Development"
   - "Project Management"
   - "Safety Training"

3. **Events & Competitions**
   - "Hackathon Winner"
   - "Science Fair Participant"
   - "Innovation Challenge"

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

---

**Built with ❤️ using modern web technologies**