let assert  = require('chai').assert;
let expect  = require('chai').expect;
let should  = require('chai').should;

const Archive = require('../../lib/archive/Archive.js');

describe('Archive', function() {

    it('Construct', function() {
        let archive = new Archive();

        assert.equal(archive.type, undefined);
        assert.isObject(archive.options, 'Options is an object');
        assert.equal(archive.fileDestination, undefined);
    });
});