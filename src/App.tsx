import React, { useState, useRef } from "react";

type Formelement = React.FormEvent<HTMLFormElement>;

interface iTask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  //new task
  const [Newtask, setNewtask] = useState<string>("");
  //save task
  const [Tasks, setTasks] = useState<iTask[]>([]);
  //ref
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: Formelement): void => {
    e.preventDefault();
    //save the task that i have in Newtask
    saveTask(Newtask);
    setNewtask("");
    taskInput.current?.focus();
  };
  //save task function
  const saveTask = (name: string): void => {
    const savedTask: iTask[] = [...Tasks, { name, done: false }];
    setTasks(savedTask);
  };
  // task complete
  const toggleDoneTask = (i: number): void => {
    const savedTask: iTask[] = [...Tasks];
    savedTask[i].done = !savedTask[i].done;
    setTasks(savedTask);
  };
  //remove task
  const removeTask = (i: number): void => {
    const savedTask: iTask[] = [...Tasks];
    savedTask.splice(i, 1);
    setTasks(savedTask);
  };
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Insert Task</h1>
          <div className="card">
            <div className="card card-body">
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setNewtask(e.target.value)}
                  value={Newtask}
                  autoFocus
                  ref={taskInput}
                />

                <button className="btn btn-warning btn-block mt-2">Save</button>
              </form>
            </div>
          </div>

          {Tasks.map((t: iTask, i: number) => (
            <div className="card card-body mt-2" key={i}>
              <h5 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.name}
              </h5>
              <div>
                <button
                  className="btn btn-danger"
                  onClick={() => toggleDoneTask(i)}
                >
                  {t.done ? "✓" : "✗"}
                </button>
                <button className="btn btn-info" onClick={() => removeTask(i)}>
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
