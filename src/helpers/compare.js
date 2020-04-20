export const isNumber = (char) => {
    return /\d/.test(char);
}
export const isString = (char) => {
    return /\w/.test(char);
}