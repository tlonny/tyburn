export type ExprBool = {
    exprType: "BOOL",
    value: "TRUE" | "FALSE"
}

export type ExprInteger = {
    exprType: "INTEGER",
    base: "HEXADECIMAL" | "DECIMAL"
    value: string
}

export type ExprVariable = {
    exprType: "VARIABLE",
    value: string
}

export type ExprReference = {
    exprType: "REFERENCE",
    value: Expr
}

export type ExprNot = {
    exprType: "NOT",
    value: Expr
}

export type ExprSubscript = {
    exprType: "SUBSCRIPT"
    value: Expr
    index: Expr
}

export type ExprApplication = {
    exprType: "APPLICATION"
    value: Expr
    arguments: Expr[]
}

export type ExprMultiply = {
    exprType: "MULTIPLY"
    operandLeft: Expr
    operandRight: Expr
}

export type ExprAdd = {
    exprType: "ADD"
    operandLeft: Expr
    operandRight: Expr
}

export type Expr =
    | ExprBool
    | ExprReference
    | ExprVariable
    | ExprNot
    | ExprInteger
    | ExprSubscript
    | ExprApplication
    | ExprMultiply
    | ExprAdd
