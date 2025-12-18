import type { ParserNodeStatement, ParserNodeStatementBlock } from "@src/parser/node"
import type { ParserError } from "@src/parser/error"
import { parserAtomMany, parserAtomMapValue, parserAtomSequence, parserWhitespace, type Parser } from "astroparse"

export const parserStatementBlock = (params: {
    parserStatement : Parser<ParserNodeStatement, ParserError>
}) => parserAtomMapValue(
    parserAtomSequence([
        parserWhitespace,
        parserAtomMany(
            parserAtomMapValue(
                parserAtomSequence([
                    params.parserStatement,
                    parserWhitespace
                ]),
                ([x,]) => x
            )
        )
    ]),
    ([, xs,]) : ParserNodeStatementBlock => ({
        nodeType: "STATEMENT_BLOCK",
        statements: xs
    })
)
