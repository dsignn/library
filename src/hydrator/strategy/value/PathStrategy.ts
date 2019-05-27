import {ValueStrategyInteface} from "./ValueStrategyInteface";
import {PropertyHydrator} from "../../PropertyHydrator";
import {AbstractHydrator} from "../../AbstractHydrator";
import {Path} from "../../../path/Path";

/**
 *
 */
export class PathStrategy implements ValueStrategyInteface {

    /**
     * @type {PropertyHydrator}
     * @private
     */
    private _hydrator: AbstractHydrator = new PropertyHydrator(new Path());

    /**
     * @inheritDoc
     */
    extractValue(data: any) {
        return this._hydrator.extract(data);
    }

    /**
     * @inheritDoc
     */
    hydrateValue(property: string, data: any) {
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
            case data !== null && Array.isArray(data) !== true &&typeof data === 'object':

                computeData = this._hydrator.hydrate(data);
                break;
        }

        return computeData;
    }

    /**
     * @param {AbstractHydrator} hydrator
     */
    public setHydrator(hydrator: AbstractHydrator) {
        this._hydrator = hydrator;
    }

    /**
     * @return {AbstractHydrator}
     */
    public getHydrator() {
        return this._hydrator;
    }

    /**
     * @param file
     * @return {string}
     * @private
     */
    private _getNameFile(file) {
        let fullName = file.substring(file.lastIndexOf('/')+1);
        return fullName.replace(`.${this._getExtensionFile(file)}`, '');
    }

    /**
     * @param file
     * @return {string}
     * @private
     */
    private _getExtensionFile(file) {
        let re = /(?:\.([^.]+))?$/;
        return re.exec(file)[1] ? re.exec(file)[1] : null;
    }
}
