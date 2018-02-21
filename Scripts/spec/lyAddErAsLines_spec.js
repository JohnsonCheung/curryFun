"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        debugger;
        const act = y.lyAyAlignL(lyAy);
        const a_ly0 = act[0];
        const a_ly1 = act[1];
        expect(act).toEqual([['012345   ', '0123     '], ['012345   ', '0123     ', '012345678']]);
    });
});
//# sourceMappingURL=lyAddErAsLines_spec.js.map