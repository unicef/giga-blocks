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

NFT_Content_Address:0xd46f768F2abAC3ab03DFDDD5dB248C4aFE905759
School_NFT_Contract_Address:0xFAb542369AEc0674256f073e3a13d51C18FB2d76
Collector_NFT_Contract_Address:0x995456d1FD1f948F553573586CfAb9C971505A68
Giga_Minter_Contract_Address:0x4eD57a6F2CE9A59C871e2Ce84326f14532aD9eC2       
Escrow_Contract_Address:0x84DFe505985Fcf2A81578D0181C8af50038B95CB
Giga_Seller_Contract_Address:0x4A92d10eC84eb7B5d1dC117825D9bf4930FFC0f6
ART SCRIPT Contract are auto deployed during nft content deployment
```
