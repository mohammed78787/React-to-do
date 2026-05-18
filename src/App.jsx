import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

  
  // let [tasks,setTasks] = useState([])
  // let inputRef = useRef(null)
  // function add(){
  //   let text = inputRef.current.value
  //   let newItem = {completed:false,text}
  //   setTasks([...tasks,newItem]) 
  //   inputRef.current.value=``
  // }

  // // let deleteTask = (index) => {
  // //   let tasksCopy = [...tasks] // we need to make a copy of the tasks array before modifying it,
  // //   //  becuse react must sees a changes in the reference of the array to trigger a re-render. 
  // //   // If we directly modify the original tasks array,
  // //   //  React may not detect the change beacuse the reference hasn't changed so he thinks that the state is the same 
  // //   // and doesn't re-render the component
  // //   // سبلايس بتعدل فى الأراى الأصلية وبالتالى الريفيرنس مش بيتغير وده بيخلى رياكت مش عارف ان فى تغيير حصل فى الستيت
  // //   //  عشان كده لازم نعمل كوبي من الأراى وبعدين نعدل فى الكوبي وبعدين نستخدم الكوبي لتحديث الستيت
  // //   // عشان كده استخدام فيلتر اسهل لأنه بيرجع أراى جديدة ومش بيعدل فى الأراى الأصلية
  // //   tasksCopy.splice(index,1)
  // //   {setTasks(tasksCopy) } 
  
  // // } 
  

  // // using filter 
  // let deleteTask = (index) => {
  //   let tasksCopy = tasks.filter((item,i) => i !== index)  
  //   setTasks(tasksCopy)
  //  }// filter بيرجع أراى جديدة بتحتوى العناصر اللي بتتوافق مع الشرط اللي احنا حاطينه


  //  let done = (index) => {
  //   let tasksCopy = [...tasks]
  //   tasksCopy[index].completed= !tasksCopy[index].completed
  //   setTasks(tasksCopy)
  //   console.log(tasksCopy)
  //   }
    
  
  // return (
  //   <div >
  //     <h1> To Do List</h1>
  //     <ul>
  //       {tasks.map(({completed,text},index) => {
  //         return (
  //       <div>
  //          <li onClick={()=> {done(index) }  }
  //           className={completed?"completed":""}
  //           > {text} </li>
  //           <button onClick={()=>deleteTask(index)}>delete</button>
  //         </div> )}) }
  //     </ul>

  //     <input type="text" placeholder="Add a new task" ref={inputRef} />
  //     <button onClick={add}>Add Task</button>
      
  //   </div>
  // );


  // Important

//   In Vanilla JavaScript You manually control everything.

// So if tasks change, YOU must remember to save:

// addTask()
// saveToLocalStorage()
// deleteTask()
// saveToLocalStorage()
// editTask()
// saveToLocalStorage()
// but in React, you can centralize this logic using useEffect:

//   useEffect(() => {
//   localStorage.setItem("tasks", JSON.stringify(tasks))
// }, [tasks])

// This means:

// “Whenever tasks changes, run this code.”

// So instead of manually saving in every function:

// add -> save
// delete -> save
// edit -> save

// You centralize everything in one place.

              //localStorage 
// loclStorage is only used to initialize state. After that, state controls everything.

// savedTasks becomes irrelevant until refresh
// 💡 That’s why this works When you delete:
// React updates from state directly. Not from localStorage.
// if u delete a a task
// 1- React updates the UI (re-render) based on the new state, not based on localStorage.
// 2- Then useEffect runs after re-render and updates localStorage to match the new state.
// so localStorage is only used when the user refreshes the page

// Whenever tasks changes:
// 1-component re-renders
// 2-useEffect runs after render 
// 3-localStorage updates automatically
// state change → render → useEffect

  // doing it again 100% alone without looking at the previous code or the video




  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || []
  let [tasks,setTasks] = useState(savedTasks)
  let [editTask,setEditTask] = useState(null)
  let inputRef = useRef(null)
  useEffect(() => {
    localStorage.setItem("tasks",JSON.stringify(tasks))
   },[tasks])

   let [dragIndex, setDragIndex] = useState(null)

  let add = () => {
    let text = inputRef.current.value
    if(text.trim()=='') {
      inputRef.current.focus()
      return
    }   //without trim spaces '    ' would still count as text.

    if (editTask !== null) { 
      let tasksCopy = [...tasks] //React re-renders when it detects a new reference in state.
      tasksCopy[editTask].text = text
      setTasks(tasksCopy)
      setEditTask(null)
      inputRef.current.focus()

    }
    else {
          let newItem = {completed:false,text}
          setTasks([...tasks,newItem])
          inputRef.current.focus()
    }

    inputRef.current.value=``
  }

  let lineThrough = (i) => {
    let tasksCopy = [...tasks] //React re-renders when it detects a new reference in state.
    tasksCopy[i].completed = !tasksCopy[i].completed
    setTasks(tasksCopy)
    console.log(tasksCopy)

   }
   let deleteTask = (i) => {
    if(editTask==i) {
      setEditTask(null)
      inputRef.current.value=``
      
    }
    let tasksCopy = [...tasks]
    tasksCopy.splice(i,1)
    setTasks(tasksCopy)
   }
   
let edit = (i) => { 
    inputRef.current.value = tasks[i].text
    inputRef.current.focus() // to focus on the input field when we click the edit button
  setEditTask(i)
}


// deag and drop 
let handleDragStart = (i) => {
  setDragIndex(i)
}

let handleDragOver = (e) => {
  e.preventDefault() // required to allow drop
}

let handleDrop = (i) => {
  if (dragIndex === null) return

  let tasksCopy = [...tasks]

  let draggedItem = tasksCopy[dragIndex]

  tasksCopy.splice(dragIndex, 1)
  tasksCopy.splice(i, 0, draggedItem)

  setTasks(tasksCopy)
  setDragIndex(null)
}
// It’s a real web app, and when installed it behaves almost like a native mobile app 
// — but technically it’s a 👉 Progressive Web App (PWA)
// Big companies use PWAs too:
// Examples:
// Twitter Lite
// Starbucks PWA
// Pinterest PWA


  return (
    <div className='todo'
    >
      <h1 > To Do List</h1>
      <ul> 
        {tasks.map(({text,completed},index)=> {  // order of properties is not important in object destructurng
        //it depends on properties names not their order
          return (
          <div className='task-container'
           key={index}
         
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index)}
          >
            <div className='task-edit'> 
            <span onClick={()=>edit(index)}>✍️</span>  {/* //to edit the task */}
          <li  onClick={()=>lineThrough(index)}       // check if the task is done or not
            className = {completed?'completed':``} 
            >{text}
          </li>
          </div>

          <span onClick={()=>deleteTask(index)}
                className='delete'
            >🙅</span>
          </div>
        )
        })}



    </ul>
    {/* onKeyDown is a React event handler that runs every time you press a key while the input is focused */}
    <input type="text" placeholder="Add a new task" ref={inputRef} onKeyDown={(e)=>e.key ==='Enter' && add()}/>
    <button onClick={add}>{editTask !== null ? "Save Changes" : "Add Task"}</button>
    </div>

  )
}

export default App;
