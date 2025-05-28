import SchoolDetailsClient from './SchoolDetailsClient';

// Separate function to fetch school data for metadata
async function getSchoolDataForMeta(id) {
  try {
    // Replace this with your actual API endpoint
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_D3_BACKEND}/schools/${id}`,
      {
        cache: 'no-store', // or 'force-cache' depending on your needs
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching school data:', error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = params;
  const schoolData = await getSchoolDataForMeta(id);

  if (!schoolData) {
    return {
      title: 'School Not Found | Giga Blocks',
      description: 'The requested school could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const schoolName = schoolData.name || 'School Details';
  const regionName = schoolData.region_name || '';
  const schoolType = schoolData.school_type || '';
  const connectivity = schoolData.connectivity || 'Unknown';
  const countryCode = schoolData.countryCode || '';

  // Create meta description
  const metaDescription = `${schoolName} is ${
    schoolType !== 'Unknown' ? `a ${schoolType}` : ''
  } located in ${regionName}${
    countryCode ? `, ${countryCode}` : ''
  }. View detailed information about facilities, connectivity status, and more.`;

  // Meta image from IPFS or fallback
  const metaImage = schoolData.imageHash
    ? `https://ipfs.io/ipfs/${schoolData.imageHash}`
    : `${process.env.NEXT_PUBLIC_WEB_NAME}/images/giga-logo.png`;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const pageUrl = `${baseUrl}/schools/${id}`;

  return {
    title: `${schoolName} - ${regionName} | Giga Blocks`,
    description: metaDescription.substring(0, 160), // Keep under 160 characters
    keywords: [
      schoolName,
      regionName,
      schoolType,
      'school connectivity',
      'internet access',
      'education',
      'giga',
      'school information',
      countryCode,
      connectivity === 'Connected' ? 'connected school' : 'unconnected school',
    ].filter(Boolean),

    openGraph: {
      title: `${schoolName} - School Details`,
      description: `Learn about ${schoolName}, a ${schoolType} in ${regionName}. Connectivity status: ${connectivity}.`,
      url: pageUrl,
      type: 'article',
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: `${schoolName} - School Image`,
        },
      ],
      locale: 'en_US',
      siteName: 'Giga Blocks',
    },

    twitter: {
      card: 'summary_large_image',
      title: `${schoolName} - ${regionName}`,
      description: `Learn more about ${schoolName}`,
      images: [metaImage],
    },

    alternates: {
      canonical: pageUrl,
    },

    // Custom meta properties for school data
    other: {
      'school:name': schoolName,
      'school:type': schoolType,
      'school:region': regionName,
      'school:connectivity': connectivity,
      'school:country': countryCode,
      'school:id': schoolData.giga_school_id || id,
      'school:minted': schoolData.minted || 'NOT MINTED',
    },

    // Robots meta
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Generate structured data for better SEO
function generateSchoolStructuredData(schoolData, id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: schoolData.name,
    description: `${schoolData.name} is located in ${schoolData.region_name}`,
    url: `${baseUrl}/schools/${id}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: schoolData.region_name,
      addressCountry: schoolData.countryCode,
    },
    geo:
      schoolData.latitude && schoolData.longitude
        ? {
            '@type': 'GeoCoordinates',
            latitude: schoolData.latitude,
            longitude: schoolData.longitude,
          }
        : undefined,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Internet Connectivity',
        value: schoolData.connectivity || 'Unknown',
      },
      {
        '@type': 'PropertyValue',
        name: 'School Type',
        value: schoolData.school_type || 'Unknown',
      },
      {
        '@type': 'PropertyValue',
        name: 'Electricity Available',
        value: schoolData.electricity_available ? 'Yes' : 'No',
      },
    ].filter((prop) => prop.value !== 'Unknown'),
  };
}

// Server Component that passes data to Client Component
export default async function SchoolDetailsPage({ params }) {
  const { id } = params;

  // Fetch school data on the server for structured data
  const schoolData = await getSchoolDataForMeta(id);

  return (
    <>
      {/* Structured Data for SEO - only if we have school data */}
      {schoolData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateSchoolStructuredData(schoolData, id)
            ),
          }}
        />
      )}

      {/* Pass params to the client component */}
      <SchoolDetailsClient params={params} />
    </>
  );
}
