import { defineRule } from "vee-validate";
export function getFormValidators() {
  defineRule("required", (value) => {
    if (!value || !value.length) {
      return "This Field is required";
    }
    return true;
  });

  defineRule("email", (value) => {
    // Field is empty, should pass
    if (!value || !value.length) {
      return true;
    }
    // Check if email
    if (!/[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}/.test(value)) {
      return "This is not a valid email";
    }
    return true;
  });

  defineRule("minLength", (value, [limit]) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
      return true;
    }
    if (value.length < limit) {
      return `This field must be at least ${limit} characters`;
    }
    return true;
  });
}
