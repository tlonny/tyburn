import type { ParserStatement } from "@src/parser/ast"
import { parserAtomMany, parserAtomMapValue, parserAtomPredicate, parserAtomSequence, parserAtomCharacter, parserAtomTry, parserText, parserAtomMapError } from "astroparse"

const TERMINATORS = new Set(["\n", "\r", ""])

const parserToken = parserText("#")

export const parserStatementComment = parserAtomMapValue(
    parserAtomSequence([
        parserToken,
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
    ([, comment]) : ParserStatement => ({
        statementType: "COMMENT",
        comment: comment.join(""),
    })
)
