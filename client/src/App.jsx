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
      fontFamily:"Arial",
      background:"linear-gradient(135deg,#4facfe,#00f2fe)",
      minHeight:"100vh",
      padding:"40px"
    }}>

      <div style={{
        maxWidth:"800px",
        margin:"auto",
        background:"white",
        padding:"35px",
        borderRadius:"15px",
        boxShadow:"0 20px 40px rgba(0,0,0,0.2)"
      }}>

        <h1 style={{
          textAlign:"center",
          marginBottom:"5px"
        }}>
          Smart Task Board
        </h1>

        <p style={{
          textAlign:"center",
          color:"#666",
          marginBottom:"25px"
        }}>
          Tasks {completed} / {tasks.length} Completed
        </p>

        <div style={{
          display:"flex",
          gap:"10px",
          marginBottom:"25px"
        }}>

          <input
            placeholder="Enter task..."
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            style={{
              flex:1,
              padding:"12px",
              borderRadius:"6px",
              border:"1px solid #ddd"
            }}
          />

          <select onChange={(e)=>setCategory(e.target.value)}>
            <option>Work</option>
            <option>Personal</option>
            <option>Study</option>
          </select>

          <select onChange={(e)=>setPriority(e.target.value)}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button
            onClick={addTask}
            style={{
              background:"#2563eb",
              color:"white",
              border:"none",
              padding:"12px 18px",
              borderRadius:"6px",
              cursor:"pointer",
              fontWeight:"bold"
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
              marginBottom:"15px",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              borderLeft:`8px solid ${priorityColor(task.priority)}`,
              boxShadow:"0 8px 18px rgba(0,0,0,0.08)"
            }}
          >

            <div>

              <div style={{
                fontWeight:"bold",
                fontSize:"16px"
              }}>
                {task.title}
              </div>

              <div style={{
                fontSize:"13px",
                color:"#666"
              }}>
                {task.category}

                <span style={{
                  marginLeft:"10px",
                  background:priorityColor(task.priority),
                  color:"white",
                  padding:"3px 8px",
                  borderRadius:"5px",
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
                  borderRadius:"5px",
                  cursor:"pointer"
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
                  borderRadius:"5px",
                  cursor:"pointer"
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