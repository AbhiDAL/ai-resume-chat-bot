````markdown
# Resume Intelligence Chat Bot

An intelligent web application that enables recruiters and hiring managers to upload candidate resume and project files, then interact with the content through natural language queries. The system uses AI to provide contextual answers based on the uploaded documents.

## Screenshots

![Screenshot](https://github.com/KarinaKKarinaK/resume-chat-bot/blob/main/data/Screenshot%202025-10-11%20at%2023.59.23.png)
![Screenshot](https://github.com/KarinaKKarinaK/resume-chat-bot/blob/main/data/Screenshot%202025-10-11%20at%2023.59.50.png)

## Core Features

- **Document Upload**: Support for markdown and text files containing resumes and project documentation
- **Intelligent Q&A**: Natural language querying of uploaded content with AI-powered responses
- **Source Attribution**: All responses include references to the specific documents used
- **Voice Interface**: Speech-to-text input and text-to-speech output for accessibility
- **Real-time Responses**: Streaming AI responses for immediate feedback
- **Responsive Design**: Optimized for both desktop and mobile devices

## Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth transitions
- **React Markdown** - Markdown rendering for chat responses

### Backend & AI
- **Next.js API Routes** - Serverless API endpoints
- **OpenAI GPT-4** - Language model for generating responses (replaceable with other AI APIs)
- **OpenAI Embeddings** - Text vectorization for semantic search
- **Vector Search** - In-memory similarity search with cosine similarity

### Additional Libraries
- **Heroicons & Lucide React** - Icon libraries
- **Web Speech API** - Browser-native voice recognition and synthesis

## How It Works

The application uses a retrieval-augmented generation (RAG) approach:

1. **Document Processing**: Uploaded files are chunked and converted to vector embeddings
2. **Query Processing**: User questions are also converted to embeddings
3. **Similarity Search**: Relevant document chunks are identified using cosine similarity
4. **Response Generation**: Context and query are sent to the AI model for answer generation
5. **Source Attribution**: The system tracks which documents contributed to each response

## Getting Started

### Prerequisites
- Node.js 18 or higher
- OpenAI API key (or compatible AI service)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KarinaKKarinaK/resume-chat-bot.git
   cd resume-chat-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Edit `.env.local` with your configuration:
   ```bash
   # OpenAI Configuration
   OPENAI_API_KEY=sk-your-openai-api-key-here
   OPENAI_CHAT_MODEL=gpt-4o-mini
   OPENAI_EMBED_MODEL=text-embedding-3-small
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Upload Documents**: Select resume and project files in markdown or text format
2. **Processing**: The system automatically processes and indexes the content
3. **Query**: Ask questions about the candidate's background, skills, or experience
4. **Review Responses**: Receive contextual answers with document source references
5. **Voice Interaction**: Use microphone for voice input or speaker for audio responses

### Example Queries
- "What programming languages does this person know?"
- "Describe their experience with machine learning projects"
- "What frameworks and technologies have they worked with?"
- "Tell me about their leadership or team collaboration experience"
- "What are their notable achievements or project outcomes?"

## Project Structure & Routing

The application follows Next.js 15 App Router conventions:

```
/src/app/
  ├── page.tsx                    # Main interface (file upload + chat)
  ├── layout.tsx                  # Root layout component
  ├── globals.css                 # Global styles and Tailwind imports
  └── api/                        # API route handlers
      ├── ask/route.ts           # Chat endpoint with RAG pipeline
      └── build-embeddings/      # Document processing endpoint
          └── route.ts

/lib/
  ├── embeddings.ts              # Vector generation and storage
  ├── retrieve.ts                # Similarity search algorithms
  ├── prompt.ts                  # AI prompt engineering
  └── types.ts                   # TypeScript type definitions

/data/                           # Sample documents for testing
```

### Routing Architecture

- **`/`** - Main application interface
- **`/api/ask`** - POST endpoint for chat queries with streaming responses
- **`/api/build-embeddings`** - POST endpoint for document processing and vectorization

The API routes handle:
- Document chunking and embedding generation
- Vector similarity search
- AI model integration with context injection
- Response streaming for real-time user experience

## Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```bash
# Required: OpenAI API Configuration
OPENAI_API_KEY=sk-your-actual-openai-api-key-here

# Optional: Model Configuration (defaults shown)
OPENAI_CHAT_MODEL=gpt-4o-mini
OPENAI_EMBED_MODEL=text-embedding-3-small
```

### AI Provider Flexibility

While the application currently uses OpenAI, it can be adapted for other AI providers:

- **Chat Models**: Replace OpenAI calls in `/src/app/api/ask/route.ts`
- **Embeddings**: Modify embedding generation in `/lib/embeddings.ts`
- **Supported Alternatives**: Anthropic Claude, Google Gemini, local models via Ollama

### Customization Options

- **Prompt Engineering**: Modify system prompts in `lib/prompt.ts`
- **Document Processing**: Adjust chunking strategy in `lib/embeddings.ts`
- **Search Parameters**: Configure similarity thresholds in `lib/retrieve.ts`
- **UI Components**: Update interface elements in `src/app/page.tsx`

## Performance & Scalability

### Current Architecture
- **Vector Storage**: In-memory with session persistence
- **Document Limit**: Optimized for hundreds of documents per session
- **Response Time**: Sub-second query processing for typical resume content

### Production Considerations
- **Vector Database**: Migrate to Pinecone, Weaviate, or Supabase pgvector
- **Caching Layer**: Implement Redis for embedding and response caching
- **File Storage**: Use cloud storage (AWS S3, Google Cloud Storage)
- **Authentication**: Add user management and document access control
- **Rate Limiting**: Implement API rate limiting for production use

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy via Vercel Dashboard**:
   - Visit [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "New Project" and import your repository
   - Vercel automatically detects Next.js configuration

3. **Configure Environment Variables**:
   - Add environment variables in project settings:
     - `OPENAI_API_KEY`
     - `OPENAI_CHAT_MODEL` 
     - `OPENAI_EMBED_MODEL`

4. **Deploy**: Click deploy and your app will be live

### Alternative: Vercel CLI
```bash
npx vercel login
npx vercel
npx vercel env add OPENAI_API_KEY
npx vercel --prod
```

### Other Platforms
The application can be deployed on any Node.js hosting platform:
- **Netlify**: Works with serverless functions
- **Railway**: Simple container deployment
- **DigitalOcean App Platform**: Managed deployment option

## Testing

Sample documents in the `/data` folder can be used to test functionality:
- `sample-resume.md` - Software engineer resume example
- `ecommerce-project.md` - E-commerce project documentation  
- `ai-task-management.md` - AI/ML project case study

## Development

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Structure
- Follow TypeScript strict mode conventions
- Use functional components with React hooks
- Implement proper error handling for API routes
- Maintain consistent naming conventions

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit with descriptive messages: `git commit -m 'Add feature description'`
5. Push to your fork: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License.

````
