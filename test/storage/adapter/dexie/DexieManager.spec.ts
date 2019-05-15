import 'mocha';
import { expect , should } from 'chai';
import {DexieManager, Store} from "../../../../src/storage/adapter/dexie/index";

describe('DexieManager', () => {

    it('Constructor', () => {

        const dexieManager = new DexieManager('dexie');
        expect(dexieManager).to.instanceOf(DexieManager);
        expect(dexieManager).to.have.property('versionDb');


    });

    it('Stores', () => {

        let listStore = [
            new Store('store1', ['id']),
            new Store('store2', ['id'])
        ];
        const dexieManager = new DexieManager('dexie', listStore);
        expect(dexieManager).to.instanceOf(DexieManager);
        expect(dexieManager.isOpen()).to.equal(false);
    });
});