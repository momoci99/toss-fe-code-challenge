import ModalForm from './ModalForm';
import { ModalFormContext } from './context/ModalFormContext';
import { useModalLogic } from './hooks/useModalLogic';

export { useFormModal } from './context/ModalFormContext';

export function ModalFormProvider({ children }: { children: React.ReactNode }) {
  const modalLogic = useModalLogic();

  return (
    <ModalFormContext.Provider value={{ open: modalLogic.openModal }}>
      {children}
      <ModalForm
        open={modalLogic.open}
        values={modalLogic.values}
        errors={modalLogic.errors}
        titleRef={modalLogic.titleRef}
        onChange={modalLogic.onChange}
        onSubmit={modalLogic.submit}
        onCancel={modalLogic.cancelWithNull}
        onCloseByReason={modalLogic.onCloseByReason}
      />
    </ModalFormContext.Provider>
  );
}
