import 'mocha';
import { expect , should } from 'chai';
import {LocalStorageAdapter} from "../../../../src/storage/adapter/local-storage/LocalStorageAdapter";

describe('LocalStorageAdapter', () => {

    it('Constructor', () => {
        localStorage.setItem('testContructor-Collaction', JSON.stringify([]));
        const localStorageAdapter = new LocalStorageAdapter('testContructor', 'Collaction');
        expect(localStorageAdapter).to.instanceOf(LocalStorageAdapter);
        expect(localStorageAdapter).to.have.property('name');
        expect(localStorageAdapter).to.have.property('nameCollection');
        expect(localStorageAdapter).to.have.property('data');

    });

    it('NameSpace', () => {

        let localStorageAdapter;
        localStorageAdapter = new LocalStorageAdapter('testNamespace', 'Collaction');
        expect(localStorageAdapter.getNamespace()).to.be.a('string');
        expect(localStorageAdapter.getNamespace()).to.equal('testNamespace-Collaction');
    });

    it('Save', () => {

        let data = {'id':1,'test':'test'};
        let localStorageAdapter;
        localStorageAdapter = new LocalStorageAdapter('testSave', 'Collaction');

        expect(localStorageAdapter.save()).to.instanceOf(Promise);
        localStorageAdapter.save(data).then((result) => {
            expect(result).to.equal(data);
        });
    });

    it('Update', () => {

        let data = {'id':1,'test':'test'};
        let localStorageAdapter;
        localStorageAdapter = new LocalStorageAdapter('testUpdate', 'Collaction');

        localStorageAdapter.update(data).then((result) => {
            expect(result).to.equal(data);
        });

        data.test = 'testchange';
        expect(localStorageAdapter.save()).to.instanceOf(Promise);
        localStorageAdapter.update(data).then((result) => {
            expect(result).to.equal(data);
        });
    });


    it('Remove', () => {

        let data = {'id':1,'test':'test'};
        let localStorageAdapter;
        localStorageAdapter = new LocalStorageAdapter('testDelete', 'Collaction');

        localStorageAdapter.remove(data).then((result) => {
            expect(result).to.equal(false);
        });

        localStorageAdapter.save(data);

        localStorageAdapter.remove(data).then((result) => {
            expect(result).to.equal(true);
        });
    });

    it('Get', () => {

        let data = {'id':1,'test':'test'};
        let localStorageAdapter;
        localStorageAdapter = new LocalStorageAdapter('testGet', 'Collaction');

        localStorageAdapter.get(1).then((result) => {
            expect(result).to.equal(null);
        });

        localStorageAdapter.save(data);

        localStorageAdapter.get(1).then((result) => {
            expect(result).to.equal(data);
        });
    });

    it('Get', () => {

        let data = [{'id':1,'test':'test'}, {'id':2,'test':'test'}]
        localStorage.setItem('testContructor-Collaction', JSON.stringify(data));
        let localStorageAdapter;
        localStorageAdapter = new LocalStorageAdapter('testGetAll', 'Collaction');

        localStorageAdapter.getAll().then((result) => {
            expect(result).to.equal(data);
        });
    });


    it('Get', () => {

        let data = [{'id':1,'test':'test'}, {'id':2,'test':'test'}]
        localStorage.setItem('testContructor-Collaction', JSON.stringify(data));
        let localStorageAdapter;
        localStorageAdapter = new LocalStorageAdapter('testGetAll', 'Collaction');

        localStorageAdapter.getPaged(1, 1, {}).catch((result) => {
            expect(result).to.equal('To implement');
        });
    });

});