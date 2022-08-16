import fetch from 'node-fetch';

export default async function createPullRequest (workspace, repository, sourceBranch, destinationBranch, title, token) {
  console.log('Creating pull request');
  const url = `https://api.bitbucket.org/2.0/repositories/${workspace}/${repository}/pullrequests`;
  const body = {
    title: title,
    description: 'Update package.json',
    source: {
      branch: {
        name: sourceBranch
      },
      repository:{
        full_name: `${workspace}/${repository}`
      }
    },
    destination: {
      branch: {
        name: destinationBranch
      },
      repository:{
        full_name: `${workspace}/${repository}`
      }
    }
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${new Buffer.from(`${process.env.USER_NAME}:${process.env.PASSWORD}`).toString('base64')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return await response.json();
}
