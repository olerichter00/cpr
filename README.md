<br />

<h1 align="center">
  <img src="./logo.svg">
  <br />
  <br />
  Create Pull Request
  <br />
</h1>
<h3 align="center">
  A tool to create Pull Requests from current changes with one command
</h3>
<br />

### Features

- Creates the branch `PREFIX/JIRA_TICKET_NUMBER/your-commit-message`.
- Commits all changes.
- Creates a Pull Request.
- Adds the Jira ticket number and a description to the PR body (using the repository's PR template if it exists).
- Opens the PR in the browser.


### Setup

- Make sure [Deno](https://deno.land/manual/getting_started/installation) and [GitHub CLI](https://github.com/cli/cli) are installed.
- Adjust [constants.ts](src/constants.ts)
- Run `make compile` to create a self-contained executable.
- Copy executable with `cp cpr /usr/local/bin/cpr`

### Usage

```
Usage:
  $ cpr <PR TITLE> [options]

Options:
  -t, --ticket <ticket>            Provide a ticket number or url 
  -d, --description <description>  Provide a PR description 
  -h, --help                       Display this message 
```

### Examples

```
cpr feature: my new cool feature -t CX-1234 -d "My PR Descryption"
cpr feature: my new cool feature -t https://artsyproduct.atlassian.net/browse/CX-1234
```

which will create the following Pull Request:

```
PR Title: feature: my new cool feature
PR Description: My PR Description
Branch Name: ${YOUR_PREFIX}/CX-1234/my-new-cool-feature
Included Files:
my-file.txt
```

### Development

- `make run`:      executes `index.ts`
- `make test`:     runs tests
- `make format`:   formats all files
- `make debug`:    runs the debugger starting in `index.ts`
- `make bundle`:   bundles into a single file `build/index`
- `make compile`:  compiles to executable
