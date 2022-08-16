import fetch from 'node-fetch';
// to do for some reason i gor an error:
// "The requested repository either does not exist or you do not have access. If you believe this repository exists,
// and you have access, make sure you're authenticated."
// however I can pull repositories from bitbucket api
// I guess this is because of my old bitbucket account.
export default async function createBranch (workspace, repository, destinationBranch, token) {
  const url = `https://api.bitbucket.org/2.0/repositories/${workspace}/${repository}/refs/branches`;
  const body = {
    name: destinationBranch
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
