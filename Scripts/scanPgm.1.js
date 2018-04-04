//// <reference path="./curryfun.d.ts"/>
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const cf = require("./curryfun.js");
exports.fts_updMainTstIfStmt = (fts) => {
    // assume: [ module.id | function tst__* ]
    // aim:    [ upd module.id ]
    // assume[module.id]: each fts (*.ts-file), there is a statement of
    //       : if(module.id==='.') {
    //       : ..           <-- {context}
    //       : }
    // assume[function tst__*]: each fts, there are some /^function (tst__[\w$0-0_])\(\)/
    // aim:[upd module.id]: update the {context} by list of tst__xxxx
    const oldLines = cf.ftLines(fts);
    const newLines = xn_newLines(oldLines);
    if (newLines !== null && newLines !== oldLines) {
        cf.ffnMakBackup(fts);
        fs.writeFileSync(fts, newLines);
    }
};
const xn_newLines = (newLines) => {
    const ly = cf.sSplitLines(newLines);
    const ix1 = x1_ix1(ly);
    const ix2 = x2_ix2(ly, ix1);
    if (ix1 === null || ix2 === null)
        return null;
    const p1 = xn1_part1(ly, ix1);
    const p2 = xn2_part2(ly, ix1, ix2);
    const p3 = xn3_part3(ly, ix2);
    return p1 + '\r\n' + p2 + '\r\n' + p3;
};
const x1e_eq = cf.vEQ("if (module.id === '.') {");
const x1_ix1 = (ly) => cf.ayFindIx(x1e_eq)(ly);
const x2_ix2 = (ly, ix1) => {
    if (ix1 === null)
        return null;
    for (let ix = ix1 + 1; ix < ly.length; ix++) {
        if (ly[ix] === '}')
            return ix;
    }
    return null;
};
const xn1_part1 = (ly, ix1) => ly.slice(0, ix1 + 1).join('\r\n');
const xn2_part2 = (ly, ix1, ix2) => {
    const ny = xn2n_tstFunNy(ly);
    const n1 = cf.itrAddPfxSfx('    ', '()\r\n')(ny);
    return n1.join();
};
const xn3_part3 = (ly, ix2) => ly.slice(ix2).join('\r\n');
const xn2n_tstFunNy = (_ly) => []; //?
if (module.id === '.') {
    tst__x1_ix1();
    tst__x2_ix2();
    tst__xn1_part1();
    tst__xn3_part3();
}
function tst__xn1_part1() {
    t1();
    return;
    function r(exp, ly, ix1) {
        const act = xn1_part1(ly, ix1);
        cf.assertIsEq(exp, act);
        //cf.sBrwAtFdrFn('compare','exp')(exp)
        //cf.sBrwAtFdrFn('compare','act')(act)
    }
    function t1() {
        const ix1 = 52;
        const ft = cf.ffnFts(__filename);
        const ly = cf.ftLy(ft);
        const exp = ly.slice(0, 53).join('\r\n');
        r(exp, ly, ix1);
    }
}
function tst__xn3_part3() {
    t1();
    return;
    function r(exp, ly, ix2) {
        const act = xn3_part3(ly, ix2);
        cf.assertIsEq(exp, act);
        //cf.sBrwAtFdrFn('compare','exp')(exp)
        //cf.sBrwAtFdrFn('compare','act')(act)
    }
    function t1() {
        const ix2 = 57;
        const ft = cf.ffnFts(__filename);
        const ly = cf.ftLy(ft);
        const exp = ly.slice(ix2).join('\r\n');
        r(exp, ly, ix2);
    }
}
function tst__x1_ix1() {
    t1();
    return;
    function r(exp, ly) {
        const act = x1_ix1(ly);
        cf.assertIsEq(exp, act);
    }
    function t1() {
        const exp = 52;
        const ft = cf.ffnFts(__filename);
        const ly = cf.ftLy(ft);
        r(exp, ly);
    }
}
function tst__x2_ix2() {
    t1();
    return;
    function r(exp, ly, ix1) {
        const act = x2_ix2(ly, ix1);
        cf.assertIsEq(exp, act);
    }
    function t1() {
        const ix1 = 52;
        const exp = 57;
        const ft = cf.ffnFts(__filename);
        const ly = cf.ftLy(ft);
        r(exp, ly, ix1);
    }
}
//# sourceMappingURL=scanPgm.1.js.map