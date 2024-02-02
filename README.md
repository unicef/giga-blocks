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

NFT_Content_Address:0xc3f59ef826cA5A6633878C970BC6Ec182675562c
School_NFT_Contract_Address:0xFFc8115038a6c2d386244Fe35B40e87F53183532
Collector_NFT_Contract_Address:0x5B2EC2d32d42c7b76347C804bbfEd04C58dbd971
Giga_Minter_Contract_Address:0xf60A97DDB980413A07B9a1d6b30025091Ff68003       
Escrow_Contract_Address:0x8C6B2c3fdE22A78D7B0EB26FfA33E1770817904a
Giga_Seller_Contract_Address:0x5Cc8d5fAA086D4844ECA6991E2442d7d3a49e99f
ART SCRIPT Contract are auto deployed during nft content deployment
```
