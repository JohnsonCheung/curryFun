"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const x = require("./curryfun");
const erZipAy = (a) => {
    const getMsg = i => {
        let sfxMsg = [];
        let endMsg = [];
        for (let erItm of a) {
            if (erItm.ix === i) {
                sfxMsg = sfxMsg.concat(erItm.sfxMsg);
                endMsg = endMsg.concat(erItm.endMsg);
            }
        }
        return [sfxMsg, endMsg];
    };
    const leftMsgAy = [];
    const rightMsgAy = [];
    for (let i = 0; i < ly.length; i++) {
        let [sfxMsg, endMsg] = getMsg(i);
        let a = [ly[i]].concat(sfxMsg);
        leftMsgAy.push(a);
        rightMsgAy.push(endMsg);
    }
    return [leftMsgAy, rightMsgAy];
};
const left_lyAy_NOT_EVEN = (ly, er) => [];
const left_lyAy_MAKE_EVEN = (left_lyAy, right_lyAy) => [];
const $right_lyAy = (ly, er) => {
    return [];
};
const $left_lyAy = (ly, er) => {
    return [];
};
exports.lyAddErAsLines = (ly, er) => {
    const left_lyAy = $left_lyAy(ly, er);
    const right_lyAy = $right_lyAy(ly, er);
    const left_ly = [].concat(left_lyAy);
    const right_ly = [].concat(right_lyAy);
    const o = [];
    for (let i = 0; i < left_ly.length; i++) {
        o.push((left_ly[i] + ' ' + right_ly[i]).trim());
    }
    return o;
};
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