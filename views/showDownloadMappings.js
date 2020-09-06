import { show, template } from "../utils/mainView.js";
import downloadMappings from "../mapping/downloadMappings.js";
import showMappingView from "./showMappingView.js";
async function showDownloadMappings(version) {
    // Show a loading screen
    const loadingTpl = template('loading-mappings');
    const statusLabel = loadingTpl.querySelector(".status");
    show(loadingTpl);
    const mappings = await downloadMappings(version, status => statusLabel.textContent = status);
    showMappingView(mappings);
}
export default showDownloadMappings;
