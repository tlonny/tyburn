import type { ParserExpr } from "@src/parser/ast"
import type { ParserError } from "@src/parser/error"
import { parserText, parserAtomSequence, parserWhitespace, parserAtomMapValue, type Parser } from "astroparse"

const parserExprParensTokenOpen = parserText("(")
const parserExprParensTokenClose = parserText(")")

export const parserExprParens = (
    parserTop : Parser<ParserExpr, ParserError>
) => parserAtomMapValue(
    parserAtomSequence([
        parserExprParensTokenOpen,
        parserWhitespace,
        parserTop,
        parserWhitespace,
        parserExprParensTokenClose
    ]),
    ([,, expr]) => expr
)
