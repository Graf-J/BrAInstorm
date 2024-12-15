export interface BrainstormResponse {
    id: string,
    title: string,
    maxWords: number,
    words: WordResponse[],
    creator: string
}

interface WordResponse {
    value: string,
    color: string,
    occurrence: number
}