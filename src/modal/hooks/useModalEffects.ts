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
        // 배경 스크롤 방지
        document.body.style.overflow = 'hidden';
        // 접근성 요구사항: 모달 제목으로 포커스 이동
        setTimeout(() => titleRef.current?.focus(), 0);
      } else {
        // 배경 스크롤 복원
        document.body.style.overflow = 'unset';
      }

      // 클린업 함수
      return () => {
        document.body.style.overflow = 'unset';
      };
    },
    [open, titleRef],
  );
}
