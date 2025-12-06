import type { Expr } from "@src/parse/parser/expr/type"
import { parserWord } from "@src/parse/parser/primitive/word"
import type { Parser } from "@src/parse/type"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import { parserWhitespace } from "@src/parse/parser/primitive/whitespace"

const parserExprPrefixNotToken = parserWord("!")

export const parserExprNot : Parser<(expr : Expr) => Expr> = parserUtilMap(
    parserUtilSequence(
        parserExprPrefixNotToken,
        parserWhitespace
    ),
    () => (expr) => ({
        exprType: "NOT",
        value: expr
    })
)
