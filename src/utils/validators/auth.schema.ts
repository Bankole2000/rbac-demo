import { boolean, object, string } from 'zod';
import { isNotEmpty, isValidUserName } from '@tonictech/common';

export const emailRequiredSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Email must be a valid email address'),
  })
});

export const registerFields = ['email', 'password', 'username'];

export const registerPhoneSchema = object({
  body: object({
    countryCode: string({
      required_error: 'Country Code is required',
    }).min(2, 'Country Code be at least 2 characters')
    .max(3, 'Country Code be at least 3 characters')
    .refine((data) => isNotEmpty(data), 'Password cannot be empty'),
    phone: string({
      required_error: 'Phone number is required',
    }).refine((data) => isNotEmpty(data), 'Password cannot be empty'),
    username: string({
      required_error: 'Username is required',
    }).refine((data) => isValidUserName(data), 'Username can only have lowercase (small) letters, numbers, and underscores'),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Password must be at least 8 characters')
      .refine((data) => isNotEmpty(data), 'Password cannot be empty'),
    confirmPassword: string({
      required_error: 'Confirm Password is required',
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
});

export const registerSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Email must be a valid email address'),
    username: string({
      required_error: 'Username is required',
    }).refine((data) => isValidUserName(data), 'Username can only have lowercase (small) letters, numbers, and underscores'),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Password must be at least 8 characters')
      .refine((data) => isNotEmpty(data), 'Password cannot be empty'),
    confirmPassword: string({
      required_error: 'Confirm Password is required',
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
});

export const loginFields = ['email', 'password'];

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Email must be a valid email address'),
    password: string({
      required_error: 'Password is required',
    }).min(1, 'Password is required')
      .refine((data) => isNotEmpty(data), 'Password cannot be empty'),
  })
});

export const roleChangeSchema = object({
  body: object({
    role: string({
      required_error: 'You need to specify the role to add / remove'
    })
  })
});
