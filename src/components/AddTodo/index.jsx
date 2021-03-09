import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_TODO } from '../../graph-ql';
import './styles.scss';

const AddTodo = ({setTodos}) => {
    const [addTodo, { data }] = useMutation(ADD_TODO);
    const [todo,setTodo] = useState('');
    const handelAddTodo = () => {
        addTodo({ variables: { todo, isDone: false } });
        setTodo('');
    }
    useEffect(() => {
        data && setTodos((prev) =>  [data.addTodo,...prev]);
    }, [data, setTodos]);
    return (
        <div className='addTodo'>
            <div className='addForm'>
                <input value={todo} onChange={(e) => setTodo(e.target.value)} type='text' />
                <button onClick={handelAddTodo}>Add Todo</button>
            </div>
        </div>
    );
}

export default AddTodo;
