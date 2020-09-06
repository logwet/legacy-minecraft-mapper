import error from "./utils/error.js";
import showVersionSelect from "./views/showVersionSelect.js";
window.addEventListener("DOMContentLoaded", () => {
    showVersionSelect().catch(error);
});
