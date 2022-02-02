import React, { useState, useRef } from 'react';
import { FaCheck, FaPencilAlt } from 'react-icons/fa'

function Todo(props) {
    const [style, setStyle] = useState(props.style);
    setTimeout(() => {
        setStyle({animationDelay: style.animationDelay, opacity: 1});
    }, style.animationDelay.split('ms')[0]);

    return (
        <div style={style} className='text-teal-600 flex justify-between border-b-gray-300 border-b-[1px] py-3 text-right mr-4 animate-slideIn'>
            <div className='w-7 h-7 mr-4 cursor-pointer'><FaCheck size={25} onClick={() => props.onCheck(props.value)} /></div>
            <p>{props.todo}</p>
        </div>
    )
}

function Todos() {
    const todoList = JSON.parse(window.localStorage.getItem('todoList'));

    const [todos, setTodos] = useState(todoList);
    const [addFlag, setAddFlag] = useState(false);
    const input = useRef();

    function handleKeyDown(e) {
        (e.key === 'Enter') && handleWrite();
    }

    function handleWrite() {
        let newTodos = todos.slice(0);
        newTodos.push(input.current.value);
        setAddFlag(true);
        setTodos(newTodos);

        window.localStorage.setItem('todoList', JSON.stringify(newTodos));

        input.current.value = '';
    }

    function handleCheck(i) {
        let newTodos = todos.slice(0);
        newTodos.splice(i, 1);
        setTodos(newTodos);

        console.log(newTodos);

        window.localStorage.setItem('todoList', JSON.stringify(newTodos));
    }

    const tL = todos.map((todo, i) => {
        if(!addFlag) return <Todo key={`todo-${i}`} todo={todo} value={i} onCheck={(x) => handleCheck(x)} style={{animationDelay: `${i * 100}ms`, opacity: 0}}/>;

        return <Todo key={`todo-${i}`} todo={todo} value={i} onCheck={(x) => handleCheck(x)} style={{animationDelay: `0ms`, opacity: 1}}/>;
    });

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='w-1/3 h-4/6 flex flex-col flex-wrap items-center rounded-md'>
                <div className='w-full border-b-gray-300 border-b-[1px] pb-4'>
                    <h1 className='font-semibold text-teal-600 p-2 w-full text-center text-3xl'>Todos</h1>
                    <div className='text-gray-400 w-full flex justify-center'>
                        <input ref={input} className=' w-2/3 text-teal-600 border-[1px] border-gray-300 focus:outline-none focus:border-teal-600 transition duration-200 pl-1'
                            placeholder='Escriba una nueva tarea:'
                            onKeyDown={(e) => handleKeyDown(e)}></input>
                        <div className='ml-2 cursor-pointer'><FaPencilAlt size={25} onClick={() => handleWrite()} /></div>
                    </div>
                </div>
                <div className='w-3/4 h-4/6 mt-3 overflow-y-auto overflow-x-hidden'>
                    {tL}
                </div>
            </div>
        </div>
    )
}

export default Todos;