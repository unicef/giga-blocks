# Description 

Monorepo for GIGA made using pnpm workspaces and added nx for caching.

## Setup and Running

We are using `pnpm` as a package manager so we must install it as a global dependencies:
`npm install -g pnpm`
Since this is monorepo, there is only one package.json in the root directory of the Repository. So we can directly manage all the dependencies in a single `node_modules` folder.
Command to install dependencies:
`    pnpm install
   `

Need pnpm for package management.

Installing packages in root of repo

```
pnpm i
```

Make sure postgresql and redis-server are running.
Copy .env.example to .env. And Make prisma migrations first:

```
pnpm run api:prisma:migrate
```

For running specific apps

```
npx nx <command(serve)> <app name>
```

For adding packages

```
pnpm add <package name> -w
```

For running build or lint or test for all apps at once

```
pnpm run build/test/lint/serve
```

If you want to add new libraries in libs, then simply add library and initialize it inside the library directory with:

```
pnpm init
```

And add it to pnpm package using:

```
pnpm add ./libs/<library name> -w
```

For running nx for specific apps or library you can write following syntax:

```
npx nx <command(build,lint,test,serve)> <apps/libs name>
```

Contract Addresses deployed for testing in stage server(Polygon Mumbai):

```

NFT_Content_Address:0xafe9cb76a5fBcAe16E6f8e156A81dd36449c4A64
School_NFT_Contract_Address:0xe917b1DDd84fc71eF3EDF61E3901c7a380B562C1
Collector_NFT_Contract_Address:0x2e7A41FC99a13b0A3C4A4bF0c912a9aB412DB85d
Giga_Minter_Contract_Address:0xa65cc0E8C30145F17d327078492CcE2cc5be539E
Escrow_Contract_Address:0x80E58A6Ca507b6FBE6Eb5Cf193055d46aaE4a895
Giga_Seller_Contract_Address:0x0488350a83C203fc9E52D75D2c760fd6c46b0205
ART SCRIPT Contract are auto deployed during nft content deployment
```
