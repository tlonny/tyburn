import type { Expr } from "@src/parse/parser/expr/type"
import { parserWord } from "@src/parse/parser/primitive/word"
import type { Parser } from "@src/parse/type"
import { parserUtilEither } from "@src/parse/parser/util/either"
import { parserUtilMap } from "@src/parse/parser/util/map"

const parserTrue = parserWord("true")
const parserFalse = parserWord("false")

export const parserExprBool : Parser<Expr> = parserUtilMap(
    parserUtilEither(
        parserTrue,
        parserFalse
    ), x => ({
        exprType: "BOOL",
        value: x === "true" ? "TRUE" : "FALSE"
    })
)
