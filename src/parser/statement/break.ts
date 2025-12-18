import type { ParserStatement } from "@src/parser/ast"
import { parserAtomMapValue, parserAtomSequence, parserText, parserWhitespace } from "astroparse"

const parserTokenBreak = parserText("break")
const parserTokenEnd = parserText(";")

export const parserStatementBreak = parserAtomMapValue(
    parserAtomSequence([
        parserTokenBreak,
        parserWhitespace,
        parserTokenEnd
    ]),
    () : ParserStatement => ({ statementType: "BREAK" })
)
