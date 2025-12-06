import type { Expr } from "@src/parse/parser/expr/type"
import { parserWord } from "@src/parse/parser/primitive/word"
import type { Parser } from "@src/parse/type"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import { parserWhitespace } from "@src/parse/parser/primitive/whitespace"

const parserExprPrefixReferenceToken = parserWord("&")

export const parserExprReference : Parser<(expr : Expr) => Expr> = parserUtilMap(
    parserUtilSequence(
        parserExprPrefixReferenceToken,
        parserWhitespace
    ),
    () => (expr) => ({
        exprType: "REFERENCE",
        value: expr
    })
)
