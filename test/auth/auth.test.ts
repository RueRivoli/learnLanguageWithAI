import { getEmailPasswordInvalidityMessage } from "~/utils/auth/auth";
//const getEmailPasswordInvalidityMessage = require('~/utils/auth/auth');

const authForm = {
  email: 'wrongFormatEmail',
  password: 'GoodMorning-1234'
}

test('adds 1 + 2 to equal 3', () => {
  expect(getEmailPasswordInvalidityMessage(authForm)).toBe(null);
});