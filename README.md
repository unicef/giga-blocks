<div style="padding-left: 20px; padding-right: 10px;">
<a href="https://giga.global/">
    <img src="https://s41713.pcdn.co/wp-content/uploads/2018/11/2020.05_GIGA-visual-identity-guidelines_v1-25.png" alt="Giga logo" title="Giga" align="right" height="60" style="padding-top: 20px;"/>
</a>

<div style="padding-top: 20px;" > </div>
<h1><a id="about-giga" class="anchor" aria-hidden="true" href="#about-giga"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"></path></svg></a>
GigaBlocks </h1> 

<div align="center" >

<!--- These are examples. See https://shields.io for others or to customize this set of shields. You might want to include dependencies, project status and licence info here --->
![GitHub repo size](https://img.shields.io/github/repo-size/unicef/giga-blocks)
![GitHub stars](https://img.shields.io/github/stars/unicef/giga-blocks)
![Twitter Follow](https://img.shields.io/twitter/follow/gigaglobal)
![License](https://img.shields.io/github/license/unicef/giga-blocks)


</div>

<details open="open">
	<summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-giga">About Giga</a>
	  </li>
    <li><a href="#about-gigablocks">About GigaBlocks</a>
    <ul>
        <li><a href="#project-objective">Project Objective</a></li>
        <li><a href="#flow-diagram">Giga System flow Diagram</a></li>
        <li><a href="#giga-blocks-repos">Github Repositories of GigaBlocks</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
      </li>
    <li><a href="#usage">Usage</a></li>
	<li>
      <a href="#getting-started">Getting Started</a>
    </li>
	<li><a href="#file-structure">File Structure</a></li>
    <li><a href="#contribution-guidelines">Contribution Guidelines</a></li>
    <li><a href="#code-design">Code Design</a></li>
    <li><a href="#code-of-conduct">Code of Conduct</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<h2><a id="about-giga" class="anchor" aria-hidden="true" href="#about-giga"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"></path></svg></a>
About Giga</h2>

Giga is a UNICEF-ITU global initiative to connect every school to the Internet and every young person to information, opportunity, and choice. By connecting all schools to the Internet, we ensure that every child has a fair shot at success in an increasingly digital world.

<h2><a id="about-gigablocks" class="anchor" aria-hidden="true" href="#about-gigablocks"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"></path></svg></a>
About GigaBlocks</h2>

GigaBlocks is the world’s largest decentralized database of schools. 

The GigaBlocks project represents a transformative approach to harnessing the collective power of the global community to crowd-source data collection, validation and data updating for schools and in the process creating the largest decentralized school database using NFTs. 

  

GigaBlocks aims to solve this problem by crowdsourcing the collection and curation of this missing data and creating a comprehensive database of school information, comparable to a Wikipedia page for each school. By enabling the community surrounding each school to curate and update the data on the NFTs, GigaBlocks hopes to gather accurate and up-to-date information on schools around the world. This will allow Giga to map the need for connectivity more granularly and will help Giga to more effectively connect schools to the internet and provide digital access to young people. Simultaneously, GigaBlocks will create a way for anyone to contribute data to schools, validate and update this data, and become a Giga Supporter.

<h3><a id="project-objective" class="anchor" aria-hidden="true" href="#project-objective"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"></path></svg></a>
Project Objective</h3>

- To use the data that's collected to help accelerate connectivity
- To create a "digital passport" for every school in the world, using NFTs
- To create a crowdsourcing mechanism for collecting missing school data
- To engage the public and local communities in Giga countries in the cause of connecting schools to the internet

<h3><a id="flow-diagram" class="anchor" aria-hidden="true" href="#flow-diagram"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"></path></svg></a>
Giga System flow Diagram </h3>

<img src="http://giga.global/wp-content/uploads/2024/07/giga-blocks-backend-flow-diagram.png" alt="Giga blocks flow" title="Gigablocksflowdiag" style="padding-left: 20px; padding-right: 10px;" />
<p></p>
Giga School DataBase platform consists of 3 applications: Giga Admin, Giga Public and Giga Backend. Backend provides api service for both public and admin sites. Public sites are used by the general public. Giga Admin will be used by the admins selected by Giga. Giga Backend uses Prisma service with Next.js. Redis is used for the queueing process. There will be two databases i.e Giga database and NewsLetter database. Giga database consists of all school data and contributed data and users registered in Giga as contributor or admin. Newsletter database is designed to store the records of the user who wants to join the developer community.  
<p></p>
Public site and Giga Admin site is designed using Nest.js frameWork. React- Carbon UI is used for UI design in public sites whereas Material UI is used for UI design in admin sites. 
<p></p>
Hosted Subgraph service is used for caching the blockchain transactions and data. Admin and Public site will query blockchain related data from subgraph. 
<p></p>
SmartContracts are deployed in Polygon MainNet. 

<h3><a id="giga-blocks-repos" class="anchor" aria-hidden="true" href="#giga-blocks-repos"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"></path></svg></a>
Github Repositories of GigaBlocks </h3>

- [GigaBlocks](https://github.com/unicef/giga-blocks)
- [GigaBlocks - subgraph](#)
- [GigaBlocks - contracts](#)
- [GigaBlocks – documentation](#)

<h3><a id="built-with" class="anchor" aria-hidden="true" href="#built-with"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"></path></svg></a>
Built With </h3>
 
<b>Our Tech Stacks</b>  

- Database: PostgreSQL 

- UI:CSS/Javascript with Carbon UI framework,CSS/Javascript with Carbon UI framework, React.js, Ethers.js, NextJs 

- Programming Language: JavaScript, Typescript 

- Server: NestJs 

- Third Party Services: Subgraph 

- Wallet: Metamask 

- Blockchain: EVM, Infura, Solidity 

<h2><a id="usage" class="anchor" aria-hidden="true" href="#usage"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"></path></svg></a>
Usage</h2>

<h2><a id="getting-started" class="anchor" aria-hidden="true" href="#getting-started"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"></path></svg></a>
Getting Started</h2>

### System Requirements:
- OS: Linux/Unix, Windows with WSL
- Node Version 18.x

### Setup and Running
We are using pnpm as a package manager so we must install it as a global dependency:
```bash
npm install -g pnpm
```
Since this is a monorepo, there is only one package.json in the root directory of the Repository. So we can directly manage all the dependencies in a single node_modules folder. Command to install dependencies:    
```bash
pnpm install
```

Installing packages in root of repo
```bash
pnpm i
```

Make sure postgresql and redis-server are running. Copy .env.example to .env. And Make prisma migrations first:
```bash
pnpm run api:prisma:migrate
```
For running specific apps
```bash
npx nx <command(serve)> <app name>
```
For adding packages
```bash
pnpm add <package name> -w
```
For running build or lint or test for all apps at once
```bash
pnpm run build/test/lint/serve
```
If you want to add new libraries in libs, then simply add library and initialize it inside the library directory with:
```bash
pnpm init
```
And add it to pnpm package using:
```bash
pnpm add ./libs/<library name> -w
```
For running nx for specific apps or library you can write following syntax:
```bash
npx nx <command(build,lint,test,serve)> <apps/libs name>
```
Contract Addresses deployed for testing in stage server(Ethereum Sepolia):
```bash
NFT_Content_Address:0x8062e38a0051820e53B74B7f946260852be62B04
School_NFT_Contract_Address:0xa404c99947391EADD22b82133174F6dc7da75Bcd
Collector_NFT_Contract_Address:0x4239E657FEDD95e0836Cd4667E1B5bDc4Cf9C6a5
Giga_Minter_Contract_Address:0x5E2016e9fb8AF9feA34c61916F975a1dB2475a44       
Escrow_Contract_Address:0x5b4088b76797859d8d168b35F347cDa3120ed518
Giga_Seller_Contract_Address:0x32308109F16Cf57BB7817BE3a578cd8938d74372
ART SCRIPT Contract are auto deployed during nft content deployment
```

<h2><a id="file-structure" class="anchor" aria-hidden="true" href="#file-structure"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"></path></svg></a>
File Structure</h2>

```
giga-blocks/
|- .github/
    |- ISSUE_TEMPLATE/
        |- bug_report.md
        |- custom.md
        |- feature_request.md
|- packages/
    |- client/
        |- src/
            |- components/
            |- pages/
            |- styles/
            |- utils/
            |- .eslintrc.json
            |- .gitignore
            |- .npmrc
            |- babel.config.js
            |- package.json
            |- tsconfig.json
            |- yarn.lock
        |- .gitignore
        |- .npmrc
        |- package.json
        |- README.md
        |- tsconfig.json
        |- yarn.lock
    |- common/
        |- src/
            |- constants/
            |- hooks/
            |- utils/
            |- .eslintrc.json
            |- .gitignore
            |- .npmrc
            |- package.json
            |- tsconfig.json
            |- yarn.lock
        |- .gitignore
        |- .npmrc
        |- package.json
        |- README.md
        |- tsconfig.json
        |- yarn.lock
    |- contracts/
        |- src/
            |- .eslintrc.json
            |- .gitignore
            |- .npmrc
            |- hardhat.config.ts
            |- package.json
            |- tsconfig.json
            |- yarn.lock
        |- .gitignore
        |- .npmrc
        |- package.json
        |- README.md
        |- tsconfig.json
        |- yarn.lock
    |- server/
        |- src/
            |- .eslintrc.json
            |- .gitignore
            |- .npmrc
            |- babel.config.js
            |- jest.config.js
            |- package.json
            |- tsconfig.json
            |- yarn.lock
        |- .gitignore
        |- .npmrc
        |- package.json
        |- README.md
        |- tsconfig.json
        |- yarn.lock
|- .eslintrc.json
|- .gitignore
|- .npmrc
|- package.json
|- README.md
|- tsconfig.json
|- yarn.lock
```

<h2><a id="contribution-guidelines" class="anchor" aria-hidden="true" href="#contribution-guidelines"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"></path></svg></a>
Contribution Guidelines</h2>

Thank you for considering contributing to Giga Blocks! We value your input and aim to make the contribution process as accessible and transparent as possible. Whether you're interested in reporting bugs, discussing code, submitting fixes, proposing features, becoming a maintainer, or engaging with the Giga Blocks community, we welcome your involvement. 

  

[Click here for detailed Contribution Guidelines](https://github.com/unicef/giga-blocks-documentation/blob/main/versioned_docs/version-1.0/Contribution-Guidelines.md) 

<h2><a id="code-design" class="anchor" aria-hidden="true" href="#code-design"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"></path></svg></a>
Code Design</h2>

### Monorepo Structure 

The project employs a monorepo structure using pnpm workspaces and nx for efficient management and caching. This structure allows multiple packages to coexist in a single repository, promoting code reuse and simplifying dependency management. 

  

### Project Organization 

1. Apps: Contains main applications (e.g., public site, admin dashboard, backend API). 

2. Libs: Shared libraries used across different applications. 

3. Config Files: Includes various configuration files for Docker, environment settings, and package management. 

### Key Technologies 

- pnpm: A performant package manager, ensuring efficient dependency handling. 

- nx: A powerful build system providing advanced features like computation caching and distributed task execution. 

- Docker: Containerization for consistent development and deployment environments. 

- PostgreSQL and Redis: Essential services for database and caching. 

- Prisma: An ORM for type-safe database interaction. 

### Deployment and Testing 

The repository includes scripts for deploying smart contracts on Ethereum's Sepolia testnet, facilitating NFT content deployment and management. The deployment addresses are included for reference and testing. 

  

### Development Workflow 

1. Installing Dependencies: pnpm install 

2. Running Migrations: pnpm run api:prisma:migrate 

3. Running Applications: npx nx serve <app-name> 

4. Building and Testing: pnpm run build/test/lint/serve 


### Adding Packages 

To add new packages or libraries, use the following commands: 

  

- Global Package Addition: pnpm add <package-name> -w 

- Library Initialization: pnpm init within the library directory 

- Library Addition: pnpm add ./libs/<library-name> -w 


<h2><a id="code-of-conduct" class="anchor" aria-hidden="true" href="#code-of-conduct"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"></path></svg></a>
Code of Conduct</h2>

At Giga Blocks, we're committed to maintaining an environment that's respectful, inclusive, and harassment-free for everyone involved in our project and community. We welcome contributors and participants from diverse backgrounds and pledge to uphold the standards. 

  

[Click here for detailed Code of Conduct](https://github.com/unicef/giga-blocks-documentation/blob/main/versioned_docs/version-1.0/Code-of-Conduct.md) 

<h2><a id="license" class="anchor" aria-hidden="true" href="#license"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"></path></svg></a>
License</h2>

Distributed under the AGPL-3.0 License. See [LICENSE](https://github.com/unicef/giga-blocks-documentation/blob/main/LICENSE) for more information. 

<h2><a id="contact" class="anchor" aria-hidden="true" href="#contact"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"></path></svg></a>
Contact</h2>

Blockchain Team Lead: Gerben Kijne: gkijne@unicef.com 

Blockchain Team Member: Vladimir Trkulja: vtrkulja@unicef.com 

Giga Website: https://giga.global/contact-us/ 

## Acknowledgments
* Thanks to Rusman for helping build this application!

</div>
