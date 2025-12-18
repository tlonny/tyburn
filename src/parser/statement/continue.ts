import type { ParserNodeStatement } from "@src/parser/node"
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
    () : ParserNodeStatement => ({ nodeType: "STATEMENT_CONTINUE" })
)
