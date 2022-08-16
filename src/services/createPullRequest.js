import fetch from 'node-fetch';

export default async function createPullRequest (workspace, repository, sourceBranch, destinationBranch, title, token) {
  const url = `https://api.bitbucket.org/2.0/repositories/${workspace}/${repository}/pullrequests`;
  const body = {
    title: title,
    description: 'Update package.json',
    source: {
      branch: {
        name: sourceBranch
      }
    },
    destination: {
      branch: {
        name: destinationBranch
      }
    }
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      // todo add support for auth token (don't work on my account)
      // Authorization: `Bearer ${token}`,
      u: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return await response.json();
}
