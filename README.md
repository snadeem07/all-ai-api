# AI Model Comparison App

A comprehensive web application for comparing leading AI models side-by-side with detailed specifications, capabilities, and features.

## Features

### Core Functionality
- **Comprehensive Model Database**: Includes Claude (Opus, Sonnet), ChatGPT (GPT-4, GPT-4o), Gemini (Pro, Ultra), Grok, Kimi K2, DeepSeek, Qwen, Llama, Mistral, and Perplexity
- **Interactive Comparison Table**: Sortable columns, filterable rows, and dynamic data display
- **Multiple View Modes**:
  - Detailed view with all specifications
  - Simplified view for quick comparisons
  - Table view for comprehensive side-by-side comparison
  - Card view for detailed individual model information

### Comparison Categories
- **Technical Specifications**: Context window, max output, knowledge cutoff, supported languages, API availability
- **Core Capabilities**: Text generation, coding ability, math reasoning, logical reasoning, creative writing (5-star ratings)
- **Advanced Features**: Vision, image generation, file upload, web search, real-time data, voice/audio
- **Integration & Tools**: API access, third-party integrations, custom GPTs, plugins, mobile apps
- **Use Cases**: Best for coding, creative writing, research, business, education
- **User Experience**: Response speed, interface quality, ease of use, customer support

### Interactive Features
- **Smart Filtering**: Filter by provider (Anthropic, OpenAI, Google, etc.) and category (flagship, mid-tier, lightweight)
- **Dynamic Sorting**: Click column headers to sort by any metric
- **Model Selection**: Choose specific models for focused comparison
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Export Options**:
  - Export comparison as PDF
  - Export as image (PNG)
- **Share Functionality**: Generate shareable links with selected models preserved in URL

### Design
- Clean, modern interface with responsive design
- Mobile-friendly layout that adapts to all screen sizes
- Accessible color schemes and intuitive navigation
- Smooth animations and transitions
- Professional typography and spacing

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Export**: html2canvas + jsPDF
- **Type Safety**: Full TypeScript coverage

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd all-ai-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (Button, Card, Badge)
│   ├── ComparisonTable.tsx
│   └── ModelDetailCard.tsx
├── data/               # Model data and constants
│   └── models.ts       # AI model specifications
├── hooks/              # Custom React hooks
│   └── useTheme.tsx    # Theme management
├── lib/                # Utility functions
│   ├── utils.ts        # General utilities
│   └── export.ts       # Export functionality
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared types
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind config
```

## Usage

### Comparing Models
1. View all models in the default table view
2. Use filters to narrow down by provider or category
3. Click column headers to sort by different metrics
4. Toggle between detailed and simplified views
5. Switch to card view for in-depth model information

### Selecting Specific Models
1. Click "Select Models" button
2. Choose the models you want to compare
3. Click "Clear All" to reset selection
4. Selected models are highlighted in the table

### Exporting Comparisons
1. Hover over the "Export" button
2. Choose "Export as PDF" or "Export as Image"
3. The comparison will be saved to your downloads folder

### Sharing Comparisons
1. Select the models you want to share
2. Click the "Share" button
3. The URL with your selection is copied to clipboard
4. Share the link with others to show the same comparison

## Model Data

The application includes comprehensive, up-to-date information about:

- **Anthropic**: Claude 3 Opus, Claude 3.5 Sonnet
- **OpenAI**: GPT-4, GPT-4o
- **Google**: Gemini Ultra, Gemini Pro 1.5
- **xAI**: Grok 2
- **Moonshot AI**: Kimi K2
- **DeepSeek**: DeepSeek V3
- **Alibaba**: Qwen 2.5
- **Meta**: Llama 3.3 70B
- **Mistral AI**: Mistral Large 2
- **Perplexity AI**: Perplexity Pro

All data is regularly updated to reflect the latest capabilities and features of each model.

## Contributing

To add or update model information:

1. Edit `src/data/models.ts`
2. Follow the existing `AIModel` type structure
3. Ensure all fields are accurately filled
4. Update the `lastUpdated` field
5. Test the changes locally
6. Submit a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Model specifications compiled from official documentation
- Benchmark data from public testing results
- Community feedback and real-world usage insights

## Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Last Updated**: January 2025

*Note: AI model capabilities and features change frequently. Please verify information with official sources for the most current details.*
