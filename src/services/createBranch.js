import fetch from 'node-fetch';

export default async function createBranch (workspace, repository, destinationBranch, token) {
  const url = `https://api.bitbucket.org/2.0/repositories/${workspace}/${repository}/refs/branches`;
  const body = {
    name: destinationBranch
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      //todo add support for auth token (don't work on my account)
      //Authorization: `Bearer ${token}`,
      u: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return await response.json();
}
