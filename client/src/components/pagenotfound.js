import React from "react";
import notfound from '../lib/img/pageerror.png';
import '../lib/style/log.css';
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