import { UrlBuilderInterface } from "./UrlBuilderInterface";
/**
 * @class DefaultBuilder
 */
export declare class DefaultBuilder implements UrlBuilderInterface {
    /**
     *
     * @inheritDoc
     */
    buildUrl(rootPath: string, nameResource: string, method: string, id?: string, data?: object): string;
}
