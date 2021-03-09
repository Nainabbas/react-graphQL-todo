import React, { useState, useEffect } from 'react';
import './styles.scss';

import AddTodo from '../AddTodo';
import { useQuery,useMutation } from '@apollo/client';
import { GET_TODOS, DELETE_TODO, UPDATE_TODO } from '../../graph-ql';

export const Todos = () => {
    const { loading, error, data : dataTodos } = useQuery(GET_TODOS);
    const [deleteTodo, { data : dataDelete }] = useMutation(DELETE_TODO);
    const [updateTodo, { data : dataUpdate }] = useMutation(UPDATE_TODO);

    const [todos,setTodos] = useState([]);

    const handelDelete = (id) => {
        deleteTodo({ variables: { id } });
    }
    const handelUpdate = (todo) => {
        updateTodo({ variables: {...todo, isDone: !todo.isDone } });
    }

    useEffect(() => {
        setTodos(dataTodos?.todos || [])
    }, [dataTodos]);

    useEffect(() => {
        let id = dataDelete?.deleteTodo?.id;
        if(id)
        setTodos((prev) => prev.filter(item => item.id !== id));
    }, [dataDelete]);

    useEffect(() => {
        let updated = dataUpdate?.updateTodo;
        if(updated)
        setTodos((prev) => prev.map(item => { 
            if (item.id === updated.id){
                return updated;
            }
            return item;
        }));
    }, [dataUpdate]);
    return (
        <div className='todos'>
            <h2>Todos</h2>
            <AddTodo setTodos={setTodos} />
            { error && <> Error Loading!</>}
            {loading ? 
                <>Loading...</> 
                : 
                todos.map(todo => 
                <div key={todo.id} className='todo' >
                    <label>{todo.todo}</label>
                    <div><input type='checkbox' checked={todo.isDone} onChange={()=>handelUpdate(todo)} />
                    <span className='_delete' onClick={() => handelDelete(todo.id)} >delete</span> </div>
                </div>)
            }
        </div>
    );
}
