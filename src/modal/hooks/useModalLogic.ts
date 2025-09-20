import { useModalActions } from './useModalActions';
import { useModalEffects } from './useModalEffects';
import { useModalState } from './useModalState';

export function useModalLogic() {
  // 상태 관리
  const state = useModalState();

  // 비즈니스 로직
  const actions = useModalActions({
    setOpen: state.setOpen,
    setValues: state.setValues,
    setErrors: state.setErrors,
    values: state.values,
    resolverRef: state.resolverRef,
    triggerElRef: state.triggerElRef,
    busyRef: state.busyRef,
  });

  // 사이드 이펙트
  useModalEffects({
    open: state.open,
    titleRef: state.titleRef,
  });

  return {
    // 상태
    open: state.open,
    values: state.values,
    errors: state.errors,
    titleRef: state.titleRef,

    // 액션
    openModal: actions.openModal,
    submit: actions.submit,
    cancelWithNull: actions.cancelWithNull,
    onCloseByReason: actions.onCloseByReason,

    // 변경 핸들러
    onChange: (patch: Partial<typeof state.values>) =>
      state.setValues((v) => ({ ...v, ...patch })),
  };
}
