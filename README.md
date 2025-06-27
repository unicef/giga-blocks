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
GIGA_QOS_CONTRACT_ADDRESS=0x67D736c360Ff6484b25f24b4a957C01480A38410
NEXT_PUBLIC_GIGA_NFT_CONTRACT_ADDRESS=0x9ad96BfeeE831314268B3a2bEae3E32D326ad18C
NEXT_PUBLIC_GIGA_NFT_CONTENT_ADDRESS=0xdA361bAC147759b5F16800032Bf0EcCB552987b3
GIGA_NFT_CONTRACT_ADDRESS=0x9ad96BfeeE831314268B3a2bEae3E32D326ad18C
NEXT_PUBLIC_GIGA_SCHOOL_ESCROW_ADDRESS=0xc044647E18E7924b6E341b36c1209fEBeF97363f
NEXT_PUBLIC_GIGA_COLLECTOR_ESCROW_ADDRESS=0x19Cdb75739779507600680Cc3CfdB45530aCE408
GIGA_NFT_CONTENT_ADDRESS=0xdA361bAC147759b5F16800032Bf0EcCB552987b3
GIGA_IMAGE_CONTENT_ADDRESS=0xCC52dbCDE637b512C30cDEB6AbB70D0D5Fe7a5af
NEXT_PUBLIC_GIGA_SCHOOL_NFT_ADDRESS=0xE896205f92bD3373165474b9347dCfCdc9141fdD
NEXT_PUBLIC_GIGA_SELLER_ADDRESS=0xd9494EA88A1F1dF3b5931AaB17Ef9daf16edE203
NEXT_PUBLIC_GIGA_COLLECTOR_NFT_ADDRESS=0xCf25F9dc248Ca417464D6182936da918f1047E7E

```
