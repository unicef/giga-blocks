import * as fs from "fs";
import * as path from "path";

const filePath = path.join(process.cwd(), "apps/api/src/utils/arweave/config/wallet.json");
export const key = JSON.parse(fs.readFileSync(filePath, "utf-8"));
