"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const x = require("./curryfun");
const $endMsg = (er, i_ix) => {
    let o = [];
    for (let { ix, endMsg } of er) {
        if (i_ix === ix)
            o = o.concat(endMsg);
    }
    return o;
};
const $sfxMsg = (er, i_ix) => {
    let o = [];
    for (let { ix, sfxMsg } of er) {
        if (i_ix === ix)
            o = o.concat(sfxMsg);
    }
    return o;
};
const $left_lyAy = (ly, er) => {
    const o = [];
    for (let i of x.nItr(ly.length)) {
        const m = [ly[i]].concat($endMsg(er, i));
        o.push(m);
    }
    return o;
};
const $right_lyAy = (ly, er) => {
    const o = [];
    for (let i of x.nItr(ly.length)) {
        const m = $sfxMsg(er, i);
        o.push(m);
    }
    return o;
};
const sep = ' --- ';
const $mge = (left_ly, right_ly) => {
    const llen = left_ly.length;
    const rlen = right_ly.length;
    const o = [];
    const min = x.itrMin([llen, rlen]);
    for (let i of x.nItr(min)) {
        const m = left_ly[i] + sep + right_ly[i];
        o.push(m);
    }
    if (llen > rlen) {
        for (let i = rlen; i < llen; i++)
            o.push(left_ly[i].trim());
    }
    else if (llen < rlen) {
        const s = x.nSpc(left_ly[0].length);
        for (let i = llen; i < rlen; i++)
            o.push(s + sep + right_ly[i]);
    }
    return o;
};
exports.lyAddErAsLy = (ly, er) => {
    const left_lyAy = exports.lyAyAlignL($left_lyAy(ly, er));
    const right_lyAy = $right_lyAy(ly, er);
    let o = [];
    for (let i of x.nItr(left_lyAy.length)) {
        let m = $mge(left_lyAy[i], right_lyAy[i]);
        o = o.concat(m);
    }
    return o;
};
exports.lyAddErAsLines = (ly, er) => x.ayJnCrLf(exports.lyAddErAsLy(ly, er));
exports.lyAyWdt = (a) => {
    const b = x.itrMap(x.itrWdt)(a);
    return x.itrMax(b);
};
exports.lyAyAlignL = (a) => {
    const w = exports.lyAyWdt(a);
    const align = ly => x.itrMap(x.sAlignL(w))(ly);
    const o = x.itrMap(align)(a);
    return o;
};
//# sourceMappingURL=lyAddErAsLines.js.map