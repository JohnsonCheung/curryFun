/// <reference path="../../node_modules/@types/jasime.d.ts"/>
/// <reference path="../../Scripts/curryfun.ts"/>
import * as x from '../curryfun'
import * as y from '../sqtp'

describe('linT2PosWdt', function () {
    it('should pass', function () {
        const lin = 'aaa  bb'
        const act = y.linT2PosWdt(lin)
        expect(act).toEqual({ pos: 5, wdt: 2 })
    })
})

describe('linT2MarkerLine', function () {
    it('should pass', function () {
        const lin = 'aaa  bb'
        const act = y.linT2MarkerLin(lin,'aa')
        expect(act).toEqual('-----^^ aa')
    })
})

describe('sqtp -- pm03 -- bkPm --', function () {
    it('this block is err - should pass', function () {
        const sqtp =
            '%?BrkMbr 0\n' +
            '?BrkMbr 0\n' +
            '%?BrkMbr 0\n' +
            '??BrkSto 0\n'
        const { vtp, sql } = y.sqtprslt({ sqtp })
        x.sBrw(vtp + '\n***\nsqtp' + sqtp)
        debugger
    })
    it('pfx err - should pass', function () {
        const sqtp =
            '%?BrkMbr 0\n' +
            '%?BrkXX 0\n' +
            '%BrkMbr 0\n' +
            '#?BrkMbr 0\n' +
            '??BrkSto 0\n'
        const { vtp, sql } = y.sqtprslt({ sqtp })
        const exp =
            '%?BrkMbr 0\r\n' +
            '%?BrkXX 0\r\n' +
            '%BrkMbr 0\r\n' +
            '#?BrkMbr 0\r\n' +
            '^---- prefix must be (%)\r\n' +
            '??BrkSto 0\r\n' +
            '^---- prefix must be (%)'
        expect(vtp).toEqual(exp)
    })
    it('prmSwErr - should pass', function () {
        const sqtp =
            '%?BrkDiv  XX\n' +
            '%SumLvl  Y\n' +
            '%?MbrEmail 1'
        const { vtp, sql } = y.sqtprslt({ sqtp })
        //x.sBrw(vtp + '\n***\n' + sqtp)
        const exp = 
            '%?BrkDiv  XX\r\n' +
            '----------^^ must be 0 or 1 for prefix is [%?]\r\n' +
            '%SumLvl  Y\r\n' +
            '%?MbrEmail 1'
        const rslt = vtp === exp
        expect(rslt).toBeTruthy()
    })
})

describe('SwEr --', function () {
    fit('should pass', function () { 
        const sqtp =
            '?#SEL#aa 1\n' +
            '?#UPD#bb OR 1\n' +
            '?AA AND 1'
        const { vtp, sql } = y.sqtprslt({ sqtp })
        //x.sBrw(vtp + '\n***\n' + sqtp)
        const exp = 
            '%?BrkDiv  XX\r\n' +
            '----------^^ must be 0 or 1 for prefix is [%?]\r\n' +
            '%SumLvl  Y\r\n' +
            '%?MbrEmail 1'
        const rslt = vtp === exp
        debugger
        expect(rslt).toBeTruthy()
    })
})

describe('sqtprslt --', function () {
    it('should pass', function () {
        //=====================================================
        const sqtp = x.ftLines('./sample.sqtp.txt')
        const { vtp, sql } = y.sqtprslt(sqtp)
        x.sBrw(vtp)
        debugger
        expect(true).toBe(true)
        debugger
        //    x.dryCol(1)([[1, 2], [2, 3]])
    })
})
