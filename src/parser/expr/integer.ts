import type { ParserNodeExpr } from "@src/parser/node"
import type { ParserError } from "@src/parser/error"
import { parserToken } from "@src/parser/token"
import {
    parserAtomTry,
    parserAtomPredicate,
    parserAtomSequence,
    parserAtomMany,
    parserAtomEither,
    parserAtomCharacter,
    parserAtomMapValue,
    parserAtomMapError
} from "astroparse"

const parserExprIntegerHexPrefix = parserToken("0x")

const parserExprIntegerCharacter = (regex : RegExp) => parserAtomMapError(
    parserAtomTry(
        parserAtomPredicate(
            parserAtomCharacter,
            (c) => regex.test(c)
                ? { success: true }
                : { success: false, error: null }
        )
    ),
    () : ParserError => ({ errorType: "TYBURN::DIGIT_INVALID" })
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
    ([, x, xs]) : ParserNodeExpr => ({
        nodeType: "EXPR_INTEGER",
        base: "HEXADECIMAL",
        value: [x, ...xs].join("")
    })
)

const parserExprIntegerDec = parserAtomMapValue(
    parserAtomSequence([
        parserExprIntegerDecCharInitial,
        parserAtomMany(parserExprIntegerDecCharFollow)
    ]),
    ([x, xs]) : ParserNodeExpr => ({
        nodeType: "EXPR_INTEGER",
        base: "DECIMAL",
        value: [x, ...xs].join("")
    })
)

export const parserExprInteger = parserAtomEither([
    parserExprIntegerHex,
    parserExprIntegerDec,
])
