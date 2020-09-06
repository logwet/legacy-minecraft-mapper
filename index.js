import getYarnVersions from "./getYarnVersions.js";
import error from "./error.js";
import downloadMappings from "./downloadMappings.js";
import mapLog from "./mapLog.js";
let mainContainer;
/**
 * Retrieve a template from the document.
 */
function template(id) {
    const el = document.getElementById(id);
    if (el instanceof HTMLTemplateElement) {
        return el.content.cloneNode(true);
    }
    error(`Template ${id} not found`);
}
/**
 * Show the given document fragment as the main view.
 */
function show(tpl) {
    mainContainer.innerHTML = '';
    mainContainer.appendChild(tpl);
}
function showMappingInput(version, mappings) {
    const tpl = template('mapping-input');
    const textarea = tpl.querySelector("textarea");
    const button = tpl.querySelector("button");
    button.addEventListener("click", () => {
        const { mappedLog, classesMapped, methodsMapped, fieldsMapped } = mapLog(textarea.value, mappings);
        alert(`Mapped!\n\nClasses: ${classesMapped}\nMethods: ${methodsMapped}\nFields: ${fieldsMapped}`);
        textarea.value = mappedLog;
    });
    show(tpl);
}
async function showDownloadPage(version) {
    // Show a loading screen
    const loadingTpl = template('loading-mappings');
    const statusLabel = loadingTpl.querySelector(".status");
    show(loadingTpl);
    const mappings = await downloadMappings(version, status => statusLabel.textContent = status);
    showMappingInput(version, mappings);
}
function showVersionSelect(yarnVersions) {
    const tpl = template('version-select');
    const select = tpl.querySelector("select");
    for (let gameVersion of yarnVersions.gameVersions) {
        const opt = document.createElement("option");
        opt.text = gameVersion.version;
        select.options.add(opt);
    }
    tpl.querySelector("button").addEventListener("click", () => {
        var _a;
        const selectedGameVersion = (_a = select.selectedOptions.item(0)) === null || _a === void 0 ? void 0 : _a.value;
        if (selectedGameVersion) {
            const yarnVersion = yarnVersions.getYarnForGameVersion(selectedGameVersion);
            showDownloadPage(yarnVersion).catch(error);
        }
    });
    show(tpl);
}
async function init() {
    showVersionSelect(await getYarnVersions());
}
window.addEventListener("DOMContentLoaded", () => {
    let container = document.getElementById("main");
    if (!container) {
        error("Failed to find main container");
    }
    mainContainer = container;
    init().catch(error);
});
