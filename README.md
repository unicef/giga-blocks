# Description

Monorepo for GIGA made using pnpm workspaces and added nx for caching.

## Staging server of Giga

- public site : https://dev.giga.rumsan.net/
- adminApp: https://admin.dev.giga.rumsan.net/dashboard
- backend: https://api.dev.giga.rumsan.net/api/docs

## Setup and Running 

We are using `pnpm` as a package manager so we must install it as a global dependencies:
`npm install -g pnpm@8.14.1`
Since this is monorepo, there is only one package.json in the root directory of the Repository. So we can directly manage all the dependencies in a single `node_modules` folder.
Command to install dependencies:
`pnpm install`

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

Contract Addresses deployed for testing in stage server(Base Sepolia):

```
NEXT_PUBLIC_GIGA_NFT_CONTRACT_ADDRESS=0xB50C8fcFd9eBfc0B88181D962Dc0b2AFD0308A24
NEXT_PUBLIC_GIGA_NFT_CONTENT_ADDRESS=0xD0D2384456E7bd67f13c50d0f0a6F43A7B2C66c0
GIGA_NFT_CONTRACT_ADDRESS=0xB50C8fcFd9eBfc0B88181D962Dc0b2AFD0308A24
NEXT_PUBLIC_GIGA_SCHOOL_ESCROW_ADDRESS=0x627b1cBca8224903Efb0d83Fd6d93897C825efD5
NEXT_PUBLIC_GIGA_COLLECTOR_ESCROW_ADDRESS=0xfF17d7ce3D6a74138b517cfb5453E3fEb10fFF23
GIGA_NFT_CONTENT_ADDRESS =0xD0D2384456E7bd67f13c50d0f0a6F43A7B2C66c0
GIGA_IMAGE_CONTENT_ADDRESS =0xCC52dbCDE637b512C30cDEB6AbB70D0D5Fe7a5af
NEXT_PUBLIC_GIGA_SCHOOL_NFT_ADDRESS =0x1eDA38A3928C45aaf66D748b59Ff0fCE4025E679
NEXT_PUBLIC_GIGA_SELLER_ADDRESS = 0x9B228CC704b72546eEFEB5A78832C4B6774dc365
NEXT_PUBLIC_GIGA_COLLECTOR_NFT_ADDRESS = 0x19f055437F1FC723370036EeFE23526aC20447E3
GIGA_QOS_CONTRACT_ADDRESS = 0x07A47f72D205489EA47731f3de265478fF39DA96 

```
