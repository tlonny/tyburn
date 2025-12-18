import type { ParserExpr } from "@src/parser/ast"
import type { ParserError } from "@src/parser/error"
import { parserText, parserAtomTry, parserAtomPredicate, parserAtomSequence, parserAtomMany, parserAtomEither, parserAtomCharacter, type ParserAtomPredicatePredicateResult, parserAtomMapValue } from "astroparse"

const parserExprIntegerHexPrefix = parserText("0x")

const parserExprIntegerCharacter = (regex : RegExp) => parserAtomTry(
    parserAtomPredicate(
        parserAtomCharacter,
        (c) : ParserAtomPredicatePredicateResult<ParserError> => regex.test(c)
            ? { success: true }
            : { success: false, error: { errorType: "TYBURN::DIGIT_CHARACTER_INVALID"} }
    )
)

const parserExprIntegerCharHexInitial = parserExprIntegerCharacter(/[0-9A-F]/i)
const parserExprIntegerCharHexFollow = parserExprIntegerCharacter(/[0-9A-F_]/i)
const parserExprIntegerDecCharInitial = parserExprIntegerCharacter(/[0-9]/)
const parserExprIntegerDecCharFollow = parserExprIntegerCharacter(/[0-9_]/)

const parserExprIntegerHex = parserAtomMapValue(
    parserAtomSequence([
        parserExprIntegerHexPrefix,
        parserExprIntegerCharHexInitial,
        parserAtomMany(parserExprIntegerCharHexFollow)
    ]),
    ([, x, xs]) : ParserExpr => ({
        exprType: "INTEGER",
        base: "HEXADECIMAL",
        value: [x, ...xs].join("")
    })
)

const parserExprIntegerDec = parserAtomMapValue(
    parserAtomSequence([
        parserExprIntegerDecCharInitial,
        parserAtomMany(parserExprIntegerDecCharFollow)
    ]),
    ([x, xs]) : ParserExpr => ({
        exprType: "INTEGER",
        base: "DECIMAL",
        value: [x, ...xs].join("")
    })
)

export const parserExprInteger = parserAtomEither([
    parserExprIntegerHex,
    parserExprIntegerDec,
])
