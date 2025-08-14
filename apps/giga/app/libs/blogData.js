export const blogPosts = [
  {
    id: '098',
    slug: 'the-art-of-visibility-giga-a-garden-by-cole-sternberg',
    title: 'The Art of Visibility. “Giga: a garden” by Cole Sternberg',
    author: 'Cole Sternberg',
    authorImage: '/images/cole-sternberg.jpg',
    featuredImage: '/images/blog-header.png',
    images: ['/images/blog-left.png', '/images/blog-right.png'],
    content: `
      <div class="custom-wrapper">
        <h2 class="blog-post__section-title">Introducing Cole Sternberg</h2>
        <p class="blog-post__intro">Cole Sternberg is a conceptual artist based in California. His work reflects on the relationship between human ambition, environmental forces, and the passage of time. Through painting, sculpture, installation, performance, photography, film, and writing, Sternberg examines how systems intersect with nature. His art has been exhibited nationally and internationally, and is in the permanent collections of institutions such as  at the Los Angeles County Museum of Art (LACMA), the Pérez Art Museum Miami (PAMM), and the American University Museum.
        </p>

         <p class="blog-post__intro"><a href="/artist/1">Find out more information about Cole</a>.</p>
        <h2 class="blog-post__section-title">Giga: a garden. The Generative Art Layer of Giga Blocks</h2>

        <p class="blog-post__intro">Giga Blocks was developed to create a permanent, decentralized record of the world’s schools, documenting their location, infrastructure, and connectivity status. Each school activated on Giga Blocks is paired with a generative artwork as part of the project known as Giga: a garden.</p>

        <p class="blog-post__intro">Giga: <em>a garden</em> is a long-form generative art series by Cole Sternberg created for Giga. The collection transforms school data into dynamic visual representations. Each image serves as a digital identity for the school, expressing both its physical place and its evolving conditions.</p>

        <p class="blog-post__intro">The visual system balances data precision with an artistic interpretation of global diversity. As schools grow their connectivity and infrastructure, the corresponding artworks can evolve. The images make visible not just that a school exists, but that it participates in an ongoing global effort toward digital inclusion.</p>

        <h2 class="blog-post__section-title">How Each School's Artwork Is Formed</h2>
        <p class="blog-post__intro">The generative artworks are produced using an on-chain p5.js script. The script applies visual parameters according to data inputs specific to each school, including:</p>

      <p class="blog-post__intro">
        <ul style="list-style-type: disc; padding-left: 2rem; line-height: 2; margin-bottom: 1.5rem;">
          <li>School name and type</li>
          <li>Country and region</li>
          <li>Geographic coordinates</li>
          <li>Infrastructure status</li>
          <li>Connectivity indicators</li>
          <li>Selected base images aligned with the school’s region</li>
        </ul>
        </p>

        <p class="blog-post__intro">
        The resulting artwork reflects these conditions. Schools in different locations draw from region-specific image libraries, resulting in visuals that mirror geographic and environmental diversity. Infrastructure and connectivity levels influence compositional elements, embedding aspects of the school's present status into its visual identity.
        </p>

        <p class="blog-post__intro">
        Because the process is deterministic, the same data will always produce the same image. This ensures consistency, reproducibility, and long-term verification. Generated images are also cached to IPFS for faster access while maintaining their foundation on-chain.
        </p>

        <h2 class="blog-post__section-title">A Human Dimension to Infrastructure Data</h2>

        <p class="blog-post__intro">
       The inclusion of Giga: a garden introduces a visual language that humanizes infrastructure data. Each school is more than a dataset. It represents students, teachers, and communities striving to gain access to knowledge and opportunity.
        </p>

         <p class="blog-post__intro">
      By pairing schools with an artistic statement, Giga also reinforces the importance of creative expression in education. While connectivity efforts often prioritize STEM fields, this project highlights the value of integrating the arts. As Cole Sternberg noted: 
        </p>

          <p class="blog-post__intro">
        <em>"By Giga's commitment to pairing the schools with an artistic statement, there is a reminder as to the importance of the creative arts in schools. While connectivity is intrinsically linked to STEM educative elements, there is criticality in also pairing such knowledge and advancement with the creative arts in order to engender positive progression."
        </em>
        </p>

        <p class="blog-post__intro">
      The artworks acknowledge the individuality of each school. They serve as visual affirmations that a school has been made visible within the global network of connected schools. This visibility is not symbolic. It is a concrete step toward resource allocation, policy coordination, and connectivity development.
        </p>

        <h2 class="blog-post__section-title">Permanence and Public Infrastructure</h2>

        <p class="blog-post__intro">
        Both the school data and the generative art system reside on-chain, ensuring permanence even if external applications or platforms change. The art can always be regenerated directly from the core data. This durability supports Giga Blocks’ mission to build open, verifiable, and enduring public infrastructure for school connectivity.
        </p>

        <h2 class="blog-post__section-title">Scale and Scope of a garden</h2>

        <p class="blog-post__intro">
        Giga:<em> a garden </em>represents one of the largest long-form generative art projects to date. The initial launch includes 50,000 generative artworks, each linked to a school within the Giga Blocks platform. As more schools are activated, the collection will grow.
        </p>

        <p class="blog-post__intro">
        This scale reflects not only technical ambition but also the magnitude of the global connectivity challenge. Each artwork is a record that a school exists, has been identified, and is part of a coordinated global effort to expand access to the internet.
        </p>

        <h2 class="blog-post__section-title">The Intersection of Art, Data, and Public Good</h2>

         <p class="blog-post__intro">
         Giga Blocks operates at the intersection of public infrastructure, education, data systems, and generative art. By embedding artistic expression into school activation, the platform offers a dual recognition: technical validation and human acknowledgment.
         </p>  

        <p class="blog-post__intro">
          Giga:<em> a garden</em> transforms school data into a shared visual language. Each image makes the act of visibility tangible. For the creative community, policymakers, funders, and supporters, it demonstrates how systems and art can work together to serve a public mission.
        </p>


        </div>
      `,
  },
  {
    id: '888',
    slug: 'giga-blocks-technical-architecture-deep-dive',
    title: 'Giga Blocks: Technical Architecture Deep Dive ',
    author: 'Gerben Kijne',
    authorImage: '/images/teams/Gerben.png',
    featuredImage: '/images/blog-header.png',
    images: ['/images/blog-left.png', '/images/blog-right.png'],
    content: `
      <div class="custom-wrapper">
        <h2 class="blog-post__section-title">Why Giga Blocks Exists</h2>
        <p class="blog-post__intro">The motivation behind Giga Blocks is durability. In global development, too many school records are lost when websites go offline, projects end, or centralized databases stop receiving funding. For a school to be supported, it must first be seen. Giga Blocks addresses this by anchoring verified school data permanently on-chain. This guarantees visibility that endures beyond any single platform or funding cycle. 
        </p>
          <p class="blog-post__intro">At Giga, we have always worked in the open. Placing school data on-chain is a natural extension of our journey toward full transparency and long-term accessibility. It is also a step forward in building open, decentralized public infrastructure. 
        </p>

        <h2 class="blog-post__section-title">Choosing the Stack: Why Base, Why Ethereum </h2>

        <p class="blog-post__intro">Given the global scale of school data, we needed an efficient, cost-effective blockchain. Layer 2 solutions were the clear direction. We selected Base, an Ethereum L2, for its alignment with the Ethereum ecosystem, its performance, and its roadmap. While Base meets our current requirements, the system is designed with portability in mind. If more appropriate infrastructure emerges, we can adapt.</p>

        <p class="blog-post__intro">Ethereum’s decentralization and community trust make it a strong foundation for systems that must outlast the organizations that build them. Giga Blocks leverages Ethereum’s permanence to ensure school data remains publicly accessible indefinitely. </p>

        <h2 class="blog-post__section-title">Dual Token System: One Registry, Two Audiences </h2>

        <p class="blog-post__intro">TEvery school on Giga Blocks is represented by two ERC-721 tokens: </p>

      <p class="blog-post__intro">
        <ul style="list-style-type: disc; padding-left: 2rem; line-height: 2; margin-bottom: 1.5rem;">
          <li><strong>School NFT:</strong> Held in escrow for school officials, ministries, or authorized education authorities. </li>
          <li><strong>Collector NFT:</strong> Issued to users who activate schools and expand the registry. </li>
        
        </ul>
        </p>

        <p class="blog-post__intro">
        The resulting artwork reflects these conditions. Schools in different locations draw from region-specific image libraries, resulting in visuals that mirror geographic and environmental diversity. Infrastructure and connectivity levels influence compositional elements, embedding aspects of the school's present status into its visual identity.
        </p>

        <p class="blog-post__intro">
         This dual system reflects the two audiences Giga serves: the institutions responsible for schools and the global community that supports digital inclusion. By issuing both tokens, Giga Blocks combines verifiable public records with a community layer of acknowledgment and participation. 
        </p>

        <h2 class="blog-post__section-title">Smart Contract Design </h2>

          <p class="blog-post__intro">Giga Blocks operates on Base, using the following contract architecture: </p>

      <p class="blog-post__intro">
        <ul style="list-style-type: disc; padding-left: 2rem; line-height: 2; margin-bottom: 1.5rem;">
          <li><strong>School NFT Contract:</strong> Manages minting and transfer of School NFTs. </li>
          <li><strong>Collector NFT Contract:</strong> Manages Collector NFTs. </li>
          <li><strong>Script Storage Contract:</strong> Stores the p5.js generative art script permanently. </li>
          <li><strong>Image Storage Contract:</strong> Holds base64-encoded image elements for visual rendering. </li>
          <li><strong>Metadata Management Contracts:</strong> Maintain references and integrity of off-chain data. </li>
        </ul>
        </p>

        <p class="blog-post__intro">
        All contracts are deterministic by design. Any data point or image can be reproduced without external dependencies. 
        </p>

            <h2 class="blog-post__section-title">Metadata and What It Means  </h2>

          <p class="blog-post__intro">Each school’s metadata includes: </p>

      <p class="blog-post__intro">
        <ul style="list-style-type: disc; padding-left: 2rem; line-height: 2; margin-bottom: 1.5rem;">
          <li>schoolName</li>
          <li>schoolType</li>
          <li>country</li>
          <li>region</li>
          <li>longitude</li>
          <li>latitude</li>
          <li>connectivity</li>
          <li>coverage_availability</li>
          <li>electricity_availability</li>
          <li>baseImage1</li>
          <li>baseImage2</li>
        </ul>
        </p>

         <p class="blog-post__intro">
    This metadata powers both the school registry and the visual layer. It is compact, interpretable, and structured for long-term usability. 
        </p>

        <h2 class="blog-post__section-title">Image Generation: Data Meets Design </h2>

        <p class="blog-post__intro">Every activated school is paired with a generative artwork, created using on-chain logic: </p>

      <p class="blog-post__intro">
        <ul style="list-style-type: decimal; padding-left: 2rem; line-height: 2; margin-bottom: 1.5rem;">
          <li>The p5.js script stored in the Script Storage Contract defines how to render each image</li>
          <li>Base image fragments are drawn from the Image Storage Contract.</li>
          <li>Metadata values determine how images are composed.</li>
          <li>A backend retrieves all inputs, executes the rendering, and caches the output to IPFS.</li>
        </ul>
        </p>

         <p class="blog-post__intro">
          Importantly, the artwork is fully reproducible. If IPFS links break, the original image can be regenerated using only the on-chain data.
        </p>

        <h2 class="blog-post__section-title">Storage Strategy: On-Chain First, Distributed Second </h2>

        <p class="blog-post__intro">
        Our original aim was to put everything on-chain. However, the scale and volume of data made this infeasible. As a compromise, we store core data (metadata and scripts) on-chain. Heavier content like real-time data is stored permanently on Arweave. Images are cached to IPFS for speed but not critical to permanence.
        </p>

        <p class="blog-post__intro">
         This design balances cost, durability, and independence. If backend services are interrupted, the system still functions.
        </p>

          <h2 class="blog-post__section-title">Real-Time Connectivity </h2>

          <p class="blog-post__intro">Connectivity status changes. To reflect this, Giga Blocks integrates dynamic throughput data: </p>

        <p class="blog-post__intro">
        <ul style="list-style-type: disc; padding-left: 2rem; line-height: 2; margin-bottom: 1.5rem;">
          <li><strong>Sources:</strong> Giga Meter and external providers such as NIC.br. </li>
          <li><strong>Storage:</strong> Daily connectivity data is written to Arweave. </li>
          <li><strong>Access:</strong> Dashboards and systems query Arweave for updates. </li>
        </ul>
        </p>

         <p class="blog-post__intro">
        This enables ongoing visibility without overwhelming the blockchain layer. 
        </p>

          <h2 class="blog-post__section-title">Tradeoffs and Principles </h2>

        <p class="blog-post__intro">
        We prioritized permanence. That has meant building with more complexity and cost than simpler web architectures. But we believe decentralized systems should be durable by default. Giga Blocks is meant to outlast trends, funding cycles, and individual actors.
        </p>

        <p class="blog-post__intro">
            The architectural choices reflect this: no single point of failure, maximum reproducibility, and full public auditability.
        </p>

        <h2 class="blog-post__section-title">Looking Ahead </h2>

        <p class="blog-post__intro">
         We see Giga Blocks as a foundation. It creates a shared layer of visibility for schools, making it easier for governments, donors, and civil society to coordinate. Over time, it could support new models for funding, verification, or accountability. 
        </p>

        <p class="blog-post__intro">
          Our goal is not to own the ecosystem but to maintain an open layer others can build on. 
        </p>

        <h2 class="blog-post__section-title">Open Source and Developer Access </h2>

        <p class="blog-post__intro">
         We will release the full Giga Blocks codebase, including: 
        </p>
        
          <p class="blog-post__intro">
        <ul style="list-style-type: disc; padding-left: 2rem; line-height: 2; margin-bottom: 1.5rem;">
          <li>Smart contract repositories (PLACEHOLDER) </li>
          <li>Backend orchestration and data pipelines (PLACEHOLDER) </li>
          <li>Image rendering and visualization logic (PLACEHOLDER) </li>
        </ul>
        </p>

         <h2 class="blog-post__section-title">Call to Action </h2>

        <p class="blog-post__intro">
        We invite developers, civic technologists, and public infrastructure builders to explore the system: 
        </p>
        
        <p class="blog-post__intro">
          <ul style="list-style-type: disc; padding-left: 2rem; line-height: 2; margin-bottom: 1.5rem;">
          <li>Use the on-chain data to build new tools </li>
          <li>Help monitor or visualize school connectivity</li>
          <li>Adapt Giga Blocks' model for other public datasets </li>
          <li>Visit <a href="https://blocks.giga.global/">https://blocks.giga.global</a> to activate a school or inspect the live system.</li>
          </ul>
        </p>

         <p class="blog-post__intro">For questions or collaboration inquiries, reach out via <a href="https://giga.global/">https://giga.global.</a>.</p>

        </div>
      `,
  },
  // Add more blog posts here as needed
];

export function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}
