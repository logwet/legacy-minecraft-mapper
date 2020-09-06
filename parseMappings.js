const classRegex = /(class_[0-9$]*)/g;
const CLASS = "c";
const METHOD = "m";
const FIELD = "f";
/**
 * Parses a tiny mapping v2 file
 */
export default function parseMappings(data) {
    const mappings = {
        fullClasses: new Map(),
        classes: new Map(),
        methods: new Map(),
        fields: new Map()
    };
    // iterate over each line in the file by splitting at newline
    for (const line of data.split("\n")) {
        const splitLine = line.trim().split("	"); // remove extra spacing at back and front, split at tab character
        const type = splitLine[0];
        // parse data based on starting line character
        if (type == CLASS && splitLine.length == 3) {
            splitLine[1] = splitLine[1].replace(/\//g, '.');
            splitLine[2] = splitLine[2].replace(/\//g, '.');
            parseClass(splitLine[1], splitLine[2], mappings);
        }
        else if (type == METHOD && splitLine.length == 4) {
            parseMethod(splitLine[1], splitLine[2], splitLine[3], mappings);
        }
        else if (type == FIELD && splitLine.length == 4) {
            parseField(splitLine[1], splitLine[2], splitLine[3], mappings);
        }
    }
    return mappings;
}
/**
 * Parses and stores class information from the given data.
 *
 * @param unmapped  unmapped form of class [net/minecraft/class_1]
 * @param mapped    mapped form of class [net/minecraft/entity/MyEntity]
 * @param mappings  The mappings to append to.
 */
function parseClass(unmapped, mapped, mappings) {
    mappings.fullClasses.set(unmapped, mapped);
    // get short class name
    const shortClassMatch = unmapped.match(classRegex);
    const splitReplacement = mapped.split(".");
    const shortClassReplacement = splitReplacement[splitReplacement.length - 1];
    // ensure there was a match for key
    if (shortClassMatch !== null && shortClassMatch.length > 0) {
        mappings.classes.set(unmapped.match(classRegex)[0], shortClassReplacement);
    }
}
/**
 * Parses and stores method information from the given data.
 *
 * @param params    unmapped method descriptor [(Lnet/minecraft/class_1;)V]
 * @param unmapped  unmapped method name [method_1]
 * @param mapped    mapped method name [myMethod]
 * @param mappings  The mappings to append to.
 */
function parseMethod(params, unmapped, mapped, mappings) {
    mappings.methods.set(unmapped, mapped);
}
/**
 * Parses and stores field information from the given data.
 *
 * @param type      unmapped type as a class descriptor [Lnet/minecraft/class_2941;]
 * @param unmapped  unmapped field name [field_1]
 * @param mapped    mapped field name [myField]
 * @param mappings  The mappings to append to.
 */
function parseField(type, unmapped, mapped, mappings) {
    mappings.fields.set(unmapped, mapped);
}
