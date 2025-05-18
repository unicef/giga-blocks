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

Contract Addresses deployed for testing in stage server(Ethereum Sepolia):

```
NEXT_PUBLIC_GIGA_NFT_CONTRACT_ADDRESS=0x805cAac9E2225dF995D34A8461e97Ede23b22FD8
NEXT_PUBLIC_GIGA_NFT_CONTENT_ADDRESS=0x31b7a7c018DDb988e35A2721f6F2771AdbC23bAF
GIGA_NFT_CONTRACT_ADDRESS=0x805cAac9E2225dF995D34A8461e97Ede23b22FD8
NEXT_PUBLIC_GIGA_SCHOOL_ESCROW_ADDRESS=0xA09AF9c843Af32B56C197F51801AD815EfA50a20
NEXT_PUBLIC_GIGA_COLLECTOR_ESCROW_ADDRESS=0x7eF928d34A5bC67Da50bc7d9570De691e0668cbA
GIGA_NFT_CONTENT_ADDRESS =0x31b7a7c018DDb988e35A2721f6F2771AdbC23bAF
GIGA_IMAGE_CONTENT_ADDRESS =0x38923bc75BD976A8Af2Eb7B49d271143F9362c55
NEXT_PUBLIC_GIGA_SCHOOL_NFT_ADDRESS =0xd3C4e2C69a23AD118a25Cfff3155B66eE66F0B9f
NEXT_PUBLIC_GIGA_SELLER_ADDRESS = 0xd9494EA88A1F1dF3b5931AaB17Ef9daf16edE203
NEXT_PUBLIC_GIGA_COLLECTOR_NFT_ADDRESS = 0x77379E699887aC0b84B06ac77A4944fa91237dbF
GIGA_QOS_CONTRACT_ADDRESS = 0x7eF928d34A5bC67Da50bc7d9570De691e0668cbA 
```
