import { ValueStrategyInteface } from "./ValueStrategyInteface";
import { AbstractHydrator } from "../../AbstractHydrator";
/**
 *
 */
export declare class PathStrategy implements ValueStrategyInteface {
    /**
     * @type {PropertyHydrator}
     * @private
     */
    private _hydrator;
    /**
     * @inheritDoc
     */
    extractValue(data: any): any;
    /**
     * @inheritDoc
     */
    hydrateValue(property: string, data: any): any;
    /**
     * @param {AbstractHydrator} hydrator
     */
    setHydrator(hydrator: AbstractHydrator): void;
    /**
     * @return {AbstractHydrator}
     */
    getHydrator(): AbstractHydrator;
    /**
     * @param file
     * @return {string}
     * @private
     */
    private _getNameFile;
    /**
     * @param file
     * @return {string}
     * @private
     */
    private _getExtensionFile;
}
