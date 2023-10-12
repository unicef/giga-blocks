# Description   
   
Monorepo for GIGA made using pnpm workspaces and added nx for caching.

## Setup and Running

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

Contract Addresses deployed for testing in stage server:
```
NFT_Content_Address:0x33F9559f66d94642D935c3F8db8c693eD8EEb95
School_NFT_Contract_Address:0x8Fc62f472D6D02C2DC483914d1C34E0Ece69c80D
Collector_NFT_Contract_Address:0x0f6ef7B33AcA2210E2E955915c987Ce80B968FE4
Giga_Minter_Contract_Address:0x5685CA5be8d48B12d5Fd19537fe724b8E7111a63
Escrow_Contract_Address:0xf599a47dB901E4f361BFBa078F1888F8cbE7851A
```
