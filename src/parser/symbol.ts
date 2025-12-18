import type { ParserError } from "@src/parser/error"
import type { ParserNodeSymbol } from "@src/parser/node"
import {
    parserAtomMany,
    parserAtomMapValue,
    parserAtomPredicate,
    parserAtomSequence,
    parserAtomCharacter,
    parserAtomTry,
    type Parser,
    parserAtomMapError,
} from "astroparse"

import { parserToken } from "@src/parser/token"

const parserSymbolCharInitial = parserAtomTry(
    parserAtomPredicate(
        parserAtomCharacter,
        (x) => /[a-zA-Z_]/.test(x)
            ? { success: true }
            : { success: false, error : null }
    )
)

const parserSymbolCharFollow = parserAtomTry(
    parserAtomPredicate(
        parserAtomCharacter,
        (x) => /[a-zA-Z0-9_]/.test(x)
            ? { success: true }
            : { success: false, error : null }
    )
)

const parserDelim = parserToken("::")

const parserSymbolChunk = parserAtomMapValue(
    parserAtomSequence([
        parserSymbolCharInitial,
        parserAtomMany(parserSymbolCharFollow)
    ]),
    ([x, xs]) => [x, ...xs].join("")
)

export const parserSymbol : Parser<ParserNodeSymbol, ParserError> = parserAtomMapError(
    parserAtomMapValue(
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
        ([x, xs]) : ParserNodeSymbol => {
            const chunks = [x, ...xs]

            return {
                nodeType: "SYMBOL",
                name: chunks[chunks.length - 1] as string,
                path: chunks.slice(0, chunks.length - 2)
            }
        }
    ),
    () : ParserError => ({ errorType: "TYBURN::SYMBOL_INVALID" })
)
