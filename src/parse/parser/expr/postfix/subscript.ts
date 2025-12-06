import type { Expr } from "@src/parse/parser/expr/type"
import { parserWhitespace } from "@src/parse/parser/primitive/whitespace"
import { parserWord } from "@src/parse/parser/primitive/word"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import { parserUtilTry } from "@src/parse/parser/util/try"
import type { Parser } from "@src/parse/type"

const parserExprPostfixSubscriptTokenOpen = parserWord("[")
const parserExprPostfixSubscriptTokenClose = parserWord("]")

export const parserExprPostfixSubscript = (
    parserRoot : Parser<Expr>
) : Parser<(expr : Expr) => Expr> => parserUtilMap(
    parserUtilSequence(
        parserUtilTry(
            parserUtilSequence(
                parserWhitespace,
                parserExprPostfixSubscriptTokenOpen,
            )
        ),
        parserUtilMap(
            parserUtilSequence(
                parserWhitespace,
                parserUtilMap(
                    parserUtilSequence(
                        parserRoot,
                        parserUtilSequence(
                            parserWhitespace,
                            parserExprPostfixSubscriptTokenClose
                        )
                    ),
                    ([x,]) => x
                )
            ),
            ([, x]) => x
        )
    ),
    ([, x]) => (expr) => ({
        exprType: "SUBSCRIPT",
        index: x,
        value: expr
    })
)
