"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDeep = exports.isObject = void 0;
/**
 * Simple is object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}
exports.isObject = isObject;
/**
 * Deep merge two objects.
 * @param target
 * @param source
 */
function mergeDeep(target, source) {
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!target[key])
                    Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        });
    }
    return target;
}
exports.mergeDeep = mergeDeep;
