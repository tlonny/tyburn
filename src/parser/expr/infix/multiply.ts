import type { ParserNodeExpr } from "@src/parser/node"
import type { ParserError } from "@src/parser/error"
import { parserToken } from "@src/parser/token"
import { type Parser, parserAtomSequence, parserAtomTry, parserWhitespace, parserAtomMapValue } from "astroparse"

const parserExprInfixMultiplyTokenOperator = parserToken("*")

export const parserExprInfixMultiply = (
    parserNext : Parser<ParserNodeExpr, ParserError>
) => parserAtomMapValue(
    parserAtomSequence([
        parserAtomTry(
            parserAtomSequence([
                parserWhitespace,
                parserExprInfixMultiplyTokenOperator,
            ])
        ),
        parserWhitespace,
        parserNext
    ]),
    ([,, x]) => (expr : ParserNodeExpr) : ParserNodeExpr => ({
        nodeType: "EXPR_MULTIPLY",
        operandLeft: expr,
        operandRight: x
    })
)
