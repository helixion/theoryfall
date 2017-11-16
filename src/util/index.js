const findElementIndex = (selector, target) => {
    const divs = Array.prototype.slice.call(document.querySelectorAll(selector));
    return divs.indexOf(target);
}