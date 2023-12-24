import React from 'react'

class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        let date = new Date();

        let year = date.getFullYear();
        return(
            <>
            <div className='container-fluid  text-center bg-dark text-light shadow  d-flex justify-content-center align-items-center' style={{position:"fixed", bottom:"0", left:"0", right:"0", zIndex:"1000"}}>
                <h6 className='mt-3 mb-3'>&copy; {year} Developed by Department of Electrical and electronics engineering</h6>
            </div>
            </>
        )
    }
}

export default Footer;