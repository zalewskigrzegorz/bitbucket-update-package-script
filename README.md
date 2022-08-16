# bitbucket-update-script

Small CLI tool to create PR on bitbucket with update package.json in.

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

### createPr
Create a new workspace. You can provide data by using options or interactive mode, leaving empty value in an interactive mode will generate fake for it.

```Options:
  -n --packageName <packageName>        name of package to update.
  -v --packageVersion <packageVersion>  target version.
  -w --workspace <workspace>            <optional> bitbucket workspace.
  -r --repository <repository>          <optional> bitbucket repository.
  -b --branch <branch>                  <optional> repository main branch.
  -h, --help                            display help for command
```

# To Do
* add support update package.json.lock in bitbucket
* add support update yarn.lock in bitbucket
* add support for Bearer token
* fix package.json end line
* add support for cross workspace pull request
* add progress bar
