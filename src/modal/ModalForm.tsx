import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { useId, useRef, type FormEvent, type RefObject } from 'react';
import type { FormErrors, FormValues } from './types';

type Props = {
  open: boolean;
  values: FormValues;
  errors: FormErrors;
  titleRef: RefObject<HTMLHeadingElement | null>;
  onChange: (patch: Partial<FormValues>) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
  onCloseByReason: (
    _e: unknown,
    reason?: 'backdropClick' | 'escapeKeyDown',
  ) => void;
};

export default function ModalForm({
  open,
  values,
  errors,
  titleRef,
  onChange,
  onSubmit,
  onCancel,
  onCloseByReason,
}: Props) {
  const titleId = useId();
  const descId = useId();
  const errorLiveId = useId();
  const experienceLabelId = useId();

  const selectRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog
      open={open}
      onClose={onCloseByReason}
      aria-labelledby={titleId}
      aria-describedby={descId}
      fullWidth
      maxWidth="sm"
      disableEscapeKeyDown={false}
      disableEnforceFocus={false}
      disableRestoreFocus={false}
      keepMounted={false}
      scroll="paper"
      sx={{
        '& .MuiDialog-paper': {
          maxHeight: '90vh',
          margin: '16px',
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle
        id={titleId}
        tabIndex={-1}
        ref={titleRef}
        sx={{ outline: 'none' }}
        variant="h4"
      >
        신청 폼
      </DialogTitle>

      <DialogContent>
        <Typography
          id={descId}
          variant="body2"
          sx={{ mb: 2, color: 'text.secondary' }}
        >
          이메일과 FE경력 연차 등 간단한 정보를 입력해주세요.
        </Typography>

        {/* 오류 라이브 영역(스크린리더 즉시 고지) */}
        <Box
          id={errorLiveId}
          role="alert"
          aria-live="assertive"
          sx={{
            position: 'absolute',
            width: 1,
            height: 1,
            p: 0,
            m: -1,
            border: 0,
            clip: 'rect(0 0 0 0)',
            overflow: 'hidden',
          }}
        >
          {Object.values(errors).join(' ')}
        </Box>

        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ display: 'grid', gap: 2, pt: 1 }}
        >
          <TextField
            label="이름 / 닉네임"
            name="name"
            value={values.name}
            onChange={(e) => onChange({ name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
            slotProps={{
              formHelperText: {
                id: 'error-name',
                'aria-live': 'assertive',
              },
            }}
            required
            fullWidth
          />

          <TextField
            label="이메일"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => onChange({ email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
            slotProps={{
              formHelperText: {
                id: 'error-email',
                'aria-live': 'assertive',
              },
            }}
            required
            fullWidth
          />

          <FormControl fullWidth required error={!!errors.experience}>
            <InputLabel id={experienceLabelId}>FE 경력 연차</InputLabel>
            <Select
              ref={selectRef}
              labelId={experienceLabelId}
              name="experience"
              value={values.experience}
              label="FE 경력 연차"
              onChange={(e) => onChange({ experience: e.target.value })}
            >
              <MenuItem value="0-3">0~3년</MenuItem>
              <MenuItem value="4-7">4~7년</MenuItem>
              <MenuItem value="8+">8년 이상</MenuItem>
            </Select>
            {errors.experience && (
              <FormHelperText aria-live="assertive">
                {errors.experience}
              </FormHelperText>
            )}
          </FormControl>

          <TextField
            label="GitHub 링크 (선택)"
            name="github"
            type="url"
            placeholder="https://github.com/username"
            value={values.github}
            onChange={(e) => onChange({ github: e.target.value })}
            error={!!errors.github}
            helperText={errors.github || 'GitHub 프로필 URL을 입력해주세요.'}
            slotProps={{
              formHelperText: {
                id: 'error-github',
                'aria-live': 'assertive',
              },
            }}
            fullWidth
          />

          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              justifyContent: 'flex-end',
              mt: 1,
            }}
          >
            <Button variant="outlined" type="button" onClick={onCancel}>
              취소
            </Button>
            <Button variant="contained" type="submit">
              제출하기
            </Button>
          </Box>
        </Box>
      </DialogContent>
      {/* <DialogActions sx={{ display: { xs: "none" } }} /> */}
    </Dialog>
  );
}
