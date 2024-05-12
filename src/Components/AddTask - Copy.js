import React, { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';


import EditData from "./EditData";

const AddTask = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [deadline, setDeadline] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [user, setUser] = useState({title:"", description:"", status:"", deadline:""})

    const [allTask, setAllTask] = useState([]);
    
    const [editing, setEditing] = useState(0);



    const fetchData = () => {
        
    const get_url = "http://127.0.0.1:8000/api/tasklist";
        fetch(get_url, {method:"get"}).then((resp)=>(resp.json())).then((resp)=>(setAllTask(resp)));
    }


    const editTask = (id)=>{
        console.log(id);
        setEditing(id);
        
        const get_url = "http://127.0.0.1:8000/api/tasklist/"+id;
        fetch(get_url, {method:"get"}).then((resp)=>(resp.json())).then((resp)=>(setEditing(resp)));

    };

    
    // console.log(editing);


    // const handelInput = (event) => {
    //     event.preventDefault();
    //     const { name, value } = event.target;
    //     console.log(name, value)
    //     setUser({ ...user, [name]: value });
    // }

    const handelInput = (e)=>{
        e.preventDefault();

        const {name, value} = e.target;

        setUser({...user, [name]:value});
        // console.log(user);
        // console.log(deadline);
    }

    const handalInputUpdate = (e) => {
        const {nm,vl} = e.target;

        setUser({...user, [nm]:vl});

    }

    const handelDelete = async (id) => {
    console.log("id : -", id);
        const del_url = "http://127.0.0.1:8000/api/delete/"+id;
    try {
      const response = await fetch(del_url, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
    //   setUser(user.filter((item) => item.id !== id));
    fetchData();
    } catch (error) {
      setError(error.message);
    } 
  };


  useEffect(()=>{
    fetchData();
},[]);

const handalUpdated = (e)=>{
    e.preventDefault();
    console.log("Update form", editing);


    // const sucessCon = title && description && status && deadline;
     
        try {
            const createUserApi = "http://127.0.0.1:8000/api/update";
            const response =  fetch(createUserApi, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editing),
            }).then(function (response) {
                console.log(response);
                if (response.status === 200) {
                
                setSuccess("Task updated successfully!");
                } else {
                  
                    setError("Form updated failed!");
                }
                // you cannot parse your "success" response, since that is not a valid JSON
                // consider using valid JSON req/resp pairs.
                // return response.json();
              });
        
    
        } catch (error) {
            setError(error.message);
        } 

    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("Submit form");

        // const sucessCon = title && description && status && deadline;
         
            try {
                const createUserApi = "http://127.0.0.1:8000/api/addtask";
                const response =  fetch(createUserApi, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                }).then(function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        fetchData();
                    setSuccess("Task submitted successfully!");
                    } else {
                      
                        setError("Form submission failed!");
                    }
                    // you cannot parse your "success" response, since that is not a valid JSON
                    // consider using valid JSON req/resp pairs.
                    // return response.json();
                  });
            
        
            } catch (error) {
                setError(error.message);
            } 


    }

//    console.log(editing);

    return (

    <>
        <h3>
            Add Task
        </h3>
        
        <Container className="extractionForm shadow p-3 mb-5  rounded">
            <h3 style={{color:"green"}}>{success} </h3> <h3 style={{color:"red"}}>{error}</h3>
            <form  onSubmit={editing ? handalUpdated : handleSubmit} >
            
            <Row className="rowspc">
            <Col sm={12}>
            <label htmlFor="title" className="form-label">Title</label>
            <input type="hidden" id="id" name="id" className="form-control" value={editing?editing.id:"Null"}/>                
           
            <input type="text" id="title" name="title" className="form-control" onChange={handelInput} value={user.title}/>                
            </Col>
            </Row>
            <Row className="rowspc">
            <Col sm={12}>
            <label htmlFor="desc" className="form-label">Description</label>
            <textarea type="text" id ="desc" name="description" className="form-control" value={user.description}  onChange={handelInput} >{user.description}</textarea>                
            </Col>
            </Row>

            <Row className="rowspc ">
            <Col sm={6}>
            <label htmlFor="status" className="form-label">Status</label>
            <select className="form-select" id="status" name="status" onChange={handelInput} value={user.status}>
                    <option value="">Please Select</option>
                    <option value="Progress">Progress</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Active">Active</option>
                    
                </select>
            </Col>
            <Col sm={6}>
                
                <label htmlFor="deadline" className="form-label">Deadline</label>
                <input type="text" id="deadline" placeholder="YYYY-MM-DD" name="deadline" className="form-control" onChange={handelInput}  value={user.deadline} />   
            </Col>
            </Row>
            <Row>

            <Col sm={3}>
                <Button type="submit">Submit</Button></Col>
            {/* id, title, description, status, deadline. */}
              <Col sm={6}>
               <p style={{color:"red"}}> {error}</p>
              </Col>
            </Row>
            </form>
        <br/>
            <Row className="rowspc ">
                <Col sm={12}>
                <table className="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Status</th>
      <th scope="col">Deadline</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
    allTask.map((task)=>(
        
    <tr key={task["id"]}>
      <th scope="row">{task["id"]}</th>
      <td>{task["title"]}</td>
      <td>{task["description"]}</td>
      <td>{task["status"]}</td>
      <td>{task["deadline"]}</td>
      <td><i className="bi bi-pen" style={{ cursor: "pointer" }}></i> {" "} <i className="bi bi-trash" style={{ cursor: "pointer" }} onClick={() => handelDelete(task["id"])}></i></td>
    </tr>

))
    }

{/* onClick={() => editTask(task["id"])} */}
    
  </tbody>
</table>
                </Col>
            </Row>
              

            </Container>



    </>
    );
}

export default AddTask;