import { useEffect, useState } from "react";

function App() {

  const API = "http://localhost:8000/tasks";

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");

  // โหลด task จาก server
  const loadTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // เพิ่ม task
  const addTask = async () => {

    if (!title) {
      alert("กรอกชื่องานก่อน");
      return;
    }

    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        category,
        priority
      })
    });

    const newTask = await res.json();

    setTasks([...tasks, newTask]);
    setTitle("");
  };

  // toggle status
  const toggleStatus = (id) => {

    const updated = tasks.map(task => {
      if (task._id === id) {
        return {
          ...task,
          status: task.status === "Pending" ? "Completed" : "Pending"
        };
      }
      return task;
    });

    setTasks(updated);
  };

  return (

    <div style={{
      fontFamily: "Arial",
      background: "#f4f6f8",
      minHeight: "100vh",
      padding: "40px"
    }}>

      <div style={{
        maxWidth: "700px",
        margin: "auto",
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
      }}>

        <h1 style={{textAlign:"center"}}>Smart Task Board</h1>

        <div style={{display:"flex", gap:"10px", marginBottom:"20px"}}>

          <input
            placeholder="Task name"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            style={{flex:1,padding:"10px"}}
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
              padding:"10px 15px",
              borderRadius:"5px"
            }}
          >
            Add
          </button>

        </div>

        {tasks.map(task => (

          <div key={task._id}
            style={{
              background:"#f9fafb",
              padding:"15px",
              borderRadius:"8px",
              marginBottom:"10px",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center"
            }}
          >

            <div>

              <div style={{fontWeight:"bold"}}>
                {task.title}
              </div>

              <div style={{fontSize:"13px",color:"#555"}}>
                {task.category} • {task.priority}
              </div>

            </div>

            <button
              onClick={()=>toggleStatus(task._id)}
              style={{
                background: task.status === "Completed" ? "#16a34a" : "#f59e0b",
                color:"white",
                border:"none",
                padding:"6px 12px",
                borderRadius:"5px"
              }}
            >
              {task.status}
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;