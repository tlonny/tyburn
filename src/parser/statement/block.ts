import type { ParserStatement, ParserStatementBlock } from "@src/parser/ast"
import type { ParserError } from "@src/parser/error"
import { parserAtomMany, parserAtomMapValue, parserAtomSequence, parserWhitespace, type Parser } from "astroparse"

export const parserBlock = (params: {
    parserStatement : Parser<ParserStatement, ParserError>
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
    ([, xs,]) : ParserStatementBlock => ({
        statementType: "BLOCK",
        statements: xs
    })
)
