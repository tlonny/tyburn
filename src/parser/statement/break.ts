import type { ParserStatement } from "@src/parser/ast"
import { parserToken } from "@src/parser/token"
import { parserAtomMapValue, parserAtomSequence, parserWhitespace } from "astroparse"

const parserTokenBreak = parserToken("break")
const parserTokenEnd = parserToken(";")

export const parserStatementBreak = parserAtomMapValue(
    parserAtomSequence([
        parserTokenBreak,
        parserWhitespace,
        parserTokenEnd
    ]),
    () : ParserStatement => ({ statementType: "BREAK" })
)
