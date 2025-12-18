import type { ParserNodeStatement } from "@src/parser/node"
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
    () : ParserNodeStatement => ({ nodeType: "STATEMENT_BREAK" })
)
