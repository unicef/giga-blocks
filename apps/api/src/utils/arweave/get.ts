import { arweave } from "./config/arweaveNetwork";

export const getFileData = async (hash: string) => {
    if (!hash) {
        throw new Error("Hash is required to fetch file data from Arweave.");
    }
    const fileData = await arweave.transactions.getData(hash, {
        decode: true,
        string: true,
    });

    return JSON.parse(fileData as string);  
};
