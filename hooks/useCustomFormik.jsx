import { useState } from 'react';
import { useFormik as formikHook } from 'formik';

const useCustomFormik = (initialValues, validationSchema, onSubmit, regexValidations = {}) => {
  const [validationErrors, setValidationErrors] = useState({});

  const formikBag = formikHook({
    initialValues,
    validationSchema,
    onSubmit,
    validate: (values) => {
      const errors = {};

      Object.keys(regexValidations).forEach((fieldName) => {
        const regex = regexValidations[fieldName];
        if (regex && !regex.test(values[fieldName])) {
          switch (fieldName) {
            case 'name':
              errors[fieldName] = 'Name must contain only letters.';
              break;
            case 'lastName':
              errors[fieldName] = 'Last Name must contain only letters.';
              break;
            case 'email':
              errors[fieldName] = 'Invalid email address format.';
              break;
            case 'phone':
              errors[fieldName] = 'Invalid phone number. Please enter 10 digits.';
              break;
            case 'password':
              errors[fieldName] =
                'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
              break;
            default:
              errors[fieldName] = 'Invalid input';
          }
        }
      });

      return { ...validationSchema?.validate(values), ...errors };
    },
  });

  return { ...formikBag, validationErrors };
};

export default useCustomFormik;
