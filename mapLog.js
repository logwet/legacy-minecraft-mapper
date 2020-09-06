const fullClassRegex = /(net.minecraft.class_[0-9$]*)/g; // used for finding full class statements in game code
const shortMethodRegex = /(method_[1-9])\d*/g;
const fieldRegex = /(field_[1-9])\d*/g;
const classRegex = /(class_[0-9$]*)/g;
/**
 * Maps the given intermediary log or text with the given version's mappings.
 * If the given version has no mappings for it, undefined is returned.
 *
 * @param log      log or intermediary code to map to yarn
 * @param mappings The parsed Tiny mappings file.
 */
export default function mapLog(log, mappings) {
    let classesMapped = 0;
    let methodsMapped = 0;
    let fieldsMapped = 0;
    // replace full classes (net.minecraft.class_xyz)
    const fullClassMatches = log.match(fullClassRegex);
    if (fullClassMatches !== null) {
        fullClassMatches.forEach(match => {
            const replacement = mappings.fullClasses.get(match);
            if (replacement !== undefined) {
                log = log.replace(match, replacement);
                classesMapped++;
            }
        });
    }
    // replace short methods (method_xyz)
    const methodMatches = log.match(shortMethodRegex);
    if (methodMatches !== null) {
        methodMatches.forEach(match => {
            const replacement = mappings.methods.get(match);
            if (replacement !== undefined) {
                log = log.replace(match, replacement);
                methodsMapped++;
            }
        });
    }
    // replace short classes (class_xyz)
    const classMatches = log.match(classRegex);
    if (classMatches !== null) {
        classMatches.forEach(match => {
            const replacement = mappings.classes.get(match);
            if (replacement !== undefined) {
                log = log.replace(match, replacement);
                classesMapped++;
            }
        });
    }
    // replace short fields
    const fieldMatches = log.match(fieldRegex);
    if (fieldMatches !== null) {
        fieldMatches.forEach(match => {
            const replacement = mappings.fields.get(match);
            if (replacement !== undefined) {
                log = log.replace(match, replacement);
                fieldsMapped++;
            }
        });
    }
    return {
        mappedLog: log,
        classesMapped,
        fieldsMapped,
        methodsMapped
    };
}
