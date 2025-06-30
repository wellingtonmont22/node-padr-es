interface Validation {
    validate(data: unknown): boolean;
}

class StringValidation implements Validation {
    validate(data: unknown): boolean {
        console.log("Validating if data is a string.", typeof data === "string");
        return typeof data === "string";
    }
}

class NumberValidation implements Validation {
    validate(data: unknown): boolean {
        console.log("Validating if data is a number.", typeof data === "number");
        return typeof data === "number";
    }
}

class CompositeValidation implements Validation {
    private validations: Validation[];

    constructor(validations: Validation[]) {
        this.validations = validations;
    }

    validate(data: unknown): boolean {
        return this.validations.some((validation) => validation.validate(data));
    }
}

const instance = new CompositeValidation([new StringValidation(), new NumberValidation()]);
instance.validate(1);

