import { gql } from '@apollo/client';

export const ADD_TODO = gql`
  mutation AddTodo($todo: String!, $isDone: Boolean!) {
    addTodo(todo: $todo, isDone: $isDone) {
      id,
      todo,
      isDone
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id){
        id
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $todo: String!, $isDone: Boolean!) {
        updateTodo(id: $id, todo: $todo, isDone: $isDone ){
            id,
            todo,
            isDone
       }
  }
`;