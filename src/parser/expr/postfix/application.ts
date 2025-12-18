import type { ParserExpr } from "@src/parser/ast"
import type { ParserError } from "@src/parser/error"
import { parserText, type Parser, parserAtomMapValue, parserAtomSequence, parserAtomTry, parserWhitespace, parserAtomEither, parserAtomValue, parserAtomMany } from "astroparse"

const parserExprPostfixApplicationTokenOpen = parserText("(")
const parserExprPostfixApplicationTokenClose = parserText(")")
const parserExprPostfixApplicationSeparator = parserText(",")

export const parserExprPostfixApplication = (
    parserRoot : Parser<ParserExpr, ParserError>
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
    ([,, xs, ys]) => (expr : ParserExpr) : ParserExpr => ({
        exprType: "APPLICATION",
        arguments: [... xs, ... ys],
        value: expr
    })
)
