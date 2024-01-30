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

NFT_Content_Address:0xD9B16A3AD0e3382077D0576D08559505b8Ed4d83
School_NFT_Contract_Address:0xbF055Ca10Fe493C8B83F7CE6C88c235618E2dB9C
Collector_NFT_Contract_Address:0xE408c6e9c074F680bb5C1E7EAE069a4d2E53Bd64
Giga_Minter_Contract_Address:0xA052f9B6072f6A980345b8a14A68ae33fdF72777
Escrow_Contract_Address:0x7C7F77242041CD8a49ea486b7F4f4ACe1903cAbf
Giga_Seller_Contract_Address:0xDEcA31876B66249368bb8A787D7642E2507750d2
ART SCRIPT Contract are auto deployed during nft content deployment
```
