import { parserExpr } from "@src/parse/parser/expr"
import { parserSymbol } from "@src/parse/parser/primitive/symbol"
import { parserWhitespace } from "@src/parse/parser/primitive/whitespace"
import { parserWord } from "@src/parse/parser/primitive/word"
import type { Statement } from "@src/parse/parser/statement/type"
import { parserTyping } from "@src/parse/parser/typing"
import { parserUtilEither } from "@src/parse/parser/util/either"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import { parserUtilTry } from "@src/parse/parser/util/try"
import { parserUtilValue } from "@src/parse/parser/util/value"
import type { Parser } from "@src/parse/type"

const parserTokenVar = parserWord("var")
const parserTokenTypeAssignment = parserWord(":")
const parserTokenValueAssignment = parserWord("=")
const parserTokenEnd = parserWord(";")

export const parserStatementVariableDefinition : Parser<Statement> = parserUtilMap(
    parserUtilSequence([
        parserTokenVar,
        parserWhitespace,
        parserSymbol,
        parserWhitespace,
        parserUtilEither([
            parserUtilMap(
                parserUtilSequence([
                    parserUtilTry(parserTokenTypeAssignment),
                    parserWhitespace,
                    parserTyping,
                    parserWhitespace
                ]),
                ([,, x]) => x
            ),
            parserUtilValue(null)
        ]),
        parserUtilEither([
            parserUtilMap(
                parserUtilSequence([
                    parserUtilTry(parserTokenValueAssignment),
                    parserWhitespace,
                    parserExpr,
                    parserWhitespace
                ]),
                ([,, x]) => x
            ),
            parserUtilValue(null)
        ]),
        parserTokenEnd
    ]),
    ([,, x,, y, z]) => ({
        statementType: "VARIABLE_DEFINITION",
        variable: x,
        typing: y,
        expression: z
    })
)
