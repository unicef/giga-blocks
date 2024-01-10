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

NFT_Content_Address:0x1b28dd63F9bD83375754e72A8fD96Ff9ec6faf6E
School_NFT_Contract_Address:0x4383f406A6db8156688f4951F27B8eDC3Eb8a0Bc
Collector_NFT_Contract_Address:0x1e579445258bCaC256b96C309606e8230D2B4f9c
Giga_Minter_Contract_Address:0xde5496Ba42cED5aB493A5bb645Bba4a19a142bD3
Escrow_Contract_Address:0x417a1fD671CB7b887ca5B1Ee6CB5b7098Ab648FE
Giga_Seller_Contract_Address:0x8D63d4Cb1D52089324eFA46E85c8bCe21413AF3B
ART SCRIPT Contract are auto deployed during nft content deployment
```
