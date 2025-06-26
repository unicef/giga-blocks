// src/index.ts

import * as dotenv from 'dotenv';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Load environment variables from .env file
dotenv.config();

// --- Configuration Validation ---
const SUBGRAPH_URL: string | undefined = process.env.NEXT_PUBLIC_GRAPH_URL;
const API_ENDPOINT: string | undefined = process.env.NEXT_PUBLIC_D3_BACKEND;
const token: string | undefined = process.env.ACCESS_TOKEN_SECRET_KEY;

if (!SUBGRAPH_URL) {
  console.error('Critical Error: SUBGRAPH_URL is not defined in the .env file. Exiting.');
  process.exit(1); // Exit with a non-zero code to indicate an error
}

if (!API_ENDPOINT) {
  console.error('Critical Error: API_ENDPOINT is not defined in the .env file. Exiting.');
  process.exit(1); // Exit with a non-zero code to indicate an error
}

// --- Type Definitions ---
interface NftData {
  schoolId: string;
  tokenId: string;
  // Add other fields if they become relevant later
}

interface SubgraphGraphQLRequest {
  query: string;
  variables?: Record<string, any>; // For queries with variables, if needed later
}

interface SubgraphGraphQLResponse {
  data: {
    nftDatas: NftData[];
    // Other potential fields from the subgraph
  };
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
    extensions?: Record<string, any>;
  }>;
}

// --- Centralized Axios Instance ---
const axiosInstance: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// --- Centralized Error Handling Function ---
function handleError(
  context: string,
  error: unknown,
  schoolId?: string, // Optional parameter for context
): void {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError; // Type assertion for AxiosError
    let errorMessage = `${context} failed: ${axiosError.message}`;
    if (schoolId) {
      errorMessage += ` for schoolId: ${schoolId}`;
    }
    console.error(errorMessage);

    if (axiosError.response) {
      console.error('  Response Status:', axiosError.response.status);
      console.error('  Response Data:', axiosError.response.data);
    } else if (axiosError.request) {
      console.error('  No response received. Request details:', axiosError.request);
    } else {
      console.error('  Error details:', axiosError.config);
    }
  } else if (error instanceof Error) {
    let errorMessage = `${context} failed with an unexpected error: ${error.message}`;
    if (schoolId) {
      errorMessage += ` for schoolId: ${schoolId}`;
    }
    console.error(errorMessage);
    console.error('  Error stack:', error.stack);
  } else {
    let errorMessage = `${context} failed with an unknown error type.`;
    if (schoolId) {
      errorMessage += ` for schoolId: ${schoolId}`;
    }
    console.error(errorMessage, error);
  }
}

// --- Subgraph Data Fetching ---
async function fetchNftDataFromSubgraph(): Promise<NftData[] | null> {
  const query = `
        query MyQuery {
            nftDatas(where: { imageHash: null}) {
                schoolId
                tokenId
            }
        }
    `;

  try {
    console.log(`[Subgraph] Attempting to fetch data from: ${SUBGRAPH_URL}`);
    const response: AxiosResponse<SubgraphGraphQLResponse> = await axiosInstance.post(
      SUBGRAPH_URL!,
      { query },
    );

    // Check for GraphQL errors reported within the data payload
    if (response.data.errors && response.data.errors.length > 0) {
      console.error('[Subgraph] GraphQL errors encountered:');
      response.data.errors.forEach(err => {
        console.error(`  - Message: ${err.message}`);
        if (err.locations) console.error(`    Locations: ${JSON.stringify(err.locations)}`);
        if (err.path) console.error(`    Path: ${err.path.join('.')}`);
      });
      return null;
    }

    if (response.data && response.data.data && response.data.data.nftDatas) {
      console.log(`[Subgraph] Successfully fetched ${response.data.data.nftDatas.length} records.`);
      return response.data.data.nftDatas;
    } else {
      console.error('[Subgraph] Unexpected response structure from Subgraph:', response.data);
      return null;
    }
  } catch (error) {
    handleError('Subgraph data fetch', error);
    return null;
  }
}

// --- API Call Function ---
async function callApiWithSchoolId(schoolId: string): Promise<any | null> {
  const payload = { schoolId }; // Shorthand for { schoolId: schoolId }

  try {
    console.log({token})
    const endPoint = `${API_ENDPOINT}/schools/syncSchool/${schoolId}`;
    const response: AxiosResponse<any> = await axiosInstance.patch(endPoint!, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFhNGU5MGE2LWQwYjQtNDY4MC1iOTYyLTg3MTJlNzRkZWQyYyIsInN1YiI6eyJlbWFpbCI6ImdpZ2ExQG1haWxpbmF0b3IuY29tIiwibmFtZSI6IkdpZ2EgMSIsIndhbGxldEFkZHJlc3MiOiIweGFkODM2OTczOGFmMGU4MGQzYTA0OWU0YjA1MTg1M2ZjZjgxZTVkYTkiLCJyb2xlcyI6WyJBRE1JTiJdfSwiaWF0IjoxNzUwODQ1MTM2LCJleHAiOjE3NTA5MzUxMzZ9.5ooORRX5F0FdVjOzzN_MfNtALyKs7s3Nt-vigW1KjEk`,
      },
    });
    console.log(`[API Call] Success for schoolId ${schoolId}. Response Status: ${response.status}`);
    // console.debug(`[API Call] Full response data for schoolId ${schoolId}:`, response.data); // Use console.debug for verbose output
    return response.data;
  } catch (error) {
    handleError('API call', error, schoolId);
    return null;
  }
}

// --- Main Execution Logic ---
async function main(): Promise<void> {
  console.log(
    `Script started at ${new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kathmandu' })}`,
  );
  console.log('--------------------------------------------------');

  const nftDatas = await fetchNftDataFromSubgraph();

  if (!nftDatas) {
    console.error('Script aborted due to failure in fetching NFT data from Subgraph.');
    return;
  }

  if (nftDatas.length === 0) {
    console.log('No NFT data found with null imageHash. No API calls to make.');
    return;
  }

  console.log(`Processing ${nftDatas.length} NFT data entries...`);
  let successfulCalls = 0;
  let failedCalls = 0;

  // Process calls sequentially. For high volume, consider Promise.allSettled for concurrency.
  for (const nftData of nftDatas) {
    const schoolId = nftData.schoolId;
    if (schoolId) {
      console.log(`[Processing] NFT Data for schoolId: ${schoolId}, tokenId: ${nftData.tokenId}`);
      const apiResult = await callApiWithSchoolId(schoolId);
      if (apiResult) {
        successfulCalls++;
      } else {
        failedCalls++;
      }
    } else {
      console.warn(`[Data Warning] Skipping entry due to missing 'schoolId':`, nftData);
    }
  }

  console.log('--------------------------------------------------');
  console.log('Processing Complete.');
  console.log(`Total NFT data entries processed: ${nftDatas.length}`);
  console.log(`Successful API calls: ${successfulCalls}`);
  console.log(`Failed API calls: ${failedCalls}`);
  console.log(
    `Script finished at ${new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kathmandu' })}`,
  );
}

// Execute the main function
main().catch(error => {
  // Catch any unhandled promise rejections from main()
  console.error('An unhandled error occurred in the main execution flow:', error);
  process.exit(1);
});
