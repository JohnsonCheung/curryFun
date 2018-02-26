"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const x = require("../../../Scripts/curryfun");
describe('sdryLines', function () {
    it('should pass', function () {
        const sdry = [['lskdfj', '12345678901'], ['123456789', 'dkfj']];
        let act;
        act = x.sdryColWdt(0)(sdry);
        expect(act).toEqual(9);
        act = x.sdryColWdt(1)(sdry);
        expect(act).toEqual(11);
        act = x.sdryColWdtAy(sdry);
        expect(act).toEqual([9, 11]);
        //        act = x.sdryLines(sdry)
        //        x.sBrw(act)
    });
});
describe('drsLines', function () {
    it('should pass', function () {
        const fny = x.sSplitSpc('aa bb');
        const dry = [[1233, '12345678901'], ['123456789', 'dkfj'], [new Date(), true, 1]];
        const drs = { a: 1, dry, fny };
        const act = x.drsLines(drs);
        x.sBrw(act);
    });
});
//# sourceMappingURL=dta_spec.js.map