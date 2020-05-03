export const isNumber = (char) => {
    return /\d/.test(char);
}
export const isString = (char) => {
    return /\w/.test(char);
}

export const copyToClipboard = (textToCopy) => {
    const copytext = document.createElement('input')
    copytext.value = textToCopy;
    document.body.appendChild(copytext)
    copytext.select()
    document.execCommand('copy')
    document.body.removeChild(copytext)
};