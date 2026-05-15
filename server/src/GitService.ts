import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import fs from 'fs';
import path from 'path';

export class GitService {
  private baseDir: string;

  constructor(baseDir: string) {
    this.baseDir = baseDir;
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
    }
  }

  async clone(url: string): Promise<string> {
    const repoName = Buffer.from(url).toString('hex').slice(0, 12);
    const dir = path.join(this.baseDir, repoName);

    if (fs.existsSync(dir)) {
      // If exists, we might want to pull or just use existing
      // For now, let's just return the directory
      return dir;
    }

    await git.clone({
      fs,
      http,
      dir,
      url,
      singleBranch: true,
      depth: 1,
    });

    return dir;
  }
}
