import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {v1 as uuid} from 'uuid';

import { Todo } from './type';
import { stringify } from 'querystring';

const todosInitialState: Todo[] = [
  {
    id: uuid(),
    desc: "Learn React",
    isComplete: true
  },
  {
    id: uuid(),
    desc: "Learn Redux",
    isComplete: true
  },
  {
    id: uuid(),
    desc: "Learn Redux-ToolKit",
    isComplete: false
  }
];

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosInitialState,
  reducers: {
    create: {
      reducer: (state, { payload }: PayloadAction<{id: string, desc: string, isComplete: boolean}>) => {
        state.push(payload)
      },
      // this prepare runs first, then it return to reducer, so reducer could have payload from the prepare.
      prepare: ({ desc }: { desc: string}) => ({
        payload: {
          id: uuid(),
          desc,
          isComplete: false
        }
      })
    },
    edit: (state, { payload }: PayloadAction<{id: string,  desc: string}>) => {
      const todo = state.find(todo => todo.id === payload.id)
      if (todo) {
        todo.desc = payload.desc // mutation here only works cuz we have immer. Otherwise, we cannot mutate state.
      }
    },
    toggle: (state, { payload }: PayloadAction<{id: string, isComplete: boolean}>) => {
      const todo = state.find(todo => todo.id === payload.id)
      if (todo) {
        todo.isComplete = payload.isComplete
      }
    },
    remove: (state, { payload }: PayloadAction<{id: string}>) => {
      state.filter(todo => todo.id !== payload.id )
    }
  }
})
