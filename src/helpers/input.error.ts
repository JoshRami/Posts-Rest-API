import { ValidationError } from 'class-validator';

export const getErrorMessages = (errors: ValidationError[]): string[] => {
  const errorMessages: string[] = [];

  if (errors.length) {
    errors.forEach((error) => {
      errorMessages.push(...Object.values(error.constraints));
    });
  }
  return errorMessages;
};
