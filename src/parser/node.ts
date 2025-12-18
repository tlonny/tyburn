export type ParserNodeSymbol = {
    nodeType: "SYMBOL"
    name: string
    path: string[]
}

export type ParserNodeTyping = {
    nodeType: "TYPING"
    name: ParserNodeSymbol
    arguments: ParserNodeTyping[]
}

export type ParserNodeExprBool = {
    nodeType: "EXPR_BOOL",
    value: "TRUE" | "FALSE"
}

export type ParserNodeExprInteger = {
    nodeType: "EXPR_INTEGER",
    base: "HEXADECIMAL" | "DECIMAL"
    value: string
}

export type ParserNodeExprVariable = {
    nodeType: "EXPR_VARIABLE",
    value: ParserNodeSymbol
}

export type ParserNodeExprReference = {
    nodeType: "EXPR_REFERENCE",
    value: ParserNodeExpr
}

export type ParserNodeExprNot = {
    nodeType: "EXPR_NOT",
    value: ParserNodeExpr
}

export type ParserNodeExprSubscript = {
    nodeType: "EXPR_SUBSCRIPT"
    value: ParserNodeExpr
    index: ParserNodeExpr
}

export type ParserNodeExprApplication = {
    nodeType: "EXPR_APPLICATION"
    value: ParserNodeExpr
    arguments: ParserNodeExpr[]
}

export type ParserNodeExprMultiply = {
    nodeType: "EXPR_MULTIPLY"
    operandLeft: ParserNodeExpr
    operandRight: ParserNodeExpr
}

export type ParserNodeExprAdd = {
    nodeType: "EXPR_ADD"
    operandLeft: ParserNodeExpr
    operandRight: ParserNodeExpr
}

export type ParserNodeExpr =
    | ParserNodeExprBool
    | ParserNodeExprReference
    | ParserNodeExprVariable
    | ParserNodeExprNot
    | ParserNodeExprInteger
    | ParserNodeExprSubscript
    | ParserNodeExprApplication
    | ParserNodeExprMultiply
    | ParserNodeExprAdd

export type ParserNodeStatementVariableDefinition = {
    nodeType: "STATEMENT_VARIABLE_DEFINITION",
    variable: ParserNodeSymbol
    typing: ParserNodeTyping | null
    expression: ParserNodeExpr | null
}

export type ParserNodeStatementBreak = {
    nodeType: "STATEMENT_BREAK",
}

export type ParserNodeStatementContinue = {
    nodeType: "STATEMENT_CONTINUE",
}

export type ParserNodeStatementWhile = {
    nodeType: "STATEMENT_WHILE",
    condition: ParserNodeExpr
    block: ParserNodeStatementBlock
}

export type ParserNodeStatementComment = {
    nodeType: "STATEMENT_COMMENT"
    comment: string
}

export type ParserNodeStatement =
    | ParserNodeStatementComment
    | ParserNodeStatementBreak
    | ParserNodeStatementContinue
    | ParserNodeStatementWhile
    | ParserNodeStatementVariableDefinition

export type ParserNodeStatementBlock = {
    nodeType: "STATEMENT_BLOCK",
    statements: ParserNodeStatement[]
}
