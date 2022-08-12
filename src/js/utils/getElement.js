// a small hack to save "document.getElementById" or "document.querySelector"
const getElement = (selector) => { 
    const element = document.querySelector(selector);

    if (element) {
        return element;
    } else {
        throw new Error(`No element found with ${selector} selector`)
    }
}

export default getElement;