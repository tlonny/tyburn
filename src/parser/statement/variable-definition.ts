import type { ParserStatement } from "@src/parser/ast"
import { parserExpr } from "@src/parser/expr"
import { parserSymbol } from "@src/parser/symbol"
import { parserTyping } from "@src/parser/typing"
import { parserAtomEither, parserAtomMapValue, parserAtomSequence, parserAtomTry, parserAtomValue, parserText, parserWhitespace } from "astroparse"

const parserTokenVar = parserText("var")
const parserTokenTypeAssignment = parserText(":")
const parserTokenValueAssignment = parserText("=")
const parserTokenEnd = parserText(";")

export const parserStatementVariableDefinition = parserAtomMapValue(
    parserAtomSequence([
        parserTokenVar,
        parserWhitespace,
        parserSymbol,
        parserWhitespace,
        parserAtomEither([
            parserAtomMapValue(
                parserAtomSequence([
                    parserAtomTry(parserTokenTypeAssignment),
                    parserWhitespace,
                    parserTyping,
                    parserWhitespace
                ]),
                ([,, x]) => x
            ),
            parserAtomValue(null)
        ]),
        parserAtomEither([
            parserAtomMapValue(
                parserAtomSequence([
                    parserAtomTry(parserTokenValueAssignment),
                    parserWhitespace,
                    parserExpr,
                    parserWhitespace
                ]),
                ([,, x]) => x
            ),
            parserAtomValue(null)
        ]),
        parserTokenEnd
    ]),
    ([,, x,, y, z]) : ParserStatement => ({
        statementType: "VARIABLE_DEFINITION",
        variable: x,
        typing: y,
        expression: z
    })
)
