
import {UrlBuilderInterface} from "./UrlBuilderInterface";

/**
 * @class DefaultBuilder
 */
export class DefaultBuilder implements UrlBuilderInterface {

    /**
     *
     * @inheritDoc
     */
    buildUrl(rootPath: string, nameResource: string, method: string, id?: string, data?: object): string {

        let url = `${rootPath}/${nameResource}`;
        url =  id ? `${url}/${id}` : url;
        return url;
    }
}