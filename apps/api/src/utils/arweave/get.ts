import { arweave } from "./config/arweaveNetwork";

export const getFileData = async (hash: string) => {
    const fileData = await arweave.transactions.getData(hash, {
        decode: true,
        string: true,
    });

    return JSON.parse(fileData as string);  
};
