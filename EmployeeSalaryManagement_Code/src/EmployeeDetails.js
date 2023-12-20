import React, { Component } from 'react';
import './EmployeeDetails.css'


class EmployeeDetails extends Component {
        constructor(){
            super();
            this.state={    
                empName:'',
                empID:'',
                dep:'',           
                gender:'',
                maritalStatus:'',
                salary:'',
                address:'',
                content: '',
                submitted:false,
                FormData:{}
            }
            this.changeGender=this.changeGender.bind(this);
            this.changeContent= this.changeContent.bind(this);
            this.handleSubmit=this.handleSubmit.bind(this);
            this.showTable=this.showTable.bind(this);
            this.handleCancel=this.handleCancel.bind(this);

        }



        changeGender=(e)=>{
            this.setState({
                gender: e.target.value,
            });
            console.log(e.target.value);
        };

        changeContent=(c)=>{
            this.setState({
                [c.target.name]: c.target.value,
            });
            console.log(c.target.value);
        };

        handleSubmit=(s)=>{
            s.preventDefault();
            const { empName, empID, dep, gender, maritalStatus, salary, address } = this.state;

    fetch('http://localhost:5000/submitEmployeeDetails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      empName,
      empID,
      dep,
      gender,
      maritalStatus,
      salary,
      address
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.success) {
      this.setState({ submitted: true });
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
            this.setState({
                submitted:true,
                FormData:{
                empName: this.state.empName,
                empID: this.state.empID,
                dep: this.state.dep,
                gender: this.state.gender,
                maritalStatus: this.state.maritalStatus,
                salary: this.state.salary,
                address: this.state.address,
                }
            });
            
        };

        showTable=()=>{
            const { FormData } = this.state;
            return(
                <div>
                <table>
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Employee ID</th>
                            <th>Department</th>
                            <th>Gender</th>
                            <th>Marital Status</th>
                            <th>Salary</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{FormData.empName}</td>
                            <td>{FormData.empID}</td>
                            <td>{FormData.dep}</td>
                            <td>{FormData.gender}</td>
                            <td>{FormData.maritalStatus}</td>
                            <td>{FormData.salary}</td>
                            <td>{FormData.address}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            );

    
        };

        handleCancel=()=>{
            this.setState({
                empName:null,
                empID:null,
                dep:null,           
                gender:null,
                maritalStatus:null,
                salary:null,
                address:null,
                
            });
        };
      

       render() {
        if(this.state.submitted){
            return(
            <div>
                <h1 style={{backgroundColor:'#00ADB5',textAlign:'center',color:'#393E46'}}>Employee Details submitted</h1>
                {this.showTable()}
            </div>
            );
        }
        

      return (
            <form onSubmit={this.handleSubmit}>
            <div className='page1'>
            
           <h1>Employee Details</h1>
           <label >Employee Name </label><br/>
           <input type='text' name='empName' placeholder='Enter Employee Name'className='empNID' required onChange={this.changeContent}/><br/>
           <label>Employee ID</label><br/>
           <input type='text' name='empID' placeholder='Enter Employee ID'className='empNID' required onChange={this.changeContent}/><br/>
           <br/>
           <label>
               Department   <br/>
               <select onChange={this.changeContent} name='dep' required>
                   <option value=''>--Select--</option>
                   <option value='Developer'>Developer</option>
                   <option value='Admin'>Admin</option>
                   <option value='Executive'>Executive</option>
               </select>
           </label><br/>
           <h3>Gender</h3>
           <input type="radio" value='Male' name="gender" className='gender' onChange={this.changeGender} required/>  Male
           <input type="radio" value='Female' name="gender"className='gender'onChange={this.changeGender} required/> Female<br/>
           <br/>
           <label>
           Marital Status <br/>
           <select onChange={this.changeContent} name='maritalStatus' required>
             <option value="">--Select--</option>
             <option value="single">Single</option>
             <option value="married">Married</option>
             <option value="divorced">Divorced</option>
             <option value="widowed">Widowed</option>
           </select>
           </label><br/>
           <br/>
           <label>Salary </label>&nbsp;(In LPA)<br/>
           <input type='number' name='salary'  placeholder='Enter your salary'style={{width: 120}}onChange={this.changeContent} required/><br/>
           <br/>
           <label>Enter your address</label><br/>
           <textarea className="address" name="address" rows="4"  placeholder='Enter your address'  onChange={this.changeContent} required/><br/>
           <button type='submit' onClick={this.showTable}>Submit</button>     &nbsp;&nbsp;&nbsp;&nbsp;
           <button onClick={this.showTable}>View</button>     &nbsp;&nbsp;&nbsp;&nbsp;
           <button onClick={this.handleCancel}>Cancel</button>
              
       
           </div>
           </form>
        );
    }
}

export default EmployeeDetails;