export default class Filter {
    constructor (__init) {
        this.allElements = __init.allElements;
        this.activeClass = __init.activeClass;
        this.activeFilter = __init.activeFilter;
    }

    setFilter () {
        this.allElements.forEach(element => {
            element.classList.remove(this.activeClass);
            
            if (element.textContent === this.activeFilter) {
                element.classList.add(this.activeClass);
            }
        });

    }
}