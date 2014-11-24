/* jshint -W117, -W109, -W030 */
//http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-karma.html
//https://github.com/yearofmoo-articles/AngularJS-Testing-Article
describe('Server: controllers and routes', function() {
    var tester;

    beforeEach(function() {
        tester = ngMidwayTester('midwayTesterApp', {mockLocationPaths: false});
    });
    afterEach(function () {
        if (tester) { tester.destroy(); }
    });

    it('should load the Avengers controller properly when /avengers route is accessed', function(done) {
        tester.visit('/avengers', function() {
            expect(tester.path()).to.equal('/avengers');
            var current = tester.inject('$route').current;
            var controller = current.controller;
            var scope = current.scope;
            expect(controller).to.equal('Avengers');
            done();
        });
    });

    it('should load the Dashboard controller properly when / route is accessed', function(done) {
        tester.visit('/', function() {
            expect(tester.path()).to.equal('/');
            var current = tester.inject('$route').current;
            var controller = current.controller;
            var scope = current.scope;
            expect(controller).to.equal('Dashboard');
            done();
        });
    });

});