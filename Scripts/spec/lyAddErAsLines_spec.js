"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const x = require("../curryfun");
const y = require("../lyAddErAsLines");
describe('lyAyWdt', function () {
    it('should pass', function () {
        const ly1 = ['012345', '0123'];
        const ly2 = ['012345', '0123', '012345678'];
        const lyAy = [ly1, ly2];
        const act = y.lyAyWdt(lyAy);
        expect(act).toBe(9);
    });
});
describe('lyAyAlignL', function () {
    it('should pass', function () {
        const ly0 = ['012345', '0123'];
        const ly1 = ['012345', '0123', '012345678'];
        const lyAy = [ly0, ly1];
        const act = y.lyAyAlignL(lyAy);
        const a_ly0 = act[0];
        const a_ly1 = act[1];
        expect(act).toEqual([['012345   ', '0123     '], ['012345   ', '0123     ', '012345678']]);
    });
});
describe('lyAddErAsLines', function () {
    it('should pass', function () {
        const er = [
            { ix: 1, endMsg: ['--^'], sfxMsg: [] },
            { ix: 2, endMsg: ['--^xxx'], sfxMsg: ['---', '---'] },
            { ix: 2, endMsg: ['---'], sfxMsg: [] }
        ];
        const ly = ['line1', 'line2', 'line3'];
        const act = y.lyAddErAsLines(ly, er);
        x.sBrw(x.ayJnCrLf(act));
        debugger;
    });
});
//# sourceMappingURL=lyAddErAsLines_spec.js.map