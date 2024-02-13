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

NFT_Content_Address:0x38AB410c1C650d251a83F884BB76709d1791Ab07
School_NFT_Contract_Address:0xC8fa194CfbE762fC1485Ae98FD46595A7E53b1B1
Collector_NFT_Contract_Address:0xC5Ae8E08e82714759E9E8a2eE37553f450Ae559C
Giga_Minter_Contract_Address:0x0cB95F58414c9c694282a3627986a8A8Ce79103B
Escrow_Contract_Address:0xB11AA79500372DaEe87b08763B43A3c135a1C10d
Giga_Seller_Contract_Address:0x2973bfE0850e5b751625fCd1680374ddEEcc3B54
ART SCRIPT Contract are auto deployed during nft content deployment
```
