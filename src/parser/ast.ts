export type ParserSymbol = {
    name: string
    path: string[]
}

export type ParserTyping = {
    name: ParserSymbol
    arguments: ParserTyping[]
}

export type ParserExprBool = {
    exprType: "BOOL",
    value: "TRUE" | "FALSE"
}

export type ParserExprInteger = {
    exprType: "INTEGER",
    base: "HEXADECIMAL" | "DECIMAL"
    value: string
}

export type ParserExprVariable = {
    exprType: "VARIABLE",
    value: ParserSymbol
}

export type ParserExprReference = {
    exprType: "REFERENCE",
    value: ParserExpr
}

export type ParserExprNot = {
    exprType: "NOT",
    value: ParserExpr
}

export type ParserExprSubscript = {
    exprType: "SUBSCRIPT"
    value: ParserExpr
    index: ParserExpr
}

export type ParserExprApplication = {
    exprType: "APPLICATION"
    value: ParserExpr
    arguments: ParserExpr[]
}

export type ParserExprMultiply = {
    exprType: "MULTIPLY"
    operandLeft: ParserExpr
    operandRight: ParserExpr
}

export type ParserExprAdd = {
    exprType: "ADD"
    operandLeft: ParserExpr
    operandRight: ParserExpr
}

export type ParserExpr =
    | ParserExprBool
    | ParserExprReference
    | ParserExprVariable
    | ParserExprNot
    | ParserExprInteger
    | ParserExprSubscript
    | ParserExprApplication
    | ParserExprMultiply
    | ParserExprAdd

export type ParserStatementVariableDefinition = {
    statementType: "VARIABLE_DEFINITION",
    variable: ParserSymbol
    typing: ParserTyping | null
    expression: ParserExpr | null
}

export type ParserStatementBreak = {
    statementType: "BREAK",
}

export type ParserStatementContinue = {
    statementType: "CONTINUE",
}

export type ParserStatementWhile = {
    statementType: "WHILE",
    condition: ParserExpr
    block: ParserStatementBlock
}

export type ParserStatementComment = {
    statementType: "COMMENT"
    comment: string
}

export type ParserStatementBlock = {
    statementType: "BLOCK",
    statements: ParserStatement[]
}

export type ParserStatement =
    | ParserStatementBlock
    | ParserStatementComment
    | ParserStatementBreak
    | ParserStatementContinue
    | ParserStatementWhile
    | ParserStatementVariableDefinition
