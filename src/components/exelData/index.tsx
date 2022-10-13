import { NextPage } from "next"
import React from "react";
import callApi from "../../app/helpers/callApi";

const ExelData: NextPage = () => {

    const submitHandler = (event : React.SyntheticEvent)=> {
        event.preventDefault();
        callApi().get('/userinfo').then((res)=>console.log(res));
        
        
    }



    return (
        <form onSubmit={submitHandler}>
            <input  type="submit"
                className='cursor-pointer m-2 ltr:ml-3 rtl:mr-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm rounded text-white bg-violet-500 font-bold drop-shadow hover:bg-violet-600 active:bg-violet-700 focus:ring focus:ring-violet-300'
                value={"دریافت اطلاعات از اکسل"}
            />
        </form>
    )

}

export default ExelData;