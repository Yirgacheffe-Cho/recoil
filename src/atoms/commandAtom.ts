// src/atoms/commandAtom.ts
import { atom } from 'recoil';
import { Command } from '../commands/Command';

const STACK_SIZE = 20; // 🔥 스택 크기 제한

export const commandStackState = atom<Command[]>({
  key: 'commandStackState',
  default: [],
});

export const redoStackState = atom<Command[]>({
  key: 'redoStackState',
  default: [],
});

// ✅ 스택 사이즈를 유지하는 함수
export const pushToStack = (stack: Command[], command: Command) => {
  if (stack.length >= STACK_SIZE) {
    stack.shift(); // 🔥 가장 오래된 커맨드 삭제
  }
  stack.push(command);
  return [...stack];
};
