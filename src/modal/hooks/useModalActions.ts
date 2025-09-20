import { useCallback } from 'react';
import type { FormErrors, FormValues } from '../types';
import { initialValues, validateForm } from '../validation';

interface UseModalActionsProps {
  setOpen: (open: boolean) => void;
  setValues: (values: FormValues) => void;
  setErrors: (errors: FormErrors) => void;
  values: FormValues;
  resolverRef: { current: ((v: FormValues | null) => void) | undefined };
  triggerElRef: { current: HTMLElement | null };
  busyRef: { current: boolean };
}

export function useModalActions({
  setOpen,
  setValues,
  setErrors,
  values,
  resolverRef,
  triggerElRef,
  busyRef,
}: UseModalActionsProps) {
  // 포커스 복원
  const restoreFocus = useCallback(() => {
    const el = triggerElRef.current;
    triggerElRef.current = null;
    setTimeout(() => el?.focus?.(), 0);
  }, [triggerElRef]);

  // 모달 열기
  const openModal = useCallback(
    (initial?: Partial<FormValues>) => {
      if (busyRef.current) {
        return Promise.reject(new Error('이미 모달이 열려 있습니다.'));
      }
      busyRef.current = true;
      triggerElRef.current = document.activeElement as HTMLElement | null;
      setValues({ ...initialValues, ...initial });
      setErrors({});
      setOpen(true);
      return new Promise<FormValues | null>((resolve) => {
        resolverRef.current = resolve;
      });
    },
    [busyRef, triggerElRef, setValues, setErrors, setOpen, resolverRef],
  );

  // 폼 제출
  const submit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const errs = validateForm(values);
      setErrors(errs);
      if (Object.keys(errs).length === 0) {
        setOpen(false);
        resolverRef.current?.(values);
        resolverRef.current = undefined;
        busyRef.current = false;
        restoreFocus();
      }
    },
    [values, setErrors, setOpen, resolverRef, busyRef, restoreFocus],
  );

  // 취소 (null 반환)
  const cancelWithNull = useCallback(() => {
    setOpen(false);
    resolverRef.current?.(null);
    resolverRef.current = undefined;
    busyRef.current = false;
    restoreFocus();
  }, [setOpen, resolverRef, busyRef, restoreFocus]);

  // 외부 이유로 닫기 (ESC, 바깥 클릭)
  const onCloseByReason = useCallback(
    (_: unknown, reason?: 'backdropClick' | 'escapeKeyDown') => {
      if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
        cancelWithNull();
      }
    },
    [cancelWithNull],
  );

  return {
    openModal,
    submit,
    cancelWithNull,
    onCloseByReason,
  };
}
