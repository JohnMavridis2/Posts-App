import React , {useState,useRef,useEffect } from 'react';
import axios from 'axios';



export default function MainPart (){

    const [imgToPost, setImgToPost] = useState(null)
    const [posts,setPosts]=useState([])
    const inputRef=useRef(null)
    const URL_ENDPOINT='http://localhost:8080/api/v1/post'

    useEffect(() => {
        fetchThePosts()
      }, []); 

    function fetchThePosts(){
        axios.get(URL_ENDPOINT)
        .then( (response) => {
           // handle success
               console.log(response)
               const r=response.data
               setPosts(r)    
           })
        .catch((error)  => {
           // handle error
           console.log(error);
           })
        .then(()=> {
            // always executed
         })    

    }
    

    function addImageToPost(e){
        const reader=new FileReader()
        if (e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
            reader.onload = (e) => {
                setImgToPost(e.target.result)
            }
        }
    }

    function postIt(e){
        e.preventDefault()
        if (!inputRef.current.value){
            alert('Post some text amigo!')
            return
        }
        const formData=new FormData()
        formData.append("file",imgToPost)
        formData.append("post",inputRef.current.value)
        formData.append("timeStamp",new Date(Date.now()).toLocaleString())
        axios.post(URL_ENDPOINT,
                   formData,
                    ).then((response)=>{
                        inputRef.current.value=""
                        setImgToPost(null)
                        console.log(response)
                        const r=response.data
                        if (r==0){
                            alert('Your post was added succesfully!')
                            fetchThePosts()
                        }else{
                            alert('Error!')
                        }
                    }).catch((error)=>{
                        console.log(error)
                    })
    }

    return(
        <>
            <div className='bg-white rounded-md shadow-md text-gray-500 p-2'>
                <div className='flex p-4 space-x-2 items-center'>
                    <form className='flex flex-col mx-auto '>
                        <input type="text" ref={inputRef}
                            placeholder="Post some text amigo!"
                            className='rounded-full h-12 flex-grow focus:outline-none font-medium bg-gray-100 px-4' />
                        <div className='flex flex-row space-x-2'>
                            <label htmlFor='myFile' className='border w-52 m-8 p-4 bg-red-600 hover:bg-red-400 text-white mx-auto text-center' > Click here to post a picture amigo!</label>
                            <input type='file' id='myFile' accept="image/*" className='hidden' onChange={addImageToPost}/>
                            <div className='text-blue-800 my-auto' id="imageName"><img className='h-20 object-contain' src={imgToPost} /></div>
                        </div>   
                        <button onClick={postIt} className='border rounded-full w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white '>Post it!!</button>
                    </form>
                </div>
            </div>
            {posts.map(post=>
                <div className='flex flex-col'>
                    <div className='bg-white mt-6 rounded-md p-4 shadow-md'>
                        <p className='text-gray-500'>{post.t_stamp}</p>   
                        <p className='py-4' >{post.text}</p>
                        <div className='relative w-full bg-white'>
                            <img src={post.img} />
                        </div>
                    </div>
                </div>    
             )
            }
        </>
    )

}


