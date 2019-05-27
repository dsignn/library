import { PropertyHydrator } from "../../PropertyHydrator";
import { Path } from "../../../path/Path";
/**
 *
 */
export class PathStrategy {
    constructor() {
        /**
         * @type {PropertyHydrator}
         * @private
         */
        this._hydrator = new PropertyHydrator(new Path());
    }
    /**
     * @inheritDoc
     */
    extractValue(data) {
        return this._hydrator.extract(data);
    }
    /**
     * @inheritDoc
     */
    hydrateValue(property, data) {
        let hydrate = [];
        let computeData = data;
        switch (true) {
            case typeof data === 'string':
                computeData = new Path();
                let nameFile = data.replace(/^.*[\\\/]/, '');
                computeData.setNameFile(this._getNameFile(nameFile));
                computeData.setExtension(this._getExtensionFile(nameFile));
                computeData.setDirectory(data.replace(nameFile, ''));
                break;
            case data !== null && Array.isArray(data) !== true && typeof data === 'object':
                computeData = this._hydrator.hydrate(data);
                break;
        }
        return computeData;
    }
    /**
     * @param {AbstractHydrator} hydrator
     */
    setHydrator(hydrator) {
        this._hydrator = hydrator;
    }
    /**
     * @return {AbstractHydrator}
     */
    getHydrator() {
        return this._hydrator;
    }
    /**
     * @param file
     * @return {string}
     * @private
     */
    _getNameFile(file) {
        let fullName = file.substring(file.lastIndexOf('/') + 1);
        return fullName.replace(`.${this._getExtensionFile(file)}`, '');
    }
    /**
     * @param file
     * @return {string}
     * @private
     */
    _getExtensionFile(file) {
        let re = /(?:\.([^.]+))?$/;
        return re.exec(file)[1] ? re.exec(file)[1] : null;
    }
}
//# sourceMappingURL=PathStrategy.js.map