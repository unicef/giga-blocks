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

NFT_Content_Address:0x5e41D7F043BEffb68F3064678E1fB1B5aFdbc5B3
School_NFT_Contract_Address:0xA6a171f32EDC5691DC8c1Aaa2B9FE7D9c47CA905
Collector_NFT_Contract_Address:0xE2e91a6120544a493A88e17DA8BDF00b64Ce332C
Giga_Minter_Contract_Address:0xeA56a618D84cEe9B0308f9f2eC66934B220f10c0
Escrow_Contract_Address:0x149298017FaCbb034E54d53F7265616fcA3D3254
Giga_Seller_Contract_Address:0xDdDeE20FBE797D7eE399c9275a1A4b4265e45BFA
ART SCRIPT Contract are auto deployed during nft content deployment
```
