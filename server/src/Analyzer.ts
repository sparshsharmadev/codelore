import fs from 'fs';
import path from 'path';

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'directory';
  path: string;
  children?: FileNode[];
  size?: number;
  lines?: number;
  language?: string;
}

export class Analyzer {
  private dir: string;

  constructor(dir: string) {
    this.dir = dir;
  }

  async getFileTree(currentDir: string = this.dir, relativePath: string = ''): Promise<FileNode[]> {
    console.log(`[analyzer]: Scanning directory: ${relativePath || '/'}`);
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    const nodes: FileNode[] = [];

    const textExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.html', '.md', '.py', '.go', '.rs', '.txt', '.yml', '.yaml', '.mjs', '.cjs']);

    for (const entry of entries) {
      if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.next') continue;

      const fullPath = path.join(currentDir, entry.name);
      const relPath = path.join(relativePath, entry.name);
      const id = relPath.replace(/\\/g, '-').replace(/\//g, '-');

      if (entry.isDirectory()) {
        nodes.push({
          id,
          name: entry.name,
          type: 'directory',
          path: relPath,
          children: await this.getFileTree(fullPath, relPath),
        });
      } else {
        const stats = fs.statSync(fullPath);
        const ext = path.extname(entry.name).toLowerCase();
        
        let lines = 0;
        if (textExtensions.has(ext)) {
          try {
            const content = fs.readFileSync(fullPath, 'utf-8');
            lines = content.split('\n').length;
          } catch (e) {
            console.warn(`[analyzer]: Could not read file ${relPath}:`, e);
          }
        }

        nodes.push({
          id,
          name: entry.name,
          type: 'file',
          path: relPath,
          size: stats.size,
          lines: lines,
          language: this.detectLanguage(entry.name),
        });
      }
    }

    return nodes;
  }

  private detectLanguage(filename: string): string {
    const ext = path.extname(filename).toLowerCase();
    const map: Record<string, string> = {
      '.ts': 'TypeScript',
      '.tsx': 'TypeScript',
      '.js': 'JavaScript',
      '.jsx': 'JavaScript',
      '.json': 'JSON',
      '.css': 'CSS',
      '.html': 'HTML',
      '.md': 'Markdown',
      '.py': 'Python',
      '.go': 'Go',
      '.rs': 'Rust',
    };
    return map[ext] || 'Text';
  }

  async getMetrics(): Promise<any> {
    const tree = await this.getFileTree();
    let totalFiles = 0;
    let totalLines = 0;
    const languages: Record<string, number> = {};

    const traverse = (nodes: FileNode[]) => {
      for (const node of nodes) {
        if (node.type === 'file') {
          totalFiles++;
          totalLines += node.lines || 0;
          const lang = node.language || 'Other';
          languages[lang] = (languages[lang] || 0) + (node.lines || 0);
        } else if (node.children) {
          traverse(node.children);
        }
      }
    };

    traverse(tree);

    return {
      totalFiles,
      totalLines,
      languages,
      tree
    };
  }
}
