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

3. (Optional) Set up API keys for live testing:
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your API keys
nano .env  # or use your preferred editor
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

6. Preview production build:
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

## API Keys Configuration (Optional)

Currently, the app is a **static comparison tool** that doesn't require API keys. However, if you want to add features like live model testing or real-time queries, here's how to configure API keys securely:

### Development Environment

1. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Add your API keys to `.env`:**
   ```env
   VITE_OPENAI_API_KEY=sk-your-openai-key-here
   VITE_ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here
   VITE_GOOGLE_API_KEY=your-google-api-key-here
   ```

3. **Access in your code:**
   ```typescript
   import { API_CONFIG } from '@/lib/api-config';

   const apiKey = API_CONFIG.openai.apiKey;
   ```

### Security Best Practices

⚠️ **IMPORTANT SECURITY NOTES:**

1. **Never commit `.env` to version control** - It's already in `.gitignore`
2. **Use environment variables** - All keys must start with `VITE_` to be accessible
3. **Production deployment** - For production, use:
   - Backend API proxy (recommended)
   - Serverless functions (Vercel, Netlify, CloudFlare Workers)
   - Environment variables in your hosting platform
4. **Rate limiting** - Implement rate limiting to prevent abuse
5. **Key rotation** - Regularly rotate API keys

### Where to Get API Keys

| Provider | Link | Free Tier |
|----------|------|-----------|
| **OpenAI** | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | $5 trial credit |
| **Anthropic** | [console.anthropic.com](https://console.anthropic.com) | $5 trial credit |
| **Google AI** | [makersuite.google.com](https://makersuite.google.com/app/apikey) | Free tier available |
| **xAI** | [x.ai/api](https://x.ai/api) | Requires X Premium |
| **DeepSeek** | [platform.deepseek.com](https://platform.deepseek.com) | Free tier |
| **Mistral** | [console.mistral.ai](https://console.mistral.ai) | Trial credits |
| **Perplexity** | [perplexity.ai/settings/api](https://www.perplexity.ai/settings/api) | Limited free tier |

### Production Deployment

**For production, NEVER expose API keys in the frontend.** Instead:

1. **Use a backend proxy:**
   ```
   Frontend → Your Backend API → AI Model API
   ```

2. **Or use serverless functions:**
   ```typescript
   // Example: Vercel serverless function
   // api/chat.ts
   export default async function handler(req, res) {
     const apiKey = process.env.OPENAI_API_KEY; // Server-side only
     // Make API call here
   }
   ```

3. **Set environment variables in your hosting platform:**
   - **Vercel**: Settings → Environment Variables
   - **Netlify**: Site Settings → Environment Variables
   - **CloudFlare Pages**: Settings → Environment Variables

### Example API Service

Check `src/lib/api-service.example.ts` for example implementations of API calls with proper error handling.

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
