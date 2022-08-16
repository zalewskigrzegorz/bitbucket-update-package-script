import inquirer from 'inquirer';
import { clone, commit, push } from '../services/git.js';
import updatePackage from '../services/updatePackage.js';
import createPullRequest from '../services/createPullRequest.js';

function generateQuestions (options) {
  const { packageName, packageVersion } = options;
  const questions = [];
  if (!packageName) {
    questions.push({ type: 'input', name: 'packageName', message: ' Whats package do you want to update' });
  }
  if (!packageVersion) {
    questions.push({ type: 'input', name: 'packageVersion', message: 'Whats is a current version' });
  }
  return questions;
}
function handleErrors (results) {
  if (results.type === 'error') {
    console.log('\x1b[31m%s\x1b[0m', results.error.message);
    process.exit(1);
  } else {
    console.log('Pull request created successfully');
  }
}

export default function async (App) {
  App.command('updatePackage')
    .description('Create PR on bitbucket with update package in package.json')
    .option('-n --packageName <packageName>', 'name of package to update.')
    .option('-v --packageVersion <packageVersion>', 'target version.')
    .option('-w --workspace <workspace>', '<optional> bitbucket workspace.')
    .option('-r --repository <repository>', '<optional> bitbucket repository.')
    .option('-b --branch <branch>', '<optional> repository main branch.')
    .action(async (options) => {
      const questions = generateQuestions(options);
      const answers = await inquirer.prompt(questions);
      const merged = { ...options, ...answers };
      const { packageName, packageVersion } = merged;

      const workspace = options.workspace || 'Grzegorz_Zalewski';
      const repository = options.repository || 'create-pr-test-repo';
      const destinationBranch = options.branch || 'master';

      const sourceBranch = `${packageName}-${packageVersion}`;
      const title = `Update ${packageName} to ${packageVersion}`;

      try {
        await clone(workspace, repository, sourceBranch);
        await updatePackage(repository, packageVersion, packageName);
        await commit(repository, `Update ${packageName} to ${packageVersion}`);
        await push(repository, sourceBranch, destinationBranch);
        const createPullRequestResult = await createPullRequest(workspace, repository, sourceBranch, destinationBranch, title);
        handleErrors(createPullRequestResult);
        console.log('\x1b[32m%s\x1b[0m', 'Done');
      } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message);
        process.exit(1);
      }
      process.exit();
    });
}
