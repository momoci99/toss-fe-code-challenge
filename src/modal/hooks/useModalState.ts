import { useRef, useState } from 'react';
import type { FormErrors, FormValues } from '../types';
import { initialValues } from '../validation';

export function useModalState() {
  // UI 상태
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  // 참조 상태
  const resolverRef = useRef<((v: FormValues | null) => void) | undefined>(
    undefined,
  );
  const triggerElRef = useRef<HTMLElement | null>(null);
  const busyRef = useRef(false);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  return {
    // UI 상태
    open,
    setOpen,
    values,
    setValues,
    errors,
    setErrors,

    // 참조 상태
    resolverRef,
    triggerElRef,
    busyRef,
    titleRef,
  };
}
