import {ValueStrategyInteface} from "./ValueStrategyInteface";
import {HydratorAwareInterface} from "../../HydratorAwareInterface";
import {HydratorAware} from "../../HydratorAware";
import {HydratorInteface} from "../../HydratorInteface";

/**
 *
 */
export class HydratorStrategy extends HydratorAware implements ValueStrategyInteface, HydratorAwareInterface {

    /**
     * @param {HydratorInteface} hydrator
     */
    constructor(hydrator? : HydratorInteface) {
        super();

        this.hydrator = hydrator;
    }

    /**
     * @inheritDoc
     */
    extractValue(data: any) {
        let extract = [];
        if (Array.isArray(data)) {
            for (let cont = 0; data.length > cont; cont++) {
                extract[cont] = this.getHydrator().extract(data[cont]);
            }
        } else {
            extract = this.getHydrator().extract(data);
        }

        return extract;
    }

    /**
     * @inheritDoc
     */
    hydrateValue(property: string, data: any) {
        let hydrate = [];

        if (Array.isArray(data)) {
            for (let cont = 0; data.length > cont; cont++) {
                hydrate[cont] = this.getHydrator().hydrate(data[cont]);
            }
        } else {
            hydrate = this.getHydrator().hydrate(data);
        }

        return hydrate;
    }
}
