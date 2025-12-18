import type { ParserExpr } from "@src/parser/ast"
import type { ParserError } from "@src/parser/error"
import { parserText, type Parser, parserAtomSequence, parserAtomTry, parserWhitespace, parserAtomMapValue } from "astroparse"

const parserExprPostfixSubscriptTokenOpen = parserText("[")
const parserExprPostfixSubscriptTokenClose = parserText("]")

export const parserExprPostfixSubscript = (
    parserRoot : Parser<ParserExpr, ParserError>
) => parserAtomMapValue(
    parserAtomSequence([
        parserAtomTry(
            parserAtomSequence([
                parserWhitespace,
                parserExprPostfixSubscriptTokenOpen,
            ])
        ),
        parserWhitespace,
        parserRoot,
        parserWhitespace,
        parserExprPostfixSubscriptTokenClose
    ]),
    ([,, x]) => (expr : ParserExpr) : ParserExpr => ({
        exprType: "SUBSCRIPT",
        index: x,
        value: expr
    })
)
