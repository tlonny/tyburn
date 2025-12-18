import type { ParserExpr } from "@src/parser/ast"
import type { ParserError } from "@src/parser/error"
import { parserToken } from "@src/parser/token"
import { parserAtomSequence, parserWhitespace, parserAtomMapValue, type Parser } from "astroparse"

const parserExprParensTokenOpen = parserToken("(")
const parserExprParensTokenClose = parserToken(")")

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
