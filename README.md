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

Contract Addresses deployed for testing in stage server(Sepolia Mumbai):

```

NFT_Content_Address:0x25273EeaD1A8521D1104e5166e4b335008Ef5D4e
School_NFT_Contract_Address:0x371811E7146333544717D61B69F4F612172FEe4c
Collector_NFT_Contract_Address:0xFfC378dB6317685F2856fa8238917B99837416CC
Giga_Minter_Contract_Address:0x6f9DE4786CCDF2A63B27315770609cCa46166074
Escrow_Contract_Address:0x741e153cc31CfD020b71d336ee5855af6cA707fB
Giga_Seller_Contract_Address:0x7807bE2E3f7948cB96588EBF4A1956B466Ad739D
ART SCRIPT Contract are auto deployed during nft content deployment
```
