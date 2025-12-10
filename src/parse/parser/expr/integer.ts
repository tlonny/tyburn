import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import { parserUtilEither } from "@src/parse/parser/util/either"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserWord } from "@src/parse/parser/primitive/word"
import { parserUtilPredicate } from "@src/parse/parser/util/predicate"
import { parserUtilMany } from "@src/parse/parser/util/many"
import type { Expr } from "@src/parse/parser/expr/type"
import type { Parser } from "@src/parse/type"
import { parserUtilTry } from "@src/parse/parser/util/try"
import { parserUtilChar } from "@src/parse/parser/util/char"

const parserExprIntegerHexPrefix = parserWord("0x")

const parserExprIntegerCharHexInitial = parserUtilTry(
    parserUtilPredicate(parserUtilChar, {
        name: "INTEGER_HEX_INITIAL",
        test: c => /[0-9A-F]/i.test(c)
    })
)

const parserExprIntegerCharHexFollow = parserUtilTry(
    parserUtilPredicate(parserUtilChar, {
        name: "INTEGER_HEX_FOLLOW",
        test: c => /[0-9A-F_]/i.test(c)
    })
)

const parserExprIntegerDecCharInitial = parserUtilTry(
    parserUtilPredicate(parserUtilChar, {
        name: "INTEGER_DEC_INITIAL",
        test: c => /[0-9]/.test(c)
    })
)

const parserExprIntegerDecCharFollow = parserUtilTry(
    parserUtilPredicate(parserUtilChar, {
        name: "INTEGER_DEC_FOLLOW",
        test: c => /[0-9_]/.test(c)
    })
)

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
