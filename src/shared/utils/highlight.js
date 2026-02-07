const escapeHTML = (unsafeString)=>{
    return unsafeString
        .replaceAll(/&/g, '&amp;')
        .replaceAll(/</g, '&lt;')
        .replaceAll(/>/g, '&gt;')
        .replaceAll(/"/g, '&quot;')
        .replaceAll(/'/g, '&#39;')
}
const escapeRegExp = (unsafeString) => {
    return unsafeString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const highlightCaseInsensitive = (text, query) =>{

    const saveText = escapeHTML(text)
    const queryFormated  = query.trim()

    if(queryFormated.length ===0){
        return saveText
    }

    const pattern = new RegExp(escapeRegExp(queryFormated),'ig')

    return saveText.replace(
        pattern,
        `<mark>$&</mark>
    `)
}