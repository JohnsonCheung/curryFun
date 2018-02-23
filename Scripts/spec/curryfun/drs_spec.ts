/// <reference path="../../../node_modules/@types/jasime.d.ts"/>
import * as x from '../../../Scripts/curryfun'
describe("drs", function () {
    const dry = [[1, 2, 3], [1], [23, 3, 4, 5]]
    var curryfun = require('../../scripts/curryfun.js');
    describe("sdryColCnt", function () {
        it("should be 3 columns", function () {
            expect(x.dryColCnt(dry)).toEqual(4);
        });
    });
    describe("sdryCol", function () {
        it("should pass", function () {
            expect(x.dryCol(0)(dry)).toEqual([1,1,23]);
            expect(x.dryCol(1)(dry)).toEqual([2, undefined, 3]);
            expect(x.dryCol(2)(dry)).toEqual([3, undefined, 4]);
            expect(x.dryCol(3)(dry)).toEqual([undefined, undefined, 5]);
            expect(x.dryCol(4)(dry)).toEqual([undefined, undefined, undefined]);
        });
    });
    describe("sdryLy", function () {
        it("should pass", function () {
            debugger
            let act = x.sdryLy(dry)
            debugger
            expect(act).toEqual(['','']);
        });
    });
});
//# sourceMappingURL=drsSpec.js.map