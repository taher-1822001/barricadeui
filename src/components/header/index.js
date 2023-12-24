import React from 'react'

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <>
            <div className='container-fluid  text-center bg-dark text-light shadow d-flex justify-content-center align-items-center' style={{position:"fixed", top:"0", left:"0", right:"0", zIndex:"1000"}}>
                <h3 className="mt-2 mb-2 ">AUTOMATED BARRICADE SYSTEM</h3>
            </div>
            </>
        )
    }
}

export default Header;