import React from "react";
import notfound from '../pageerror.png';
import '../log.css';
function PageNotFound(){
    return (
    <div>
       


 <div style={{
backgroundImage: `url(${notfound})`,
backgroundSize: 'cover',
backgroundPosition: 'center',
height: '100vh',
width: '100vw',
}}>
</div>
    </div>
    )
}
    
export default PageNotFound;