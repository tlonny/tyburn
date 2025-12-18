import type { ParserError } from "@src/parser/error"
import type { ParserSymbol } from "@src/parser/ast"
import {
    parserAtomMany,
    parserAtomMapValue,
    parserAtomPredicate,
    parserAtomSequence,
    parserAtomCharacter,
    parserAtomTry,
    parserText,
    type Parser,
    type ParserAtomPredicatePredicateResult
} from "astroparse"

const parserSymbolCharInitial = parserAtomTry(
    parserAtomPredicate(
        parserAtomCharacter,
        (x) : ParserAtomPredicatePredicateResult<ParserError> => /[a-zA-Z_]/.test(x)
            ? { success: true }
            : { success: false, error : { errorType: "TYBURN::SYMBOL_CHARACTER_INVALID" } }
    )
)

const parserSymbolCharFollow = parserAtomTry(
    parserAtomPredicate(
        parserAtomCharacter,
        (x) : ParserAtomPredicatePredicateResult<ParserError> => /[a-zA-Z0-9_]/.test(x)
            ? { success: true }
            : { success: false, error : { errorType: "TYBURN::SYMBOL_CHARACTER_INVALID" } }
    )
)

const parserDelim = parserText("::")

const parserSymbolChunk = parserAtomMapValue(
    parserAtomSequence([
        parserSymbolCharInitial,
        parserAtomMany(parserSymbolCharFollow)
    ]),
    ([x, xs]) => [x, ...xs].join("")
)

export const parserSymbol : Parser<ParserSymbol, ParserError> = parserAtomMapValue(
    parserAtomSequence([
        parserSymbolChunk,
        parserAtomMany(
            parserAtomMapValue(
                parserAtomSequence([
                    parserDelim,
                    parserSymbolChunk
                ]),
                ([x, xs]) => [x, ...xs].join("")
            )
        )
    ]),
    ([x, xs]) : ParserSymbol => {
        const chunks = [x, ...xs]

        return {
            name: chunks[chunks.length - 1] as string,
            path: chunks.slice(0, chunks.length - 2)
        }
    }
)
