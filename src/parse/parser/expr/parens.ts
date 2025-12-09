import type { Expr } from "@src/parse/parser/expr/type"
import type { Parser } from "@src/parse/type"
import { parserWhitespace } from "@src/parse/parser/primitive/whitespace"
import { parserWord } from "@src/parse/parser/primitive/word"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"

const parserExprParensTokenOpen = parserWord("(")
const parserExprParensTokenClose = parserWord(")")

export const parserExprParens = (
    parserTop : Parser<Expr>
) : Parser<Expr> => parserUtilMap(
    parserUtilSequence([
        parserExprParensTokenOpen,
        parserWhitespace,
        parserTop,
        parserWhitespace,
        parserExprParensTokenClose
    ]),
    ([,, expr]) => expr
)
