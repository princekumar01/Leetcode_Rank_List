import './App.css';
import { useState } from 'react';
import api from './Axios'
const Registration=()=> {
  const [formData, setFormData] = useState({
    name: '',
    enrollmentNumber: '',
    year: '1st',
    gender: 'Male',
    username:'',
  })

  const onChangeHandler = (event) => {
      setFormData(() => ({
        ...formData,
        [event.target.name]: event.target.value
      }))
  }
  
  
  const addUser = async (name,enrollmentNumber,gender,year,username) =>{
    // //e.preventDefault();

    // const rev = revText.current;
    // console.log(rev.value);
    // if(rev.value=='')
    // return;
    // if(editText!=0){
    // editReview();         
    // }
    // else{
    try
    {
      console.log(name,enrollmentNumber,gender,year,username);
       // const userId = JSON.parse(localStorage.getItem('userId'));
       await api.post("/api/v1/register",{name:name,enrollmentNumber:enrollmentNumber,gender:gender,year:year,_id:username});

        //const updatedReviews = [...reviews, response.data];
        //rev.value = "";
        
        //console.log(updatedReviews);
        //setReviews(updatedReviews);
    }
    catch(err)
    {
        console.error(err);
    }
}
  const onSubmitHandler = (event) => {
    event.preventDefault()
    const {name,enrollmentNumber,gender,year,username}=formData;
    console.log(name,enrollmentNumber,gender,year,username);
    if((name!=='')&&(enrollmentNumber!=='')){
     addUser(name,enrollmentNumber,gender,year,username);
    //  name="";
    //  username='handle_id..';
    //  enrollmentNumber='2023';
     //const intialiseData={name,enrollmentNumber,gender,year,username};
     //setFormData(...intialiseData); 
    }
    else{

    }
  }
  return (
    <div className="App1">
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input className="form-control" name="name" placeholder="..." required={true} onChange={onChangeHandler} value={formData.name} />
        </div>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Leetcode Username</label>
          <input className="form-control" name="username" placeholder="handle_ID.." required={true} onChange={onChangeHandler} value={formData.username} />
        </div>
        <div className="form-group">
          <label htmlFor="enrollmentNumber" className="form-label">Enrollment Number</label>
          <input className="form-control" name="enrollmentNumber" placeholder="2020CSB0.." required={true} onChange={onChangeHandler} value={formData.enrollmentNumber} />
        </div>
        <div className="form-group">
          <label htmlFor="year" className="form-label">Year</label>
          <select className="form-select" name="year" onChange={onChangeHandler} value={formData.year}>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="Pass Out">Pass Out</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="gender" className="form-label">Gender</label>
          <div>
            <div>
              <input type="radio" name="gender" value="Male" onChange={onChangeHandler} checked={formData.gender === 'Male'} />
              <label htmlFor="Male">Male</label>
            </div>
            <div>
              <input type="radio" name="gender" value="Female" onChange={onChangeHandler} checked={formData.gender === 'Female'} />
              <label htmlFor="Female">Female</label>
            </div>
            {/* <div>
              <input type="radio" name="gender" value="Other" onChange={onChangeHandler} checked={formData.gender === 'Other'} />
              <label htmlFor="Other">Other</label>
            </div> */}
          </div>
        </div>
        <div className="form-group">
          <button className="btn" type="submit" >Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
