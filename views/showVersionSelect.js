import { show, template } from "../utils/mainView.js";
import showDownloadMappings from "./showDownloadMappings.js";
import error from "../utils/error.js";
import getYarnVersions from "../yarn/getYarnVersions.js";
async function showVersionSelect() {
    const yarnVersions = await getYarnVersions();
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
            showDownloadMappings(yarnVersion).catch(error);
        }
    });
    show(tpl);
}
export default showVersionSelect;
