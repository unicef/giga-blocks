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

NFT_Content_Address:0x39FEdB973f12DC5Fe1DBd4B8E3c5f298A6e636AA
School_NFT_Contract_Address:0x9F96CA9074B37C39a794B7E4245Be027FCC8A430
Collector_NFT_Contract_Address:0xa52ca6B53C9B614DEBDAB6e0AC605e251eCA107a
Giga_Minter_Contract_Address:0x8280076795E4D88B3c6ae8Ea01C7cc91960d6f99
Escrow_Contract_Address:0x971F945cd5c77F9F3a89b819948dbB47c8Ea6BF6
Giga_Seller_Contract_Address:0xc7b998DA8D11CC093d63d01953bC97c6e3ce7eDa
ART SCRIPT Contract are auto deployed during nft content deployment
```
