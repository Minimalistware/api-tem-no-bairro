export const PHONE_NUMBER_PATTERN = /^\+?55\d{10,11}$/;
export const USER_NAME_PATTERN = /^[a-zA-Z0-9_]{3,20}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emailOptions = {
  required: true,
  unique: true,
  validate: {
    validator: function (v: string) {
      return EMAIL_PATTERN.test(v);
    },
  },
};

export const userNameOptions = {
  required: true,
  validate: {
    validator: function (v: string) {
      return USER_NAME_PATTERN.test(v);
    },
  },
};

export const passwordHashOptions = {
  required: true,
};

export const phoneNumberOptions = {
  required: true,
  validate: {
    validator: function (v: string) {
      return PHONE_NUMBER_PATTERN.test(v);
    },
  },
};

export const accessFailedCountOptions = { max: 3 };
