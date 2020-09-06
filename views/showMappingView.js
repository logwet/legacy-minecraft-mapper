import { show, template } from "../utils/mainView.js";
import mapLog from "../mapping/mapLog.js";
function showMappingView(mappings) {
    const tpl = template('mapping-input');
    const textarea = tpl.querySelector("textarea");
    const button = tpl.querySelector("button");
    const mappingResultLabel = tpl.querySelector(".mapping-result");
    const setMappingInfo = (field, text) => {
        const label = tpl.querySelector(`.mapping-info .${field}`);
        label.textContent = text;
    };
    // Show some stats about the Yarn mappings we're using
    const yarnLink = tpl.querySelector("a.yarn-version");
    yarnLink.setAttribute("href", mappings.url);
    yarnLink.textContent = "Yarn " + mappings.yarnVersion;
    setMappingInfo('classes', mappings.classes.size.toString());
    setMappingInfo('methods', mappings.methods.size.toString());
    setMappingInfo('fields', mappings.fields.size.toString());
    // Clear the status-line if the user changes the input
    const clearStatus = () => {
        mappingResultLabel.textContent = '';
    };
    textarea.addEventListener("keydown", clearStatus);
    textarea.addEventListener("change", clearStatus);
    // Perform the actual remapping
    button.addEventListener("click", () => {
        const { mappedLog, classesMapped, methodsMapped, fieldsMapped } = mapLog(textarea.value, mappings);
        textarea.value = mappedLog;
        mappingResultLabel.textContent = `Mapped! - Classes: ${classesMapped} Methods: ${methodsMapped} Fields: ${fieldsMapped}`;
    });
    show(tpl);
}
export default showMappingView;
