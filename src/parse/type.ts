export type ParseInput = {
    data: string
    index: number
    position: [number, number]
}

export type ParseResultValue<T> = {
    resultType: "VALUE"
    parsedInput: ParseInput
    value: T
}

export type ParseResultError = {
    resultType: "ERROR"
    parsedInput: ParseInput
    error: string,
}

export type ParseResultFatal = {
    resultType: "FATAL"
    parsedInput: ParseInput
    error: string,
}

export type ParseResult<T> =
    | ParseResultValue<T>
    | ParseResultError
    | ParseResultFatal


export type Parser<T> = (input : ParseInput) => ParseResult<T>
