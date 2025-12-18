export type ParserErrorExprMissing = {
    errorType: "TYBURN::EXPR_MISSING"
}

export type ParserErrorStatementMissing = {
    errorType: "TYBURN::STATEMENT_MISSING"
}

export type ParserErrorTokenInvalid = {
    errorType: "TYBURN::TOKEN_INVALID"
}

export type ParserErrorSymbolInvalid = {
    errorType: "TYBURN::SYMBOL_INVALID"
}

export type ParserErrorDigitInvalid = {
    errorType: "TYBURN::DIGIT_INVALID"
}

export type ParserError =
    | ParserErrorDigitInvalid
    | ParserErrorSymbolInvalid
    | ParserErrorTokenInvalid
    | ParserErrorExprMissing
    | ParserErrorStatementMissing
