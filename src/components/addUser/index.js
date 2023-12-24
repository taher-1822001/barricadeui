import React from 'react'

class AddUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }
    handlechange = (e) =>{
        e.preventDefault();
        this.setState({[e.target.value]:e.target.name})
    }
    render(){
        return(
            <>
            <div className='container align-items-center justify-content-center d-flex'>
                <div className='row'>
                    <div className='col-lg-4 col-md-4'>
                    <form>
                    <div className="form-group mb-3">
                                <label htmlFor="Email">Email<span className='text-danger'>*</span></label>
                                <input type="email" className="form-control" id="Email" placeholder="Enter Email" name='email' onChange={this.handlechange} value={this.state.email}/>
                                
                            </div>
                    <div className="form-group mb-3">
                                <label htmlFor="Email">password<span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" id="Email" placeholder="Enter Email" name='email' onChange={this.handlechange} value={this.state.password} required/>

                            </div>
                    </form>
                    </div>
                </div>
            </div>
            </>
        )
    }
}


export default AddUser;