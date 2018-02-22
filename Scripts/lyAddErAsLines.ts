/// <reference path="./curryfun.d.ts"/>
import * as assert from 'assert'
import { ly, p, pfx, cnt, n, s, ay, lin, b } from './curryfun'
import { Er, ErItm } from './sqtp'
import * as x from './curryfun'

const $endMsg = (er: Er, i_ix: n) => {
    let o: s[] = []
    for (let { ix, endMsg } of er) {
        if (i_ix === ix) o = o.concat(endMsg)
    }
    return o
}

const $sfxMsg = (er: Er, i_ix: n) => {
    let o: s[] = []
    for (let { ix, sfxMsg } of er) {
        if (i_ix === ix) o = o.concat(sfxMsg)
    }
    return o
}

const $left_lyAy = (ly: ly, er: Er) => {
    const o: ly[] = []
    for (let i of x.nItr(ly.length)) {
        const m = [ly[i]].concat($endMsg(er, i))
        o.push(m)
    }
    return o
}
const $right_lyAy = (ly: ly, er: Er) => {
    const o: ly[] = []
    for (let i of x.nItr(ly.length)) {
        const m = $sfxMsg(er, i)
        o.push(m)
    }
    return o
}
const sep = ' --- '
const $mge = (left_ly: ly, right_ly: ly) => {
    const llen = left_ly.length
    const rlen = right_ly.length
    const o:ly = []
    const min = x.itrMin([llen,rlen])
    for (let i of x.nItr(min)) {
        const m = left_ly[i] + sep + right_ly[i]
        o.push(m)
    }
    if (llen > rlen) {
        for (let i = rlen; i < llen; i++)
            o.push(left_ly[i].trim())
    } else if(llen < rlen) {
        const s = x.nSpc(left_ly[0].length)
        for (let i = llen; i < rlen; i++)
            o.push(s + sep + right_ly[i])
    }
    return o
}
export const lyAddErAsLy = (ly: ly, er: Er) => {
    const left_lyAy = lyAyAlignL($left_lyAy(ly, er))
    const right_lyAy = $right_lyAy(ly, er)
    let o: ly = []
    for (let i of x.nItr(left_lyAy.length)) {
        let m = $mge(left_lyAy[i], right_lyAy[i])
        o = o.concat(m)
    }
    return o
}
export const lyAddErAsLines = (ly: ly, er: Er) => x.ayJnCrLf(lyAddErAsLy(ly, er))
export const lyAyWdt = (a: ly[]) => {
    const b = x.itrMap(x.itrWdt)(a)
    return x.itrMax(b)
}
export const lyAyAlignL = (a: ly[]) => {
    const w = lyAyWdt(a)
    const align = ly => x.itrMap(x.sAlignL(w))(ly)
    const o: ly[] = x.itrMap(align)(a)
    return o
}
