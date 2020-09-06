import { YARN_JAR_URL } from "./config.js";
import error from "./error.js";
import parseMappings from "./parseMappings.js";
async function downloadMappings(version, statusCallback) {
    const yarnVersion = version.gameVersion + version.separator + version.build;
    const url = `${YARN_JAR_URL}/${yarnVersion}/yarn-${yarnVersion}-v2.jar`;
    statusCallback(`Requesting ${url}...`);
    const response = await fetch(url);
    if (!response.ok || !response.body) {
        console.error("Failed to download Yarn mappings: ", response);
        error("Failed to download Yarn mappings from " + url);
    }
    statusCallback(`Downloading ${url}...`);
    const jarContent = await response.arrayBuffer();
    statusCallback(`Downloaded ${jarContent.byteLength} bytes. Reading ZIP-file...`);
    const zip = await new JSZip().loadAsync(jarContent);
    const mappingsZipEntry = zip.file("mappings/mappings.tiny");
    if (!mappingsZipEntry) {
        error("Downloaded mappings file is missing mappings.tiny");
    }
    const mappingFileContent = await mappingsZipEntry.async("string");
    const mappings = parseMappings(mappingFileContent);
    console.log('Loaded mappings. Classes: ', mappings.classes.size, 'Methods: ', mappings.methods.size, 'Fields: ', mappings.fields.size);
    return mappings;
}
export default downloadMappings;
