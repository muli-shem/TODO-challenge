export interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  export type TodoAction =
    | { type: 'ADD_TODO'; text: string }
    | { type: 'TOGGLE_TODO'; id: number }
    | { type: 'DELETE_TODO'; id: number }
    | { type: 'CLEAR_COMPLETED' }
    | { type: 'EDIT_TODO'; id: number; text: string };
  
  export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          { id: Date.now(), text: action.text, completed: false },
        ];
      case 'TOGGLE_TODO':
        return state.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        );
      case 'DELETE_TODO':
        return state.filter((todo) => todo.id !== action.id);
      case 'CLEAR_COMPLETED':
        return state.filter((todo) => !todo.completed);
      case 'EDIT_TODO':
        return state.map((todo) =>
          todo.id === action.id ? { ...todo, text: action.text } : todo
        );
      default:
        return state;
    }
  };
  