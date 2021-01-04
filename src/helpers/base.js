export const isNumber = (char) => {
    return /\d/.test(char);
}
export const isString = (char) => {
    return /\w/.test(char);
}

export const copyToClipboard = (textToCopy, el = document.body) => {
    const copytext = document.createElement('input');
    copytext.classList.add('clipboard');
    copytext.value = textToCopy;
    el.appendChild(copytext)
    copytext.select();
    copytext.focus();
    copytext.setSelectionRange(0, 999);
    document.execCommand('copy');
    el.removeChild(copytext);
};

export const validURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|localhost|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}