import { useEffect } from 'react';

interface UseModalEffectsProps {
  open: boolean;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
}

export function useModalEffects({ open, titleRef }: UseModalEffectsProps) {
  // 모달 열릴 때 포커스 및 스크롤 제어
  useEffect(
    function initModal() {
      if (open) {
        // 접근성 요구사항: 모달 제목으로 포커스 이동
        setTimeout(() => titleRef.current?.focus(), 0);
      }
    },
    [open, titleRef],
  );
}
