import { PeriodInterface } from "./PeriodInterface";
/**
 * @class GenericPeriod
 */
export declare class GenericPeriod implements PeriodInterface {
    /**
     * @var string
     */
    protected name: string;
    /**
     * @param name
     */
    constructor(name: string);
    /**
     * @return {string}
     */
    getName(): string;
    /**
     * @param name
     * @returns
     */
    setName(name: string): GenericPeriod;
}
