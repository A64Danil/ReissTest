export const urlInlineParser = (urlString) =>  {
    if (!urlString) return ;
    console.log("urlInlineParser");
    console.log(urlString);
    let tempLink = urlLink + urlString;
    setUrlLink(tempLink)


    let newResultArr = urlString.split('');
    // console.log(newResultArr);
    let nameBuffer = "";
    // let parsedResult = [];
    let parsedResult = {};

    newResultArr.forEach((char) => {
        let singleResultValue = {};
        // console.log("char " + char)
        // console.log("num " + isNumber(char))
        // console.log("str " + isString(char))

        if (isNumber(char)) {
            // singleResultValue[nameBuffer] = char;
            // console.log(singleResultValue)
            parsedResult[nameBuffer] = char;
            nameBuffer = "";
            // parsedResult.push(singleResultValue)

        } else if (isString(char)) {
            nameBuffer += char;
            // console.log(nameBuffer)
        }
    })
    // создаём буффер
    // если встретили букву - добавляем в имя буффероа
    // если встретили цифру - добавляем в значение объкта буффера, добавлЯем объект в фин результат и чистим буффер
    return parsedResult;

}