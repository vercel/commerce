export function isMobile() {
    return window.innerWidth < 768
}

export function removeItem<T>(arr: Array<T>, value: T): Array<T> { 
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return [...arr];
}