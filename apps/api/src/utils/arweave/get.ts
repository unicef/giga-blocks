import * as fs from "fs";
import { arweave } from "./config/arweaveNetwork";

export const getFileData = async (hash: string) => {
    const fileData = await arweave.transactions.getData(hash, {
        decode: true, 
        string: false,
    });

    return typeof fileData != "string" && new TextDecoder().decode(fileData);  
};
