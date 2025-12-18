import type { ParserStatement } from "@src/parser/ast"
import { parserToken } from "@src/parser/token"
import { parserAtomSequence, parserWhitespace, parserAtomMapValue } from "astroparse"

const parserTokenContinue = parserToken("continue")
const parserTokenEnd = parserToken(";")

export const parserStatementContinue = parserAtomMapValue(
    parserAtomSequence([
        parserTokenContinue,
        parserWhitespace,
        parserTokenEnd
    ]),
    () : ParserStatement => ({ statementType: "CONTINUE" })
)
