import type { ParserStatement } from "@src/parser/ast"
import { parserText, parserAtomSequence, parserWhitespace, parserAtomMapValue } from "astroparse"

const parserTokenContinue = parserText("continue")
const parserTokenEnd = parserText(";")

export const parserStatementContinue = parserAtomMapValue(
    parserAtomSequence([
        parserTokenContinue,
        parserWhitespace,
        parserTokenEnd
    ]),
    () : ParserStatement => ({ statementType: "CONTINUE" })
)
