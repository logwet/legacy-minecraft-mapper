import { YARN_VERSION_ENDPOINT } from "../config.js";
import YarnVersions from "./YarnVersions.js";
async function getYarnVersions() {
    const response = await fetch(YARN_VERSION_ENDPOINT);
    if (!response.ok) {
        console.error("Failed to fetch Yarn versions:", response);
        throw new Error("Failed to fetch Yarn versions.");
    }
    const json = await response.json();
    return new YarnVersions(json);
}
export default getYarnVersions;
