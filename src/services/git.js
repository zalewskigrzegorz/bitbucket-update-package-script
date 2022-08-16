import fs from 'fs';
import { simpleGit } from 'simple-git';

const getRepositoryDir = (repository) => `./temp/${repository}`;

const clone = async (workspace, repository, branch) => {
  console.log('Clone repo');
  const remote = `https://${encodeURIComponent(process.env.USER_NAME)}:${encodeURIComponent(process.env.PASSWORD)}@bitbucket.org/${workspace}/${repository}.git`;
  const repoDir = getRepositoryDir(repository);
  if (fs.existsSync(repoDir)) {
    await fs.rmSync(repoDir, { recursive: true, force: true });
  }

  await simpleGit().clone(remote, repoDir);
  await simpleGit(repoDir).checkoutLocalBranch(branch);
};
const commit = async (repository, message, updateFilesLocation) => {
  console.log('Commit changes');
  const repoDir = getRepositoryDir(repository);
  await simpleGit(repoDir).add(updateFilesLocation);
  await simpleGit(repoDir).commit(message);
};
const push = async (repository, branch) => {
  console.log('Push changes');
  const repoDir = getRepositoryDir(repository);
  await simpleGit(repoDir).push('origin', branch);
};

export { clone, commit, push };
