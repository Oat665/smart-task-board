import { useEffect, useState } from "react";

function App() {

  const API = "https://smart-task-board-tuh9.onrender.com/tasks";

  const [tasks,setTasks] = useState([]);
  const [title,setTitle] = useState("");
  const [category,setCategory] = useState("Work");
  const [priority,setPriority] = useState("Medium");

  const loadTasks = async()=>{
    const res = await fetch(API);
    const data = await res.json();
    setTasks(data);
  }

  useEffect(()=>{
    loadTasks();
  },[])

  const addTask = async()=>{

    if(!title){
      alert("Please enter task");
      return;
    }

    const res = await fetch(API,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        title,
        category,
        priority
      })
    })

    const newTask = await res.json();

    setTasks([...tasks,newTask]);
    setTitle("");

  }

  const toggleStatus = (id)=>{

    const updated = tasks.map(task=>{
      if(task._id === id){
        return{
          ...task,
          status: task.status === "Pending" ? "Completed":"Pending"
        }
      }
      return task
    })

    setTasks(updated)

  }

  const deleteTask = async(id)=>{

    const confirmDelete = window.confirm("Delete this task?")
    if(!confirmDelete) return

    await fetch(`${API}/${id}`,{
      method:"DELETE"
    })

    setTasks(tasks.filter(task=>task._id !== id))

  }

  const completed = tasks.filter(t=>t.status==="Completed").length

  return(

    <div style={{
      fontFamily:"Inter, Arial",
      background:"#f5f5f5",
      minHeight:"100vh",
      padding:"50px"
    }}>

      <div style={{
        maxWidth:"650px",
        margin:"auto",
        background:"#ffffff",
        padding:"40px",
        borderRadius:"12px",
        boxShadow:"0 5px 15px rgba(0,0,0,0.05)"
      }}>

        <h1 style={{
          textAlign:"center",
          marginBottom:"10px",
          fontWeight:"600"
        }}>
          Smart Task Board
        </h1>

        <p style={{
          textAlign:"center",
          color:"#888",
          marginBottom:"30px"
        }}>
          {completed} of {tasks.length} tasks completed
        </p>

        <div style={{
          display:"flex",
          gap:"10px",
          marginBottom:"25px"
        }}>

          <input
            placeholder="Add new task..."
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            style={{
              flex:1,
              padding:"12px",
              border:"1px solid #ddd",
              borderRadius:"6px"
            }}
          />

          <select
            onChange={(e)=>setCategory(e.target.value)}
            style={{
              border:"1px solid #ddd",
              borderRadius:"6px",
              padding:"10px"
            }}
          >
            <option>Work</option>
            <option>Personal</option>
            <option>Study</option>
          </select>

          <select
            onChange={(e)=>setPriority(e.target.value)}
            style={{
              border:"1px solid #ddd",
              borderRadius:"6px",
              padding:"10px"
            }}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button
            onClick={addTask}
            style={{
              background:"#111",
              color:"white",
              border:"none",
              padding:"12px 16px",
              borderRadius:"6px",
              cursor:"pointer"
            }}
          >
            Add
          </button>

        </div>

        {tasks.map(task=>(

          <div key={task._id}
            style={{
              background:"#fafafa",
              padding:"16px",
              borderRadius:"8px",
              marginBottom:"10px",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              border:"1px solid #eee"
            }}
          >

            <div>

              <div style={{
                fontWeight:"500",
                marginBottom:"3px"
              }}>
                {task.title}
              </div>

              <div style={{
                fontSize:"12px",
                color:"#888"
              }}>
                {task.category} • {task.priority}
              </div>

            </div>

            <div style={{
              display:"flex",
              gap:"8px"
            }}>

              <button
                onClick={()=>toggleStatus(task._id)}
                style={{
                  background: task.status === "Completed" ? "#22c55e" : "#e5e5e5",
                  color: task.status === "Completed" ? "white" : "#333",
                  border:"none",
                  padding:"6px 10px",
                  borderRadius:"5px",
                  cursor:"pointer",
                  fontSize:"12px"
                }}
              >
                {task.status}
              </button>

              <button
                onClick={()=>deleteTask(task._id)}
                style={{
                  background:"#ef4444",
                  color:"white",
                  border:"none",
                  padding:"6px 10px",
                  borderRadius:"5px",
                  cursor:"pointer",
                  fontSize:"12px"
                }}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}

export default App;