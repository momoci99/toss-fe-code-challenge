import { createContext, useContext } from 'react';
import type { FormValues } from '../types';

/**
 * 모달을 열기 위한 컨텍스트 타입
 */
export type ModalFormContextType = {
  open: (initial?: Partial<FormValues>) => Promise<FormValues | null>;
};

export const ModalFormContext = createContext<ModalFormContextType | null>(
  null,
);

export function useFormModal() {
  const ctx = useContext(ModalFormContext);
  if (!ctx) {
    throw new Error('ModalFormProvider로 앱을 감싸주세요.');
  }
  return ctx;
}
