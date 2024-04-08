import React, {useState, useEffect} from 'react';
import {FaPlus, FaTrash} from 'react-icons/fa'; 

function ToDoList(){

    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    const [newTask, setNewTask] = useState('');
    const [newDate, setNewDate] = useState('');
    const [completedTasks, setCompletedTasks] = useState(JSON.parse(localStorage.getItem('completedTasks')) || []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }, [tasks, completedTasks]);

    function handleInputChange(e){
        setNewTask(e.target.value);
    }

    function handleDateChange(e){
        setNewDate(e.target.value);
    }

    function addTask(){
        if(newTask !== '' && newDate !== ''){
            setTasks([...tasks, {task: newTask, date: newDate}]);
            setNewTask('');
            setNewDate('');
        }
    }

    function deleteTask(index){
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }

    function toggleTask(index){
        const newCompletedTasks = [...completedTasks];
        if (newCompletedTasks.includes(index)) {
            newCompletedTasks.splice(newCompletedTasks.indexOf(index), 1);
        } else {
            newCompletedTasks.push(index);
        }
        setCompletedTasks(newCompletedTasks);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return(
        <div className='min-vh-100' style={{backgroundColor:'#bad6eb'}}>
            <h1 className='text-center p-3' style={{fontFamily:'Kola'}}>To-Do-List</h1>
            <div className='d-flex justify-content-center align-items-center gap-3'>
                <div className='col-3'>
                    <input
                    className='form-control m-2' 
                    type='text' 
                    placeholder='New Task'
                    value={newTask} onChange={handleInputChange}/>
                </div>
                
                <div className='col-3'>
                    <input
                    className='form-control m-2' 
                    type='date' 
                    value={newDate} onChange={handleDateChange} required/>
                </div>
                
                <button
                className='btn btn-primary m-2 ms-0'
                 onClick={addTask}>
                 <FaPlus/>
                 </button>
            </div>

            <p style={{fontSize:'6', color:'#34513a'}} className='text-center mt-4'>Things TO DO </p>
            
            <div className='d-flex justify-content-center align-items-center'>

                <ul className='d-flex flex-column gap-4 m-3 list-unstyled'>
                {tasks.map(({task, date}, index) => 
                    <li key={index}
                    style={{backgroundColor: '#fff9f0'}}
                    className={`fs-4 rounded-3 text-danger p-2 d-flex justify-content-between align-items-center ${completedTasks.includes(index) ? 'text-decoration-line-through' : ''}`}>
                        <input type='checkbox' className='ms-2 me-3' style={{transform: 'scale(1.5)'}} onChange={() => toggleTask(index)}/>
                        
                        <span style={{color:'#081f5c'}} className='me-3'>{task} - {formatDate(date)}</span>
                        <button className='btn btn-danger ml-auto' onClick={() => deleteTask(index)}>
                            <FaTrash/>
                        </button>
                        </li>
                )}
            </ul>
                </div>
            
            </div>
     
    )
}
export default ToDoList;