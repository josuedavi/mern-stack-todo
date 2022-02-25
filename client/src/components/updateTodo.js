import { useEffect, useState } from "react";
import axios from "axios";

export function UpdateTodo({ _id, toggle, setShow, item}) {
    const [data, setData] = useState({ title: "", description: "" });
    const [update, setUpdate] = useState(null);
    useEffect(() => {
        run()
       console.log(data)
    }, [update])
    
    function run() {
      axios
          .get("http://localhost:8000/todo")
          .then((res) => {
              // console.log(res.data);
              setData(res.data);
          })
          .catch((err) => {
              console.log(err.message);
          });
    }

    
    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log({ _id }, { data });

        axios
            .put(`http://localhost:8000/${_id}`, data)
            .then((res) => {
                setData({ title: "", description: "" });
                console.log(res.data.message);
                run()
            })
            .catch((err) => {
                console.log("Failed to update todo");
                console.log(err.message);
            });
             setShow(true)
             toggle(true)
           
    }

    return (
        <form
            className="form-container"
            onSubmit={(e) => {
                handleSubmit(e);
                handleChange(e);
            }}
        >
           <div style={{textAlign: "center"}}>
       
         
        
                <h1>Update Task  <input
                      type="text"
                      name="title"
                      id="text"
                      value={data.title}
                      onChange={handleChange}
                     
               
                  />
                </h1>
                  <input  size="60" type="submit" className="green" className="same btn btn-block" value={`Change ${item}`}/>
                    
                 
         </div>
      

        </form>
    );
}