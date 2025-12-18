import type { ParserNodeStatement } from "@src/parser/node"
import { parserToken } from "@src/parser/token"
import { parserAtomMany, parserAtomMapValue, parserAtomPredicate, parserAtomSequence, parserAtomCharacter, parserAtomTry, parserAtomMapError } from "astroparse"

const TERMINATORS = new Set(["\n", "\r", ""])

const parserTokenComment = parserToken("#")

export const parserStatementComment = parserAtomMapValue(
    parserAtomSequence([
        parserTokenComment,
        parserAtomMapError(
            parserAtomMany(
                parserAtomTry(
                    parserAtomPredicate(
                        parserAtomCharacter,
                        (c) => !TERMINATORS.has(c)
                            ? { success: true }
                            : { success: false, error: null }
                    )
                )
            ),
            () => { throw new Error("Unexpected error") }
        )
    ]),
    ([, comment]) : ParserNodeStatement => ({
        nodeType: "STATEMENT_COMMENT",
        comment: comment.join(""),
    })
)
