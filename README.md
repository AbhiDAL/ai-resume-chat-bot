# AI Résumé Chatbot

A smart web application that allows recruiters to upload candidate résumé and project files, then ask questions to get AI-powered answers grounded in the candidate's actual experience and work.

## 🌟 Features

- **📄 File Upload**: Upload résumé and project markdown/text files
- **🤖 AI-Powered Q&A**: Ask questions about the candidate's experience, skills, and projects
- **🔍 Source Attribution**: Every answer shows which files the information came from
- **🎙️ Voice Input**: Use speech-to-text for hands-free questioning
- **🔊 Text-to-Speech**: Listen to AI responses with built-in voice synthesis
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **⚡ Real-time Streaming**: Watch answers appear in real-time as the AI generates them

## 🏗️ Architecture

- **Frontend**: Next.js 15 with TypeScript and TailwindCSS
- **Backend**: Next.js API routes with OpenAI integration
- **AI**: GPT-4 for chat completion, text-embedding-3-small for semantic search
- **Data**: In-memory vector storage for embeddings (easily upgradeable to Pinecone/Supabase)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd resume-chat-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your OpenAI API key:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💻 How to Use

1. **Upload Files**: Click the upload area and select résumé and project files (.md or .txt format)
2. **Wait for Processing**: The system will automatically create embeddings from your uploaded content
3. **Ask Questions**: Type or speak questions about the candidate's experience
4. **Get Answers**: Receive AI-generated responses with source citations
5. **Listen to Responses**: Use the speaker icon to hear answers read aloud

### Example Questions
- "What programming languages does this person know?"
- "Tell me about their recent projects"
- "What's their experience with React and TypeScript?"
- "How many years of experience do they have?"
- "What achievements or outcomes did they deliver?"

## 📁 Project Structure

```
/src/app
  /page.tsx                 # Main UI with file upload and chat
  /api/ask/route.ts        # Chat API with retrieval and streaming
  /api/build-embeddings/   # Embedding generation endpoint
/lib
  /embeddings.ts           # Vector creation and storage
  /retrieve.ts             # Similarity search and ranking  
  /prompt.ts               # AI prompt templates
  /types.ts                # TypeScript definitions
/data                      # Sample files for testing
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Heroicons
- **AI**: OpenAI GPT-4 + embeddings
- **Voice**: Web Speech API (built-in browser support)

## 🔧 Configuration

### Environment Variables
- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `OPENAI_CHAT_MODEL`: Chat model (default: gpt-4o-mini)  
- `OPENAI_EMBED_MODEL`: Embedding model (default: text-embedding-3-small)

### Customization
- Modify `lib/prompt.ts` to adjust AI behavior and response style
- Update `lib/embeddings.ts` to change chunk size or embedding logic
- Edit `src/app/page.tsx` to customize the UI and user experience

## 📊 Performance & Scalability

**Current Setup (Demo-Ready)**:
- In-memory vector storage
- File-based embedding persistence  
- Suitable for 100s of documents

**Production Upgrades**:
- **Database**: Move to Supabase pgvector or Pinecone for vector storage
- **Caching**: Add Redis for embedding and response caching
- **Storage**: Use AWS S3 or similar for file storage
- **Authentication**: Add user accounts and file management

## 🚀 Deployment

### Vercel (Recommended)

#### Option 1: Deploy via Vercel CLI
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**
   ```bash
   vercel
   ```

4. **Set environment variables**
   ```bash
   vercel env add OPENAI_API_KEY
   vercel env add OPENAI_CHAT_MODEL
   vercel env add OPENAI_EMBED_MODEL
   ```

5. **Redeploy with environment variables**
   ```bash
   vercel --prod
   ```

#### Option 2: Deploy via Vercel Dashboard
1. **Push code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Go to [vercel.com](https://vercel.com) and sign in**

3. **Import your GitHub repository**
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings

4. **Configure Environment Variables**
   - In project settings, add:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `OPENAI_CHAT_MODEL`: `gpt-4o-mini`
   - `OPENAI_EMBED_MODEL`: `text-embedding-3-small`

5. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-project.vercel.app`

### Manual Deployment
```bash
npm run build
npm start
```

### Environment Variables for Production
Make sure to set these in your Vercel dashboard:
- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `OPENAI_CHAT_MODEL`: `gpt-4o-mini` (or your preferred model)
- `OPENAI_EMBED_MODEL`: `text-embedding-3-small`

## 🧪 Testing

The `/data` folder includes sample files for testing:
- `sample-resume.md` - Example software engineer résumé
- `ecommerce-project.md` - Detailed project description
- `ai-task-management.md` - Complex technical project

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built following the architecture outlined in `instructions.md`
- Inspired by modern AI-powered recruitment tools
- Uses OpenAI's powerful language models for natural conversations
