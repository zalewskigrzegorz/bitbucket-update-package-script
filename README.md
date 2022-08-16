# bitbucket-update-script

Small CLI tool to create PR on bitbucket with updated package in dependencies or devDependencies package.jso.

# Usage

I recommend to use **node > 15**

Install packages in root directory:

`npm install`

Then you can add CLI to your PATH by installing it locally:

`npm install -global`

after that you should be able to run CLI by:

`bitbucket-update-script`

You can also run it without installing by:

`node ./src/index.js <comandName>`
## Setup authentication
before use create your .env file according to .env-example

## Available commands

List of available commands can be always displayed by:

`bitbucket-update-script -h`
`bitbucket-update-script --help`

### updatePackage
Update package in dependencies or devDependencies in bitbucket repository.
You can provide parameters by using options or interactive mode will ask for package name and version.

```Options:
  -n --packageName <packageName>        name of package to update.
  -v --packageVersion <packageVersion>  target version.
  -w --workspace <workspace>            <optional> bitbucket workspace.
  -r --repository <repository>          <optional> bitbucket repository.
  -b --branch <branch>                  <optional> repository main branch.
  -h, --help                            display help for command
```
#### Example output:

```
Clone repo
redoc not found in devDependencies ./temp/create-pr-test-repo/package.json
update redoc to 2.0.0-rc.75 in ./temp/create-pr-test-repo/package.json
redoc not found in devDependencies ./temp/create-pr-test-repo/src/package.json
update redoc to 2.0.0-rc.75 in ./temp/create-pr-test-repo/src/package.json
wrong package.json format Unexpected token } in JSON at position 640
Commit changes
Push changes
Creating pull request
Pull request created successfully
Done
```
#### How it works:
1. Clone repository using git
2. Create local branch with name of package and version
3. Recursive find package.json 
4. Try to parse all found package.json and return console log with error if package.json is not valid
5. Update devDependencies and dependencies in package.json if packageName is found in package.json
6. save package.json
7. Commit changes using git
8. Push changes using git
9. Create pull request using bitbucket api

# To Do
* add support update package.json.lock in bitbucket
* add support update yarn.lock in bitbucket
* fix package.json formatting to fallow the original format
* add support for cross workspace pull request
* replace console log by logger
* consider to fetch only package.json and package.json.lock files from bitbucket to avoid fetching all files from repository
