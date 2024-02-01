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

Contract Addresses deployed for testing in stage server(Ethereum Sepolia):

```

NFT_Content_Address:0x1e01FAed9D113dF7c718200B66788cbf190Bba8C
School_NFT_Contract_Address:0xb241c7f8D544527ff401aD843cE67A6DEc08c8d4
Collector_NFT_Contract_Address:0x4aCf14b18c42FB97f48E044082c8F3221eF359FF
Giga_Minter_Contract_Address:0x5749ad5d0c16D005d7dE8EA418FC1D54E2a32576
Escrow_Contract_Address:0x5Bc0701CF3d5f89Be546114F83d4b84548692FBA
Giga_Seller_Contract_Address:0xD72514505A25843cc96B855Ad734673f947FE735
ART SCRIPT Contract are auto deployed during nft content deployment
```
