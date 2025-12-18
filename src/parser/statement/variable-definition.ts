import type { ParserNodeStatement } from "@src/parser/node"
import { parserExpr } from "@src/parser/expr"
import { parserSymbol } from "@src/parser/symbol"
import { parserToken } from "@src/parser/token"
import { parserTyping } from "@src/parser/typing"
import { parserAtomEither, parserAtomMapValue, parserAtomSequence, parserAtomTry, parserAtomValue, parserWhitespace } from "astroparse"

const parserTokenVar = parserToken("var")
const parserTokenTypeAssignment = parserToken(":")
const parserTokenValueAssignment = parserToken("=")
const parserTokenEnd = parserToken(";")

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
    ([,, x,, y, z]) : ParserNodeStatement => ({
        nodeType: "STATEMENT_VARIABLE_DEFINITION",
        variable: x,
        typing: y,
        expression: z
    })
)
