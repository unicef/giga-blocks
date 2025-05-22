import Head from 'next/head';

const MetaHead = ({ title, description, image }) => {
  return (
    <Head>
      <title>{title} | Giga</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
    </Head>
  );
};

export default MetaHead;