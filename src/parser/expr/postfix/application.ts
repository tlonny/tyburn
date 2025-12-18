import type { ParserNodeExpr } from "@src/parser/node"
import type { ParserError } from "@src/parser/error"
import { parserToken } from "@src/parser/token"
import { type Parser, parserAtomMapValue, parserAtomSequence, parserAtomTry, parserWhitespace, parserAtomEither, parserAtomValue, parserAtomMany } from "astroparse"

const parserExprPostfixApplicationTokenOpen = parserToken("(")
const parserExprPostfixApplicationTokenClose = parserToken(")")
const parserExprPostfixApplicationSeparator = parserToken(",")

export const parserExprPostfixApplication = (
    parserRoot : Parser<ParserNodeExpr, ParserError>
) => parserAtomMapValue(
    parserAtomSequence([
        parserAtomTry(
            parserAtomSequence([
                parserWhitespace,
                parserExprPostfixApplicationTokenOpen,
            ])
        ),
        parserWhitespace,
        parserAtomEither([
            parserAtomMapValue(parserRoot, x => [x]),
            parserAtomValue([])
        ]),
        parserAtomMany(
            parserAtomMapValue(
                parserAtomSequence([
                    parserAtomTry(
                        parserAtomSequence([
                            parserWhitespace,
                            parserExprPostfixApplicationSeparator
                        ])
                    ),
                    parserWhitespace,
                    parserRoot
                ]),
                ([,, x]) => x
            )
        ),
        parserWhitespace,
        parserExprPostfixApplicationTokenClose
    ]),
    ([,, xs, ys]) => (expr : ParserNodeExpr) : ParserNodeExpr => ({
        nodeType: "EXPR_APPLICATION",
        arguments: [... xs, ... ys],
        value: expr
    })
)
