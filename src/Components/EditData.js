import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const EditData = ({...data})=>{

    // console.log(data);

    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const [status, setStatus] = useState(data.status);
    const [deadline, setDeadline] = useState(data.deadline);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [id, setId] = useState(data.id);
    const [user, setUser] = useState({title:"", description:"", status:"", deadline:"", id:""})

    const [allTask, setAllTask] = useState([]);
    
    const [editing, setEditing] = useState(0);


    useEffect(()=>{

        setId(data.id)
        // setTitle(data.title);
    }, []);

    
    // console.log(data.title);
    // console.log(data.id);



    // const handelInput = (e)=>{
    //     e.preventDefault();

    //     const {name, value} = e.target;
    //     // setId();
    //     setUser({...user, [name]:value});
    //     setUser({...user, id:id});
    //    console.log(user);
    //     console.log("deadline");
    // }


        
const handalUpdated = (e)=>{
    e.preventDefault();
    console.log("Update form", user);

    console.log(data.id);
    console.log(title);
    console.log(description);
    console.log(status);
    console.log(deadline);
    
    // setUser

    // const {name, value} = e.target;
        // setId();
        // setUser({title:title, description:description, status:status, deadline:deadline, id:data.id});

    // const sucessCon = title && description && status && deadline;
     
        try {
            const createUserApi = "http://127.0.0.1:8000/api/update";
            const response =  fetch(createUserApi, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title:title, description:description, status:status, deadline:deadline, id:data.id}),
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

    


    return (
        <>
         
         <Container className="extractionForm shadow p-3 mb-5  rounded">
           

            
{/* Edit Form  */}
<div className="editForms" >
<h3 style={{textAlign:"center"}}> Edit Task  </h3>
<h3 style={{color:"green"}}>{success} </h3> <h3 style={{color:"red"}}>{error}</h3>
            <form  onSubmit={handalUpdated} >
            
            <Row className="rowspc">
            <Col sm={12}>
            <label htmlFor="title" className="form-label">Title</label>
            <input type="hidden" id="id" name="id" className="form-control" onChange={(e)=>(setId(e.target.value))} defaultValue={data.id}/>                
           
            <input type="text" id="title" name="title" className="form-control" onChange={(e)=>(setTitle(e.target.value))} defaultValue={data.title}/>                
            </Col>
            </Row>
            <Row className="rowspc">
            <Col sm={12}>
            <label htmlFor="desc" className="form-label">Description</label>
            <textarea type="text" id ="desc" name="description" className="form-control" defaultValue={data.description}  onChange={(e)=>(setDescription(e.target.value))}>{data.description}</textarea>                
            </Col>
            </Row>

            <Row className="rowspc ">
            <Col sm={6}>
            <label htmlFor="status" className="form-label">Status</label>
            <select className="form-select" id="status" name="status" onChange={(e)=>(setStatus(e.target.value))}  defaultValue={data.status}>
                    <option value="">Please Select</option>
                    <option value="Progress" >Progress</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Active">Active</option>
                    
                </select>
            </Col>
            <Col sm={6}>
                
                <label htmlFor="deadline" className="form-label">Deadline</label>
                <input type="text" id="deadline" placeholder="YYYY-MM-DD" name="deadline" className="form-control" onChange={(e)=>(setDeadline(e.target.value))}  defaultValue={data.deadline} />   
            </Col>
            </Row>
            <Row>

            <Col sm={3}>
                <Button type="submit">Update</Button></Col>
            {/* id, title, description, status, deadline. */}
              <Col sm={6}>
               <p style={{color:"red"}}> {error}</p>
              </Col>
            </Row>
            </form>

</div>
</Container>

        </>
    );
}

export default EditData;