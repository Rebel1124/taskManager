/*Import the required modules, including our user defined fetch module which contains the function which
we will use in our test.*/
const retrieve = require('../fetch.js');
/*We also import the chai module which we will use to test */
const chai = require('chai');
const expect = chai.expect;

//Setup the test function, which is a unit test.
describe('#retrieve(http://localhost:8000/task)', function() {
    it('correctly retrieve api data', function() {
        let expected = console.log('Request Successful');
        let actual = retrieve.retrieve();
        expect(actual).to.equal(expected);
    });
});