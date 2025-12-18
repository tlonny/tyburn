import type { ParserExpr } from "@src/parser/ast"
import type { ParserError } from "@src/parser/error"
import { parserToken } from "@src/parser/token"
import { type Parser, parserAtomSequence, parserAtomTry, parserWhitespace, parserAtomMapValue } from "astroparse"

const parserExprInfixMultiplyTokenOperator = parserToken("*")

export const parserExprInfixMultiply = (
    parserNext : Parser<ParserExpr, ParserError>
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
    ([,, x]) => (expr : ParserExpr) : ParserExpr => ({
        exprType: "MULTIPLY",
        operandLeft: expr,
        operandRight: x
    })
)
