# Install the Kontent CLI

```sh
npm i -g @kentico/kontent-cli
```

# Add environment

First, clone your project in Kontent app into a new environment. Make sure you are switched to that environment and run the following command with the API keys of the new environment:

```sh
kontent environment add --project-id <your project ID> --api-key <management api key> --name <name of the environment>
```

# Update JSON with codenames

Go into `Migrations/input.json` and adjust the codenames of `itemsToRemove` and `typesToRemove`. The migration `02_removeContentTypes.ts` will also remove any content items of the mentioned type automatically.

# Build the project

The migration scripts use TypeScript. Make sure to run:

```sh
npm run build
```

before testing any changes.

# Run migration

Run the migration scripts using this command:

```sh
kontent migration run -e <your environment> -n <the name of the migration you want to run>
```

e.g.

```sh
kontent migration run -e TESTENV -n 01_removeContentItems
```

Alternatively, you can use `npm run migrate` and `npm run migrate:all` but make sure you adjust the name of the target environment in the `package.json` first!

You will get real time output in the console window.

# Typescript
Migrations scripts should be written in TypeScript. Therefore, *.js files in Migrations folder are ignored in .gitignore. If you need to use *.js files, make sure to exclude them in .gitignore.
