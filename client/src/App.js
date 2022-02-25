import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ScrollArea from "react-scrollbar";
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { UpdateTodo } from './components/updateTodo';

const CloseIcon = (props) =>(
  <svg className={props.svgClass} xmlns="http://www.w3.org/2000/svg" fill={props.fill} viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
)

//
function App() {

  const [data, setData] = useState({ title: "", description: "" });
  const [item, setItem] = useState({ title: "", description: "" });
  const [toggle, setToggle] = useState(true)
  const [newValue, setNewValue] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [show, setShow] = useState(true);
  useEffect(() => {
    run()
  })

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
      setItem((data) => ({ ...data, title: e.target.value} ));
  }

  function handleSubmit(e) {
      e.preventDefault();

      axios
          .post("http://localhost:8000/post/todo", item)
          .then((res) => {
               setItem({ title: "", description: "" });
              console.log(res.data.message);
              run()
          })
          .catch((err) => {
              console.log("Error couldn't create TODO");
              console.log(err.message);
          });
  }


  function del(id) {
    axios
    .delete("http://localhost:8000/" + id._id)
    .then((res) => {
        console.log("item deleted")
        run()
        setShow(true)
        setToggle(true)
    })
    .catch((err) => {
        console.log(err.message);
    });
    // console.log(id._id)
  }

  function updateTask( id, newValue) {
    // e.preventDefault();

    console.log({ id }, { data });

    axios
        .put('http://localhost:8000/ '+id._id, newValue)
        .then((res) => {
            setData({ title: "", description: "" });
            console.log(res.data.message);
            run()
        })
        .catch((err) => {
            console.log("Failed to update todo");
            console.log(err.message);
        });
}

function changeData(e, item, newValue) {
  setNewValue(e)
  console.log(newValue)
 updateTask(e, item )

}

function setSelect(item) {
  setSelectedTitle(item)
}
  return (
    <div class="container h-1000">
  <div class="d-flex justify-content-center align-items-center vh-80">
  <div style={{textAlign: "center"}}>
   
           
          
 
       
              <div
         
            style={{textAlign : "center"}}
            >
              { show && <form
                  onSubmit={handleSubmit}
                  className="form-container"
                  noValidate
              >
                <h1  >Add Task  <input
                      type="text"
                      name="title"
                      id="text"
                      value={data.title}
                      onChange={handleChange}
                     
               
                  />
                </h1>
                  <input  size="60" type="submit" className="green" className="same btn btn-block" value="Create Todo"/>
                    
                 
              </form>}
      
              {Object.keys(data).map((item, i) => {
               
          return (
            <div className="center"  > 
             {toggle ? (
           <div>
             
                <p key={item} onClick={() => {
      setSelectedTitle(data[item].title)
      console.log(data[item].title)
      console.log(selectedTitle)
      setShow(false)
      setToggle(false)
      
    }}> {data[item].title}<button onClick={() => del(data[item])} className="close"><CloseIcon  svgClass="close" fill="red"/></button></p> 
           </div>
    ): (
      <div>
    {data[item].title === selectedTitle && <UpdateTodo run={run} _id={data[item]._id} toggle={setToggle} item={data[item].title} setShow={setShow}/>}
    </div>
    ) }
            
       
         
           
           </div>
          )
              
            
             
            })
          } 
          </div>

 
        
             
           
      
    
      
    
    </div>      
</div>
</div>

  );
}

export default App;



     