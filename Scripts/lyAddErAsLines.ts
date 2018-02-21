/// <reference path="./curryfun.d.ts"/>
import * as assert from 'assert'
import { ly, p, pfx, cnt, n, s, ay, lin, b } from './curryfun'
import { Er, ErItm } from './sqtp'
const erZipAy = (a:Er) => {
    const getMsg = i => {
        let sfxMsg: s[] = []
        let endMsg: s[] = []
        for (let erItm of a) {
            if (erItm.ix === i) {
                sfxMsg = sfxMsg.concat(erItm.sfxMsg)
                endMsg = endMsg.concat(erItm.endMsg)
            }
        }
        return [sfxMsg, endMsg]
    }
    const leftMsgAy: ly[] = []
    const rightMsgAy: ly[] = []
    for (let i = 0; i < ly.length; i++) {
        let [sfxMsg, endMsg] = getMsg(i)
        let a = [ly[i]].concat(sfxMsg)
        leftMsgAy.push(a)
        rightMsgAy.push(endMsg)
    }
    return [leftMsgAy, rightMsgAy]
}
const left_lyAy_NOT_EVEN = (ly:ly, er:Er) => []
const left_lyAy_MAKE_EVEN = (left_lyAy:ly[], right_lyAy:ly[]) => []

const $right_lyAy = (ly: ly, er: Er) => {
return []
}
const $left_lyAy = (ly: ly, er: Er) => {
return []
}
export const lyAddErAsLines = (ly: ly, er: Er) => {
    const left_lyAy = $left_lyAy(ly, er)
    const right_lyAy = $right_lyAy(ly, er)
    const left_ly = [].concat(left_lyAy)
    const right_ly = [].concat(right_lyAy)
    const o: ly = []
    for (let i = 0; i < left_ly.length; i++) {
        o.push((left_ly[i] + ' ' + right_ly[i]).trim())
    }
    return o
}
const lyAyWdt = (a:ly[]) => {
    const b = x.itrMap(x.itrWdt)(a)
    return x.itrMax(b)
}
const lyAyAlignL = (a:ly[]) => {
    const align = ly => x.itrMap(x.sAlignL(w))(ly)
    const o:ly[]= x.itrMap(align)(a)
    return o
}
const isMain = module.id==='.'
if(isMain) {
    const ly1 = ['012345','0123']
    const ly2 = ['012345','0123','012345678']
    const lyAy = [ly1,ly2]
    const act = lyAyWdt(lyAy)
    assert.strictEqual(act,9)
}