// src/hooks/useCommand.ts
import { useRecoilState } from 'recoil';
import { commandStackState, redoStackState } from '../atoms/commandAtom';
import { Command } from '../commands/Command';

export const useCommand = () => {
  const [commandStack, setCommandStack] = useRecoilState(commandStackState);
  const [redoStack, setRedoStack] = useRecoilState(redoStackState);

  /**
   * 🔄 Stack에 Command 추가
   */
  const pushToStack = (
    stackSetter: typeof setCommandStack,
    command: Command,
  ) => {
    console.log(`📌 [pushToStack] Adding Command to Stack:`, command);
    stackSetter((prev) => {
      const newStack = [...prev, command];
      console.log('🗂️ [pushToStack] New Stack:', newStack);
      return newStack;
    });
  };

  /**
   * 🔄 Stack에서 마지막 Command 추출
   */
  const popLastCommand = (
    stackSetter: typeof setCommandStack,
  ): Command | null => {
    let lastCommand: Command | null = null;

    // ✅ 최신 상태를 다시 불러와서 업데이트
    stackSetter((prev) => {
      if (prev.length === 0) {
        console.log('⚠️ No Command to process');
        return prev;
      }
      lastCommand = prev[prev.length - 1] as Command; // 🔥 Type Assertion 추가
      console.log('⏪ Undo Command Found:', lastCommand);
      return prev.slice(0, -1);
    });

    console.log(`📌 [popLastCommand] Extracted Command:`, lastCommand);
    return lastCommand;
  };

  /**
   * ✅ 명령 실행
   */
  const execute = (command: Command) => {
    console.log('🔥 Executing Command:', command);
    command.execute();
    pushToStack(setCommandStack, command); // 🔥 스택에 커맨드 추가
    console.log('🗂️ [execute] Current Command Stack:', commandStack);
    setRedoStack([]); // 🔥 새로운 명령 실행 시 Redo Stack 초기화
  };

  /**
   * ⏪ 실행 취소
   */
  const undo = () => {
    console.log('⏪ Undo 실행');
    console.log('🗂️ [undo] Current Command Stack:', commandStack);

    const lastCommand = popLastCommand(setCommandStack); // ✅ 최신 상태에서 추출
    if (lastCommand) {
      console.log('🔄 Redo Stack에 추가됨:', lastCommand);
      pushToStack(setRedoStack, lastCommand);
      lastCommand.undo();
    } else {
      console.log('⚠️ Undo할 커맨드가 없습니다.');
    }
  };

  /**
   * ↩️ 다시 실행
   */
  const redo = () => {
    console.log('↩️ Redo 실행');
    const lastUndoCommand = popLastCommand(setRedoStack); // ✅ 최신 상태에서 추출
    if (lastUndoCommand) {
      console.log('↩️ Redo Command Found:', lastUndoCommand);
      lastUndoCommand.execute();
      pushToStack(setCommandStack, lastUndoCommand);
    }
  };

  return { execute, undo, redo };
};
