import React, { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';

// import { FaHeart } from "react-icons/fa";
import { MdOutlineDeleteForever } from 'react-icons/md';

function makeid(length) {
    var result = '';
    var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const Task = () => {
    const [state, setState] = useState([]);//tasklist
    const [input, setInput] = useState('');//task

    const AddData = () => {
       

        let obj = {
            name: input,
            id: makeid(5),
            checked: false,
            dt:true



        };
        setState([...state, obj]);
        setDt("");
        



    }

    const handleRemoveItem = (e, id) => {
        e.preventDefault();
        setState(state.filter((t) => t.id != id
        ))
        console.log('deleted');

    };

    const handleChange = (e) => {
        console.log(e.target.value)

        setInput(e.target.value);


        // setDeadline("due date is passed")


    }
    const handleCheckbox = (event) => {
        console.log(event.target.value);
        // setInput(event.target.value);
        const data = state.find((ele) => ele.id == event.target.value);
        //  const index = state.findIndex((ele) => ele.name == event.target.value);

        for (var i = 0; i < state.length; i++)
            if (state[i].id === event.target.value) {
                state.splice(i, 1);
            }
        data.checked = true;
        setState([...state, data]);
    }

    const [deadline, setDeadline] = useState(false)
    const [dt, setDt] = useState("")
    const ref = useRef()
    const classes = useState({ deadline, dt })

    // const ref=useRef()
    var now = new Date();
    console.log(now);



    useEffect(() => {
        if (dt.valueOf() < now.valueOf()) {
            setDeadline(true)

        }
        else
            setDeadline(false)
    }, [dt])
    const date = (event) => {
// event.preventDefault();

        var date = new Date(event.target.value)

        setDt(date)
        //dt = 


    }
    console.log(dt)


    return (
        <div className="main_div">
            <div className='center_div'>
                <h1>Todo App</h1>
                <h2>What's the Plan for Today!</h2>
                
                <span className='position'><input type="text" placeholder='add a todo!' onChange={handleChange} /></span>

                <span className='btn'><button onClick={AddData}>Add Todo</button></span>
                <div className="todos__todo">
               
                    {state.map((t) => (


                        <ul >

                            <li style={{ textDecoration: t.checked ? 'line-through' : '' }}>
                                {t.name}
                            </li>{' '}

                            <input
                                onChange={handleCheckbox}
                                type="checkbox"
                                // id="vehicle1"
                                // name="vehicle1"
                                value={t.id}
                            />
                            <div>
                                <label > Task description:</label>
                                <input type="text" placeholder='description' />
                                <label>Completion date</label>
                                <input type='date'  className={classes.date} onChange={date} />


                            </div>

                            <button onClick={(e) => handleRemoveItem(e, t.id)}> <MdOutlineDeleteForever />  </button>

                            {dt ? deadline ? <Typography variant='h4' className={classes.setDeadline}>Deadline passed</Typography> :
                                <Typography variant='h4' className={classes.go}>Good to Go!</Typography> :
                                <Typography variant='h4' className={classes.setdate} >Set Deadline</Typography>}

                        </ul>

                    ))}
                </div>

            </div>
        </div>
    )
}

export default Task;
