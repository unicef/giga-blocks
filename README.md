# Description 

Monorepo for GIGA made using pnpm workspaces and added nx for caching.

## Staging server of Giga 
- public site : https://dev.giga.rumsan.net/
- adminApp: https://admin.dev.giga.rumsan.net/dashboard
- backend: https://api.dev.giga.rumsan.net/api/docs

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

NFT_Content_Address:0x8062e38a0051820e53B74B7f946260852be62B04
School_NFT_Contract_Address:0xa404c99947391EADD22b82133174F6dc7da75Bcd
Collector_NFT_Contract_Address:0x4239E657FEDD95e0836Cd4667E1B5bDc4Cf9C6a5
Giga_Minter_Contract_Address:0x5E2016e9fb8AF9feA34c61916F975a1dB2475a44       
Escrow_Contract_Address:0x5b4088b76797859d8d168b35F347cDa3120ed518
Giga_Seller_Contract_Address:0x32308109F16Cf57BB7817BE3a578cd8938d74372
ART SCRIPT Contract are auto deployed during nft content deployment
```
