import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import type { FormValues } from './modal';
import { ModalFormProvider, useFormModal } from './modal';

function Demo() {
  const { open } = useFormModal();
  const [result, setResult] = useState<FormValues | null | undefined>(
    undefined,
  );

  return (
    <Box sx={{ p: 3 }}>
      <Button
        variant="contained"
        onClick={async () => {
          setResult(undefined);
          const v = await open({ name: '' });
          setResult(v);
        }}
      >
        🚀 신청 폼 작성하기
      </Button>

      <Box sx={{ mt: 3, minHeight: 24 }}>
        {result === undefined ? null : result === null ? (
          <Typography component="em">모달이 취소/닫기 되었습니다.</Typography>
        ) : (
          <Box
            component="pre"
            aria-live="polite"
            sx={{
              mt: 1,
              p: 2,
              borderRadius: 1,
              bgcolor: 'grey.100',
              maxWidth: 560,
              overflow: 'auto',
              fontSize: 12,
            }}
          >
            {JSON.stringify(result, null, 2)}
          </Box>
        )}
      </Box>
    </Box>
  );
}

const ModalFormPage = () => {
  /* 여기에 구현해 주세요 */
  return (
    <ModalFormProvider>
      <Demo />
    </ModalFormProvider>
  );
};

export default ModalFormPage;
