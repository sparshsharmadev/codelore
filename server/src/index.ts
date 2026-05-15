import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { GitService } from './GitService.js';
import { Analyzer } from './Analyzer.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const reposDir = path.join(__dirname, '../data/repos');

const gitService = new GitService(reposDir);

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'codelore backend is active' });
});

app.post('/api/analyze', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Repository URL is required' });
  }

  try {
    console.log(`[server]: Analyzing repository: ${url}`);
    const repoDir = await gitService.clone(url);
    const analyzer = new Analyzer(repoDir);
    const metrics = await analyzer.getMetrics();

    // Mocking some repo info for now
    const repoName = url.split('/').pop()?.replace('.git', '') || 'unknown';
    const owner = url.split('/').slice(-2, -1)[0] || 'unknown';

    const repoInfo = {
      name: repoName,
      owner: owner,
      fullName: `${owner}/${repoName}`,
      url: url,
      branch: 'main',
      description: 'Automatically analyzed repository',
      files: metrics.totalFiles,
      lines: metrics.totalLines,
      primaryLanguage: Object.entries(metrics.languages).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || 'Unknown',
      stars: 0,
      lastAnalyzed: new Date().toLocaleString(),
      score: 85,
      fileTree: metrics.tree,
      languages: metrics.languages
    };

    res.json(repoInfo);
  } catch (error: any) {
    console.error(`[server]: Analysis failed:`, error);
    res.status(500).json({ error: 'Failed to analyze repository', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
