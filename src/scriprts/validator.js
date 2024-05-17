export default class Validator {
    constructor (__init) {
        this.fields = document.querySelectorAll(__init.fields);
        this.checkboxes = document.querySelectorAll(__init.checkboxes);
    }

    validateEmptyInputs () {
        let isEmpty = true;

        this.fields.forEach(field => {
            if (!field.value) {
                isEmpty = false;

                field.classList.add('invalid-input');
                field.placeholder = 'Это поле не может быть пустым';
            }
        });

        return isEmpty;
    }

    validateUncheckedCheckboxes () {
        let isChecked = true;
        
        this.checkboxes.forEach(check => {
            if (check.checked) {
                isChecked = false;
                check.classList.add('invalid-check');
            }
        })

        return isChecked;
    }

    validateAll () {
        const validInputs = this.validateEmptyInputs();
        const validCheckboxes = this.validateUncheckedCheckboxes();

        let isValid = true;

        if (!validCheckboxes || !validInputs) {
            isValid = false;
        }

        return isValid;
    }
}