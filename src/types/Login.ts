export type FormErrors = {
  email?: string;
  password?: string;
  custom?: string;
};

export type FormState = {
  success: boolean;
  errors: FormErrors;
  inputs?: {
    email: string;
    password: string;
  };
};
