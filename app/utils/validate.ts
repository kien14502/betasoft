const validatePassword = (_: unknown, value: string) => {
  if (!value) {
    return Promise.reject(new Error("Password is required"));
  }
  if (!/(?=.*[a-z])/.test(value)) {
    return Promise.reject(
      new Error("Password must contain at least one lowercase letter")
    );
  }
  if (!/(?=.*[A-Z])/.test(value)) {
    return Promise.reject(
      new Error("Password must contain at least one uppercase letter")
    );
  }
  if (!/(?=.*\d)/.test(value)) {
    return Promise.reject(
      new Error("Password must contain at least one number")
    );
  }
  if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(value)) {
    return Promise.reject(
      new Error("Password must contain at least one special character")
    );
  }
  if (value.length < 8 || value.length > 16) {
    return Promise.reject(
      new Error("Password must be between 8 and 16 characters")
    );
  }
  return Promise.resolve();
};

const validatePhoneNumber = (_: unknown, value: string) => {
  const regex = /^[0-9]{10}$/;
  if (!value) {
    return Promise.reject(new Error("Phone number is required"));
  }
  if (!regex.test(value)) {
    return Promise.reject(new Error("Phone number is not valid"));
  }
  return Promise.resolve();
};

export { validatePassword, validatePhoneNumber };
