export type FormValues = {
  name: string;
  email: string;
  experience: string;
  github: string;
};

export type FormErrors = Partial<Record<keyof FormValues, string>>;
