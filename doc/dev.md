# Development guidelines

## Lerna

Lerna is in independent mode (`lerna init --independent`) so that we can version components and utils independently.

Basic operations:

- adding a dependency to all packages: `lerna add svelte`
- adding a dev dependency to all packages: `lerna add -D svelte`
- adding a peer dependency to all packages: `lerna add --peer svelte`
- adding a dev dependency to a specific package: `lerna add nock -D --scope=@svizzle/request`
- testing a specific package: `lerna run test --scope=@svizzle/utils`
- running a script with a command line argument: `lerna run lint -- -- --fix`

## Development

### Installation

In the rot dir:

- `npm install`
- `npm run lernacleanboot`

### Site

Running the site:

- make sure to do the steps above
- `cd packages/docs/site`
- `npm run dev`
- navigate to `http://localhost:3000/svizzle` (or similar port)

Since packages are linked in Lerna, the components website should reload every time you update the source code of a Svizzle package.

## Bumping versions

### Preparation

- checkout the `dev` branch.
- for each package, check that we're exporting from all the modules in the `index.js`
- `npm run prepublishOnly` or alternatively run its steps separately:
	- `npm run lernacleanboot`
	- `lerna run lint`
	- `lerna run test`
- tree-shaking:
	- document side effects in docstrings, for example using (`@sideEffects: console.log` or `@sideEffects: fs.writeFile`): a package is supposed to be side-effects-free if there are no occurrences of `@sideEffects`;
	- check `sideEffects` for all of the updating packages: if even just one of a package dependencies have `sideEffects: true` or it is unknown, then the package `sideEffects` should be set to `true`;
	- check and keep `doc/tree-shaking.md` up-to-date;
- changelog:
	- compile the changelog for all changed/new packages using the correct version;
	- copy the changelog from all the changed/new packages onto the global changelog;
	- make sure to title the changelog with the current date (for example 20190220);
- based on this, for every changed packages:
	- choose the next version depending on if it's going to be a `patch`, `minor` or `major`;
	- check that `@version <version>` in jsdoc blocks for new functions is correct
- eventually, `git rebase -i HEAD~n`:
	- `n` being number of commits since last release
	- as a commit message, paste what you added to the global changelog

### Versioning

- In `dev`:
	- bump the versions: `lerna version --no-changelog --no-git-tag-version --no-push`:
	- Follow instructions to bump changed packages with a `patch`, `minor` or `major` version, accept when ready.
	- After accepting the final confirmation step, this will bump versions (only allowed in `dev`).

- If something goes wrong or we forgot something and Lerna actually committed:
	- discard the version commit, we have 2 ways:
		- `git revert HEAD`: creates a commit to revert the version commit created by Lerna (we will rebase anyway), or
		- `git reset --hard HEAD~1`: reset the index and the working tree to 1 commit before the commit created by Lerna;
	- edit some code again;
	- **rebase again** the commits since the last release.

- Create a new branch, commit

- If everything went fine: `git push`, then create a PR.

- Once the PR is approved, merge it to `dev`.

- Merge to `release`:
	- `git checkout release`
	- `git merge dev`
	- `git push`

### Release candidates

- to bump the next `patch` number, run `npm run setprepatch` to update `version` to the next patch, say from `0.6.1` to `0.6.2-dev.0`;
- to bump the next `minor` number, run `npm run setpreminor` to update `version` to the next minor, say from `0.2.0` to `0.3.0-dev.0`.
- for the next dev releases, run `npm run setprerelease` to update `version` say from `0.3.0-dev.0` to `0.3.0-dev.1`, or `0.3.0-dev.1` to `0.3.0-dev.2`, and so on.

The first time we added a new important change to `@svizzle/utils` after we published version `0.2.0`:
- `npm run setpreminor`: `0.2.0` => `0.3.0-dev.0`

The second time (and on):
- `npm run setprerelease`: `0.3.0-dev.0` => `0.3.0-dev.1`

## Publishing

- `git checkout release`
- `lerna publish from-package`. This will run the `prepublishOnly` script which in turn:
	- runs cleanups,
	- re-install dependencies,
	- run tests,
- `npm run deployDoc` to build and publish the documentation website

## Tagging / releasing

Shouldn't we use `--no-git-tag-version`, `lerna version` would create one tag per package:

```
$ git tag
@svizzle/dev@0.1.0
@svizzle/dom@0.1.0
@svizzle/file@0.1.0
@svizzle/geo@0.1.0
@svizzle/geometry@0.1.0
@svizzle/request@0.1.0
@svizzle/utils@0.1.0
```

We could push them [1] but:
- it would be tedious
- we'd get tags all cluttered as they'd contain one tag per package release, each containing all of the other packages at the time of the publication, so lots of repetitions going on.

Instead we'll tag manually a bunch of releases together:

- `git tag -a 20190220`
- `git push origin 20190220`
- (`git push origin :20190220` to delete it if needs to be done again)

[1] one by one with `git push origin @svizzle/dev@0.1.0` etc, don't use `git push --all`
