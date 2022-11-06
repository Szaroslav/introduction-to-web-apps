onload = () => {
    const passwordElements = {
        primary: document.querySelector('#password'),
        confirm: document.querySelector('#confirm-password')
    };
    const requirementElements = {
        match: document.querySelector('.password-requirement-match'),
        chars: document.querySelector('.password-requirement-chars'),
        specials: document.querySelector('.password-requirement-specials'),
        capitals: document.querySelector('.password-requirement-capitals'),
        digits: document.querySelector('.password-requirement-digits')
    };
    const passwordToggles = document.querySelectorAll('.password-icon');

    const validate = (predicateFn, element) => {
        if (predicateFn()) {
            element.classList.add('valid');
            element.classList.remove('invalid');
        }
        else {
            element.classList.add('invalid');
            element.classList.remove('valid');
        }

        return predicateFn();
    };

    const validateMatch = (p1, p2) => {
        return validate(() => p1 === p2, requirementElements.match);
    };

    const validateCharacters = (p, minChars) => {
        return validate(() => p.length >= minChars, requirementElements.chars);
    };

    const validateSpecials = (p, minChars) => {
        return validate(() => (p.match(/[!-/:-@\[-`{-~]/g) ?? []).length >= minChars, requirementElements.specials);
    };

    const validateCapitals = (p, minChars) => {
        return validate(() => (p.match(/\p{Lu}/gu) ?? []).length >= minChars, requirementElements.capitals);
    };

    const validateDigits = (p, minChars) => {
        return validate(() => (p.match(/[0-9]/g) ?? []).length >= minChars, requirementElements.digits);
    };

    const validatePassword = (e) => {
        let p1 = passwordElements.primary.value, p2 = passwordElements.confirm.value;
        if (e instanceof ClipboardEvent)
            e.target === passwordElements.primary ? p1 += e.clipboardData.getData('text') : p2 += e.clipboardData.getData('text');

        validateMatch(p1, p2);
        validateCharacters(p1, 8);
        validateSpecials(p1, 1);
        validateCapitals(p1, 1);
        validateDigits(p1, 1);
    };

    const togglePassword = element => {
        element.type = element.type === 'password' ? 'text' : 'password';
    };

    passwordElements.primary.addEventListener('keyup', validatePassword);
    passwordElements.primary.addEventListener('paste', validatePassword);
    passwordElements.confirm.addEventListener('keyup', validatePassword);
    passwordElements.confirm.addEventListener('paste', validatePassword);
    passwordToggles.forEach(t => t.addEventListener('click', () => togglePassword(t.parentElement.querySelector('input'))));
};