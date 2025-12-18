import type { ParserAtomCharacterParseResultError, ParserAtomEndParseResultError, ParserTextParseResultError } from "astroparse"

export type ParserErrorExprMissing = {
    errorType: "TYBURN::EXPR_MISSING"
}

export type ParserErrorStatementMissing = {
    errorType: "TYBURN::STATEMENT_MISSING"
}

export type ParserErrorSymbolCharacterInvalid = {
    errorType: "TYBURN::SYMBOL_CHARACTER_INVALID"
}

export type ParserErrorDigitCharacterInvalid = {
    errorType: "TYBURN::DIGIT_CHARACTER_INVALID"
}

export type ParserError =
    | ParserAtomCharacterParseResultError
    | ParserAtomEndParseResultError
    | ParserTextParseResultError
    | ParserErrorDigitCharacterInvalid
    | ParserErrorSymbolCharacterInvalid
    | ParserErrorExprMissing
    | ParserErrorStatementMissing
