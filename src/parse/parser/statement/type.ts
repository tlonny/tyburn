import type { Expr } from "@src/parse/parser/expr/type"
import type { Typing } from "@src/parse/parser/typing"

export type StatementVariableDefinition = {
    statementType: "VARIABLE_DEFINITION",
    variable: string
    typing: Typing | null
    expression: Expr | null
}

export type StatementBreak = {
    statementType: "BREAK",
}

export type StatementContinue = {
    statementType: "CONTINUE",
}

export type StatementWhile = {
    statementType: "WHILE",
    condition: Expr
    statements: Statement[]
}

export type StatementComment = {
    statementType: "COMMENT"
    comment: string
}

export type Statement =
    | StatementComment
    | StatementBreak
    | StatementContinue
    | StatementWhile
    | StatementVariableDefinition
