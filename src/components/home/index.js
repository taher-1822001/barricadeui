import React from 'react';
import Header from '../header';
import Footer from '../footer';
import axios from 'axios';
import BASE_URL from '../config';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListData from '../listData';
class Home extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            superUser:true,
            employeeData:[]
        }
    }
    getEmployeeData = () =>{
        // e.preventDefault();
        let url = `${BASE_URL}/employee`
        axios.get(url)
        .then(response =>{
            this.setState({employeeData:response.data})
        })
        .catch(error =>{
            toast.error("Failed to fetch Vehicle Data");
        })
    }
    componentDidMount(){
        this.getEmployeeData();
    }
    render(){
        return(
            <>
            <ToastContainer />
            <Header />
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col'>
                        <button className='btn btn-primary m-1' style={{float:"right"}}>Add Vehicle</button>
                        {this.state.superUser && <button className='btn btn-success m-1' style={{float:"right"}}>Add User</button>}
                    </div>
                    <div className='w-100'></div>
                    <hr />
                    <div className='w-100'></div>
                    <div className='col'>
                        <ListData employeeData={this.state.employeeData} />
                    </div>
                  
                </div>
            </div>
            <Footer />
            </>
        )
    }
}

export default Home;