import type { ParserNodeExpr } from "@src/parser/node"
import type { ParserError } from "@src/parser/error"
import { parserToken } from "@src/parser/token"
import { type Parser, parserAtomSequence, parserAtomTry, parserWhitespace, parserAtomMapValue } from "astroparse"

const parserExprPostfixSubscriptTokenOpen = parserToken("[")
const parserExprPostfixSubscriptTokenClose = parserToken("]")

export const parserExprPostfixSubscript = (
    parserRoot : Parser<ParserNodeExpr, ParserError>
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
    ([,, x]) => (expr : ParserNodeExpr) : ParserNodeExpr => ({
        nodeType: "EXPR_SUBSCRIPT",
        index: x,
        value: expr
    })
)
