import error from "./error.js";
/**
 * Retrieve a template from the document.
 */
export function template(id) {
    const el = document.getElementById(id);
    if (el instanceof HTMLTemplateElement) {
        return el.content.cloneNode(true);
    }
    error(`Template ${id} not found`);
}
/**
 * Show the given document fragment as the main view.
 */
export function show(tpl) {
    let container = document.getElementById("main");
    if (!container) {
        error("Failed to find main container");
    }
    container.innerHTML = '';
    container.appendChild(tpl);
}
