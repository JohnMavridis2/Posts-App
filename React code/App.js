import React from 'react';
import MainPart from './components/MainPart';



export default function App (){

    return(
        
            <div className='flex-grow h-screen pt-6 mr-6 '>
                <div className='mx-auto max-w-md md:max-w-xl lg:max-w-2xl'>
                    <MainPart />
                </div>
            </div>
        
    )

}