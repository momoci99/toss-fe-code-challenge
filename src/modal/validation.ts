import type { FormErrors, FormValues } from './types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GITHUB_RE = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/?$/;

export function validateForm(v: FormValues): FormErrors {
  const next: FormErrors = {};

  if (!v.name) {
    next.name = '이름/닉네임을 입력해주세요.';
  }

  if (!v.email) {
    next.email = '이메일을 입력해주세요.';
  } else if (!EMAIL_RE.test(v.email)) {
    next.email = '올바른 이메일 형식을 입력해주세요.';
  }

  if (!v.experience) {
    next.experience = 'FE 경력 연차를 선택해주세요.';
  }

  if (v.github && !GITHUB_RE.test(v.github)) {
    next.github =
      '올바른 GitHub 프로필 URL을 입력해주세요. (예: https://github.com/username)';
  }

  return next;
}

export const initialValues: FormValues = {
  name: '',
  email: '',
  experience: '',
  github: '',
};
