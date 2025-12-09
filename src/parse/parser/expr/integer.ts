import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import { parserUtilEither } from "@src/parse/parser/util/either"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserWord } from "@src/parse/parser/primitive/word"
import { parserUtilChar } from "@src/parse/parser/util/char"
import { parserUtilMany } from "@src/parse/parser/util/many"
import type { Expr } from "@src/parse/parser/expr/type"
import type { Parser } from "@src/parse/type"

const parserExprIntegerHexPrefix = parserWord("0x")

const parserExprIntegerCharHexInitial = parserUtilChar({
    name: "INTEGER_HEX_INITIAL",
    test: c => /[0-9A-F]/i.test(c)
})

const parserExprIntegerCharHexFollow = parserUtilChar({
    name: "INTEGER_HEX_FOLLOW",
    test: c => /[0-9A-F_]/i.test(c)
})

const parserExprIntegerDecCharInitial = parserUtilChar({
    name: "INTEGER_DEC_INITIAL",
    test: c => /[0-9]/.test(c)
})

const parserExprIntegerDecCharFollow = parserUtilChar({
    name: "INTEGER_DEC_FOLLOW",
    test: c => /[0-9_]/.test(c)
})

const parserExprIntegerHex : Parser<Expr> = parserUtilMap(
    parserUtilSequence([
        parserExprIntegerHexPrefix,
        parserExprIntegerCharHexInitial,
        parserUtilMany(parserExprIntegerCharHexFollow)
    ]),
    ([, x, xs]) => ({
        exprType: "INTEGER",
        base: "HEXADECIMAL",
        value: [x, ...xs].join("")
    })
)

const parserExprIntegerDec : Parser<Expr> = parserUtilMap(
    parserUtilSequence([
        parserExprIntegerDecCharInitial,
        parserUtilMany(parserExprIntegerDecCharFollow)
    ]),
    ([x, xs]) => ({
        exprType: "INTEGER",
        base: "DECIMAL",
        value: [x, ...xs].join("")
    })
)

export const parserExprInteger = parserUtilEither([
    parserExprIntegerHex,
    parserExprIntegerDec,
])
