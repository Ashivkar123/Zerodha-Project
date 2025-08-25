import React from 'react';
import { Link } from 'react-router-dom';

function OpenAccount() {
    return ( 
        <div className='container p-5 mb-5'>
            <div className='row text-center mb-5'>
                <h1 className='mt-5 mb-4'>Open a Zerodha account</h1>
                <p className='mb-4'>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
                <Link
                  to="/signup"
                  className='p-2 btn btn-primary fs-5 mb-5'
                  style={{width:"20%", margin:"0 auto", display:"inline-block"}}
                >
                  Sign up for free
                </Link>
            </div>
        </div>
     );
}

export default OpenAccount;