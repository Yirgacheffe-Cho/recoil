// src/hooks/useUndoRedo.ts
import { useEffect } from 'react';
import { useCommand } from './useCommand';
import { useRecoilState } from 'recoil';
import { commandStackState, redoStackState } from '../atoms/commandAtom';

export const useUndoRedo = () => {
  const { undo, redo } = useCommand();
  const [, setCommandStack] = useRecoilState(commandStackState);
  const [, setRedoStack] = useRecoilState(redoStackState);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'z') {
        console.log('⏪ Ctrl + Z -> Undo');
        undo();
      }
      if (event.ctrlKey && event.key === 'y') {
        console.log('↩️ Ctrl + Y -> Redo');
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // ✅ 의존성을 빈 배열로 변경하여 페이지 언마운트 시에만 클린업 실행
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      console.log('🗑️ 페이지 언마운트 -> Command Stack 비우기');
      setCommandStack([]); // 🔥 페이지 전환 시 초기화
      setRedoStack([]); // 🔥 페이지 전환 시 초기화
    };
  }, []); // 🔥 의존성 배열 비워줌
};
