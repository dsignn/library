import {ValueStrategyInteface} from "./ValueStrategyInteface"
/**
 *
 */
export class MongoIdStrategy implements ValueStrategyInteface {


    /**
     * @inheritDoc
     */
    extractValue(data: any) {

        let extract = data;
        switch (true)  {
            case  typeof data === 'string':
                extract = new (require('mongodb').ObjectID)(data);
                break;
        }

        return extract;
    }

    /**
     * @inheritDoc
     */
    hydrateValue(property: string, data: any) {

        let hydrate = data;
        switch (true) {
            case data instanceof require('mongodb').ObjectID === true:
                hydrate = data.toString();
                break;
        }

        return hydrate;
    }
}
