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

  const priorityColor = (p)=>{
    if(p==="High") return "#ef4444"
    if(p==="Medium") return "#f59e0b"
    return "#22c55e"
  }

  const completed = tasks.filter(t=>t.status==="Completed").length

  return(

    <div style={{
      fontFamily:"Inter, Arial",
      background:"linear-gradient(135deg,#667eea,#764ba2)",
      minHeight:"100vh",
      padding:"60px"
    }}>

      <div style={{
        maxWidth:"800px",
        margin:"auto",
        background:"rgba(255,255,255,0.95)",
        padding:"40px",
        borderRadius:"20px",
        boxShadow:"0 30px 60px rgba(0,0,0,0.25)"
      }}>

        <h1 style={{
          textAlign:"center",
          marginBottom:"8px",
          fontSize:"34px",
          fontWeight:"700"
        }}>
          Smart Task Board
        </h1>

        <p style={{
          textAlign:"center",
          color:"#666",
          marginBottom:"30px"
        }}>
          {completed} / {tasks.length} Tasks Completed
        </p>

        <div style={{
          display:"flex",
          gap:"10px",
          marginBottom:"30px"
        }}>

          <input
            placeholder="Add new task..."
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            style={{
              flex:1,
              padding:"14px",
              borderRadius:"8px",
              border:"1px solid #ddd",
              fontSize:"14px"
            }}
          />

          <select
            onChange={(e)=>setCategory(e.target.value)}
            style={{
              padding:"12px",
              borderRadius:"8px",
              border:"1px solid #ddd"
            }}
          >
            <option>Work</option>
            <option>Personal</option>
            <option>Study</option>
          </select>

          <select
            onChange={(e)=>setPriority(e.target.value)}
            style={{
              padding:"12px",
              borderRadius:"8px",
              border:"1px solid #ddd"
            }}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button
            onClick={addTask}
            style={{
              background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
              color:"white",
              border:"none",
              padding:"14px 18px",
              borderRadius:"8px",
              fontWeight:"600",
              cursor:"pointer"
            }}
          >
            Add
          </button>

        </div>

        {tasks.map(task=>(

          <div key={task._id}
            style={{
              background:"#ffffff",
              padding:"20px",
              borderRadius:"12px",
              marginBottom:"12px",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              borderLeft:`6px solid ${priorityColor(task.priority)}`,
              boxShadow:"0 10px 20px rgba(0,0,0,0.08)",
              transition:"0.2s"
            }}
          >

            <div>

              <div style={{
                fontWeight:"600",
                fontSize:"16px",
                marginBottom:"4px"
              }}>
                {task.title}
              </div>

              <div style={{
                fontSize:"12px",
                color:"#888"
              }}>
                {task.category}

                <span style={{
                  marginLeft:"10px",
                  background:priorityColor(task.priority),
                  color:"white",
                  padding:"3px 8px",
                  borderRadius:"6px",
                  fontSize:"11px"
                }}>
                  {task.priority}
                </span>

              </div>

            </div>

            <div style={{
              display:"flex",
              gap:"8px"
            }}>

              <button
                onClick={()=>toggleStatus(task._id)}
                style={{
                  background: task.status === "Completed" ? "#22c55e" : "#f59e0b",
                  color:"white",
                  border:"none",
                  padding:"7px 12px",
                  borderRadius:"6px",
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
                  padding:"7px 12px",
                  borderRadius:"6px",
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