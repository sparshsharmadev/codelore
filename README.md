# Codelore

> **Note**: This is a work in progress.

Codelore is an advanced codebase visualization, architecture analysis, and repository intelligence engine. It parses target repositories in real-time, builds structural graphs, maps request execution lifecycles, and provides codebase-grounded AI chat capabilities.

## Key Features

- **Interactive Architecture Map**: Automatically compiles and renders visual module dependencies and component boundaries as interactive graphs.
- **Codebase-Grounded Chat (cl.ai)**: Ask questions directly about the target repository (architecture, setup, custom feature guides) with answers grounded directly in the cloned file structure.
- **Request Execution Tracing**: Step through detailed request lifecycles from API routes down to the utility functions.
- **Static File Explorer**: Inspect file imports, exports, and metadata ratings without manual scanning.
- **Automatic Dependency Audits**: Evaluates packages, sizes, and licensing info straight from dependency manifests.
- **Dynamic Onboarding Checklist**: Generates step-by-step setup guides custom-tailored to the target project.

## Technology Stack

- **Frontend**: React 18, Vite 6, TailwindCSS v4, Radix UI, Motion, Recharts
- **Backend**: Node.js, Express, TypeScript, isomorphic-git (for lightweight repository cloning/indexing)
- **AI Engine**: `cl.ai` (Supports NVIDIA Nemotron Ultra, Nemotron 70B, and Gemini 2.5 Flash API models)

## Getting Started

### Prerequisites

- Node.js (v18+)
- A Gemini API key (or OpenRouter API key)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/theshantanujoshi/codelore.git
   cd codelore
   ```

2. Install dependencies for the monorepo:
   ```bash
   npm install
   ```

3. Configure your API key in the server:
   Create a `.env` file in the `server` directory:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY="your_api_key_here"
   ```

### Running the Application

To run the unified server (port `3001`) with Vite middleware active:
```bash
npm run dev
```

Open your browser to [http://localhost:3001](http://localhost:3001) to explore.
