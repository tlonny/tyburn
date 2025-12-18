import type { ParserErrorTokenInvalid } from "@src/parser/error"
import { parserAtomMapError, parserAtomMapValue, parserText } from "astroparse"

export const parserToken = (token : string) => parserAtomMapError(
    parserAtomMapValue(
        parserText(token),
        () => null
    ),
    () : ParserErrorTokenInvalid => ({ errorType: "TYBURN::TOKEN_INVALID" })
)
