import type { Expr } from "@src/parse/parser/expr/type"
import { parserWhitespace } from "@src/parse/parser/primitive/whitespace"
import { parserWord } from "@src/parse/parser/primitive/word"
import { parserUtilEither } from "@src/parse/parser/util/either"
import { parserUtilValue } from "@src/parse/parser/util/value"
import { parserUtilMany } from "@src/parse/parser/util/many"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import { parserUtilTry } from "@src/parse/parser/util/try"
import type { Parser } from "@src/parse/type"

const parserExprPostfixApplicationTokenOpen = parserWord("(")
const parserExprPostfixApplicationTokenClose = parserWord(")")
const parserExprPostfixApplicationSeparator = parserWord(",")

export const parserExprPostfixApplication = (
    parserRoot : Parser<Expr>
) : Parser<(expr : Expr) => Expr> => parserUtilMap(
    parserUtilSequence(
        parserUtilTry(
            parserUtilSequence(
                parserWhitespace,
                parserExprPostfixApplicationTokenOpen,
            )
        ),
        parserUtilMap(
            parserUtilSequence(
                parserWhitespace,
                parserUtilMap(
                    parserUtilSequence(
                        parserUtilMap(
                            parserUtilSequence(
                                parserUtilEither(
                                    parserUtilMap(parserRoot, x => [x]),
                                    parserUtilValue([])
                                ),
                                parserUtilMany(
                                    parserUtilMap(
                                        parserUtilSequence(
                                            parserUtilTry(
                                                parserUtilSequence(
                                                    parserWhitespace,
                                                    parserExprPostfixApplicationSeparator
                                                )
                                            ),
                                            parserUtilMap(
                                                parserUtilSequence(
                                                    parserWhitespace,
                                                    parserRoot
                                                ),
                                                ([, x]) => x
                                            )
                                        ),
                                        ([, x]) => x
                                    )
                                )
                            ),
                            ([x, y]) => [...x, ...y]
                        ),
                        parserUtilSequence(
                            parserWhitespace,
                            parserExprPostfixApplicationTokenClose
                        )
                    ),
                    ([x,]) => x
                )
            ),
            ([, x]) => x
        )
    ),
    ([, x]) => (expr) => ({
        exprType: "APPLICATION",
        arguments: x,
        value: expr
    })
)
