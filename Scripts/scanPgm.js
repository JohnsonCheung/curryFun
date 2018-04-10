/// <reference path="./typings/node/node.d.ts"/>
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const cf = require("./curryfun.js");
exports.fjs_updFtsMainTstIfStmt = (_fjs) => exports.fts_updMainTstIfStmt(cf.ffnFts(_fjs));
exports.fts_updMainTstIfStmt = (_fts) => {
    // assume: [ module.id | function tst__* ]
    // aim:    [ upd module.id ]
    // assume[module.id]: each fts (*.ts-file), there is a statement of
    //       : if(module.id==='.') {
    //       : ..           <-- {context}
    //       : }
    // assume[function tst__*]: each fts, there are some /^function (tst__[\w$0-0_])\(\)/
    // aim:[upd module.id]: update the {context} by list of tst__xxxx
    const oldLines = cf.ftLines(_fts);
    const newLines = xn_newLines(oldLines);
    if (newLines !== null && newLines !== oldLines) {
        //cf.ffnMakBackup(_fts)
        cf.sWrt(_fts)(newLines);
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
    const tstNy = xn2t_srtedTstFunNy(ly);
    const funLy = xn2f_srtedFunLy(ly);
    const t1 = cf.itrAddPfxSfx('    ', '()')(tstNy);
    const f1 = cf.itrAddPfx('    ')(funLy);
    const n = t1.concat(f1);
    return n.join('\r\n');
};
const xn2tsn_nLvl = (ny) => cf.itrMax(cf.itrMap(y_nm_lvlI)(ny));
const xn2tsli_isLvlINm = (_lvlI) => (_tstFunNm) => {
    const nm = cf.sRmvPfx('tst__')(_tstFunNm);
    const lvlI = y_nm_lvlI(nm);
    const z = lvlI === _lvlI;
    return z;
};
const xn2tsl_lvlINy = (lvlI, ny) => cf.itrWhere(xn2tsli_isLvlINm(lvlI))(ny).sort();
const xn3_part3 = (ly, ix2) => ly.slice(ix2).join('\r\n');
const xn2ts_srtedTstFunNy = (_tstFunNy) => {
    const ny = cf.itrMap(cf.sRmvPfx("tst__"))(_tstFunNy);
    const n0 = xn2tsn_nLvl(ny);
    const n = cf.vDft(0)(n0);
    let o = [];
    for (let lvlI = n; lvlI >= -1; lvlI--) {
        const m = xn2tsl_lvlINy(lvlI, _tstFunNy);
        o = o.concat(m);
    }
    if (_tstFunNy.length !== o.length) {
        debugger;
        cf.er('_ny.length should = o.length', { _tstFunNy, o });
    }
    return o;
};
const xn2t_srtedTstFunNy = (_ly) => {
    const ny = cf.srcCol(/^function (tst__[$a-zA-Z][$_0-9a-zA-Z]*)\(\)/)(_ly);
    return xn2ts_srtedTstFunNy(ny);
};
const xn2f_srtedFunLy = (_srcLy) => {
    const v1 = false;
    if (v1)
        return xn2fn_srtedFunNy(_srcLy);
    return xn2fl_srtedFunLy(_srcLy);
};
const xn2fl_srtedFunLy = (_srcLy) => {
    const funLy = srcLy_funLy(_srcLy);
    const funNy = cf.itrMap(funLin_funNm)(funLy);
    const part2Ay = cf.itrMap(funLin_part2)(funLy);
    const funNy1 = cf.itrAlignL(funNy);
    const lin = i => funNy1[i] + part2Ay[i];
    const ly = cf.itrMap(lin)(cf.nItr(funNy.length));
    return ly.sort(y_funNmCmpr);
};
const xn2fdbf_funNm = (_lin) => {
    const m = _lin.match(cf.reConstNm);
    if (m === null)
        return '';
    return m[1];
};
const xn2fdbr_rmk = (_lin) => {
    const m = _lin.match(/\/\/(.*)$/);
    if (m === null)
        return '';
    return m[1].trim();
};
const xn2fdb_brk = (_lin) => {
    const funNm = xn2fdbf_funNm(_lin);
    const rmk = xn2fdbr_rmk(_lin);
    return [funNm, rmk];
};
const xn2fn_srtedFunNy = (_ly) => {
    const n1 = cf.srcExpConstNy(_ly);
    const n2 = cf.srcConstNy(_ly);
    return n1.concat(n2).sort(y_funNmCmpr);
};
//!y ====================
const y_funNmCmpr = (a, b) => cf.vvCompare(a.replace(/\_/g, ' '), b.replace(/\_/g, ' '));
const y_nm_lvlI = (nm) => {
    const c0 = nm[0];
    if (c0 !== 'x' && c0 !== 'y')
        return -1;
    const ix = nm.indexOf("_");
    if (ix === -1)
        return -1;
    return ix - 1;
};
//!lib ===========
const funLin_funNm = (_funLin) => {
    const m0 = _funLin.match(cf.reExpConstNm);
    if (m0 !== null)
        return m0[1];
    const m1 = _funLin.match(cf.reConstNm);
    if (m1 !== null)
        return m1[1];
    cf.er('Given _funLin is not a function-line', { _funLin });
    return '';
};
const funLin_part2 = (_funLin) => {
    const a0 = cf.sRmvPfx('export ')(_funLin);
    const a1 = cf.sRmvPfx('const ')(a0);
    const a2 = cf.sRmvFstTerm(a1);
    return ' // ' + a2;
};
const srcLy_funLy = (_src) => cf.itrWhere(lin_isFunLin)(_src);
const lin_isFunLin = (_lin) => {
    const z = cf.reConstNm.test(_lin) || cf.reExpConstNm.test(_lin);
    //    if(cf.sHasPfx('const')(_lin)) {
    //        console.log(z,_lin)
    //    }
    return z;
};
//!tst ===========================================================
function tst__srcLy_funLy() {
    t1();
    return;
    function r(exp, ly) {
        const act = srcLy_funLy(ly);
        debugger;
        cf.assertIsEq(exp, act);
    }
    function t1() {
        const exp = new Map();
        const ly = tstRes_ly();
        r(exp, ly);
    }
}
function tst__y_nm_lvlI() {
    t1();
    t2();
    t3();
    t4();
    return;
    function r(exp, nm) {
        const act = y_nm_lvlI(nm);
        cf.assertIsEq(exp, act);
    }
    function t1() {
        let exp = 0;
        r(exp, 'x_1');
        r(exp, 'y_1');
    }
    function t2() {
        let exp = 1;
        r(exp, 'x1_1');
        r(exp, 'y1_1');
    }
    function t3() {
        let exp = -1;
        let nm = 'x1';
        r(exp, 'x1');
        r(exp, 'y1');
    }
    function t4() {
        let exp = 2;
        r(exp, 'x12_1');
        r(exp, 'y12_1');
    }
}
function tst__xn2fl_srtedFunLy() {
    t1();
    function r(exp, srcLy) {
        const act = xn2fl_srtedFunLy(srcLy);
        cf.oBrw(act);
        debugger;
        cf.assertIsEq(exp, act);
    }
    function t1() {
        const srcLy = tstRes_ly();
        const exp = [];
        r(exp, srcLy);
    }
}
function tst__ftsUpdMainTstIfStmt() {
    t1();
    function r(fts) {
        exports.fts_updMainTstIfStmt(fts);
    }
    function t1() {
        const fts = cf.ffnFts(__filename);
        r(fts);
    }
}
function tst__xn_newLines() {
    t1();
    return;
    function r(exp, lines) {
        const act = xn_newLines(lines);
        //cf.assertIsEq(exp, act);
        //cf.sBrwAtFdrFn('compare', 'exp')(exp);
        //cf.sBrwAtFdrFn('compare', 'act')(act ? act : '');
    }
    function t1() {
        const lines = tstRes_lines();
        const exp = '';
        r(exp, lines);
    }
}
function tst__xn2_part2() {
    t1();
    return;
    function r(exp, ly, ix1, ix2) {
        const act = xn2_part2(ly, ix1, ix2);
        cf.assertIsEq(exp, act);
        //cf.oBrw(act)
        //cf.sBrwAtFdrFn('compare', 'exp')(exp)
        //cf.sBrwAtFdrFn('compare', 'act')(act)
    }
    function t1() {
        const ix1 = 52;
        const ix2 = 57;
        const ly = tstRes_ly();
        const e0 = [
            'tst__xn1_part1()',
            'tst__xn3_part3()',
            'tst__x1_ix1()',
            'tst__x2_ix2()',
            'tst__aa()',
            'fts_updMainTstIfStmt',
            'x1_ix1',
            'x1e_eq',
            'x2_ix2',
            'xn1_part1',
            'xn2_part2',
            'xn2n_tstFunNy',
            'xn3_part3',
            'xn_newLines'
        ];
        const exp = cf.itrAddPfx('    ')(e0).join('\r\n');
        r(exp, ly, ix1, ix2);
    }
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
        const ly = tstRes_ly();
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
        const ly = tstRes_ly();
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
        const ly = tstRes_ly();
        r(exp, ly);
    }
}
function tstRes_ly() {
    return cf.ftLy(__dirname + '/scanPgm.tstRes.txt');
}
function tstRes_lines() {
    return cf.ftLines(__dirname + '/scanPgm.tstRes.txt');
}
function tst__xn2ts_srtedTstFunNy() {
    t1();
    function r(exp, ny) {
        const act = xn2ts_srtedTstFunNy(ny);
        cf.assertIsEq(exp, act);
    }
    function t1() {
        const ny = [
            'tst__x_3',
            'tst__x_1',
            'tst__x_2',
            'tst__x_4',
            'tst__xa_3',
            'tst__xa_1',
            'tst__xa_2',
            'tst__xa_4',
            'tst__xab_3',
            'tst__xab_1',
            'tst__xab_2',
            'tst__xab_4',
        ];
        const exp = [
            "tst__xab_1",
            "tst__xab_2",
            "tst__xab_3",
            "tst__xab_4",
            "tst__xa_1",
            "tst__xa_2",
            "tst__xa_3",
            "tst__xa_4",
            "tst__x_1",
            "tst__x_2",
            "tst__x_3",
            "tst__x_4"
        ];
        const act = xn2ts_srtedTstFunNy(ny);
        cf.assertIsEq(exp, act);
    }
}
function tst__xn2t_srtedTstFunNy() {
    t1();
    function r(exp, ly) {
        const act = xn2t_srtedTstFunNy(ly);
        cf.assertIsEq(exp, act);
        //cf.sBrwAtFdrFn('compare', 'exp')(exp.join('\r\n'))
        //cf.sBrwAtFdrFn('compare', 'act')(act.join('\r\n'))
    }
    function t1() {
        const ly = tstRes_ly();
        const exp = [
            "tst__xn1_part1",
            "tst__xn3_part3",
            "tst__x1_ix1",
            "tst__x2_ix2",
            "tst__aa"
        ];
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
        const ly = tstRes_ly();
        r(exp, ly, ix1);
    }
}
function tst__xn2fn_srtedFunNy() {
    t1();
    function r(exp, ly) {
        const act = xn2fn_srtedFunNy(ly);
        //cf.oBrw(ly)
        cf.assertIsEq(exp, act);
    }
    function t1() {
        const exp = [
            "fts_updMainTstIfStmt",
            "x1_ix1",
            "x1e_eq",
            "x2_ix2",
            "xn1_part1",
            "xn2_part2",
            "xn2n_tstFunNy",
            "xn3_part3",
            "xn_newLines"
        ];
        const ly = tstRes_ly();
        r(exp, ly);
    }
}
exports.fjs_updFtsMainTstIfStmt(__filename);
if (module.id === '.') {
    tst__xn2fl_srtedFunLy();
    tst__xn2fn_srtedFunNy();
    tst__xn2ts_srtedTstFunNy();
    tst__xn2t_srtedTstFunNy();
    tst__xn1_part1();
    tst__xn2_part2();
    tst__xn3_part3();
    tst__x1_ix1();
    tst__x2_ix2();
    tst__xn_newLines();
    tst__y_nm_lvlI();
    tst__ftsUpdMainTstIfStmt();
    tst__srcLy_funLy();
    exports.fjs_updFtsMainTstIfStmt; // = (_fjs: fjs): void => fts_updMainTstIfStmt(cf.ffnFts(_fjs))
    exports.fts_updMainTstIfStmt; // = (_fts: fts): void => {
    funLin_funNm; // = (_funLin: lin): nm => {
    funLin_part2; // = (_funLin: lin): s => {
    lin_isFunLin; // = (_lin: lin): b => {
    srcLy_funLy; // = (_src: src): ly => cf.itrWhere(lin_isFunLin)(_src)
    x1_ix1; // = (ly: ly): ix => cf.ayFindIx(x1e_eq)(ly)
    x1e_eq; // = cf.vEQ("if (module.id === '.') {")
    x2_ix2; // = (ly: ly, ix1: ix): ix => {
    xn_newLines; // = (newLines: lines): lines | null => {
    xn1_part1; // = (ly: ly, ix1: n): lines => ly.slice(0, ix1 + 1).join('\r\n')
    xn2_part2; // = (ly: ly, ix1: n, ix2: n): lines => {
    xn2f_srtedFunLy; // = (_srcLy: ly): ly => {
    xn2fdb_brk; // = (_lin: lin): [s, s] => {
    xn2fdbf_funNm; // = (_lin: lin): nm => {
    xn2fdbr_rmk; // = (_lin: lin): s => {
    xn2fl_srtedFunLy; // = (_srcLy: ly): ly => {
    xn2fn_srtedFunNy; // = (_ly: ly): ly => {
    xn2t_srtedTstFunNy; // = (_ly: ly): nm[] => {
    xn2ts_srtedTstFunNy; // = (_tstFunNy: ny): nm[] => {
    xn2tsl_lvlINy; // = (lvlI: n, ny: ny): ny => cf.itrWhere(xn2tsli_isLvlINm(lvlI))(ny).sort()
    xn2tsli_isLvlINm; // = (_lvlI: n) => (_tstFunNm: nm): b => {
    xn2tsn_nLvl; // = (ny: ny) => cf.itrMax(cf.itrMap(y_nm_lvlI)(ny))
    xn3_part3; // = (ly: ly, ix2: n): lines => ly.slice(ix2).join('\r\n')
    y_funNmCmpr; // = (a: s, b: s) => cf.vvCompare(a.replace(/\_/g, ' '), b.replace(/\_/g, ' '))
    y_nm_lvlI; // = (nm: nm) => {
}
//# sourceMappingURL=scanPgm.js.map