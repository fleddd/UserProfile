// TODO:
//  - validation of editing
//  - fix router bug
//  - pagination
//  - filtration
//  - auth
//  - admin mode / user mode

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

import UploadImage from '../components/UploadImage';
import { addDoc, collection} from 'firebase/firestore';
import {db} from './../firebase-config'
import 'react-image-crop/dist/ReactCrop.css'

function Form() {
    const usersCollectionRef = collection(db, "users")
    const [image, setImage] = useState('')
    const succesRef = useRef(null)
    const [croppedImage, setCroppedImage] = useState('')  
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({})

    function onSubmit(data){
        // send data
        addDoc(usersCollectionRef, {data, image}).then(() => {
            succesRef.current.className = 'mb-5 text-center text-xl text-green-500'
            setTimeout(() => {
                succesRef.current.className = 'hidden'
            },3000)
        }).catch(() => {
            succesRef.current.innerText = "Data wasn't sent to the database. Something went wrong."
            succesRef.current.className = 'mb-5 text-center text-xl text-red-500 transition-all ease-in'
            setTimeout(() => {
                succesRef.current.className = 'hidden'
            },3000)
        })

       
        

        setImage('')
        setCroppedImage('')
        reset()
    }
    console.log(succesRef);
    console.log(errors);

    return ( 
        <main className="flex justify-center items-center flex-col">
            <p ref={succesRef} className='hidden'>Employee was successfully added to database!</p>            
            <form action="" className="flex flex-col justify-start items-start  " onSubmit={handleSubmit(onSubmit)}>
                
                    <div className='flex flex-col gap-3'>
                        <input {...register('firstName', {
                            required: {
                                value: true,
                                message: "This field is required!"
                            },
                            pattern: {
                                value: /^[a-zA-Zа-яА-Я\s]*$/,
                                message: 'This field must contain only string symbols!'
                            },
                            maxLength: {
                                value: 25,
                                message: 'This field must be no longer than 25 symbols!'
                            }
                        })} type="text" placeholder="First name" className={`border-2 ${errors.firstName ? "border-red-500" : "border-blue-800"} w-[300px] px-2 py-2 rounded-md focus:outline-none focus:border-yellow-500 transition-all ease-in-out`}/>
                        <span className='error'>{errors.firstName?.message}</span>
                        <input {...register('middleName', {
                            pattern: {
                                value: /^[a-zA-Zа-яА-Я\s]*$/,
                                message: 'This field must contain only string symbols!'
                            },
                            maxLength: {
                                value: 25,
                                message: 'This field must be no longer than 25 symbols!'
                            }
                        })} type="text" placeholder="Middle name" className={`border-2 ${errors.middleName ? "border-red-500" : "border-blue-800"} w-[300px] px-2 py-2 rounded-md focus:outline-none focus:border-yellow-500 transition-all ease-in-out`}/>
                        <span className='error'>{errors.middleName?.message}</span>
                        <input {...register('lastName', {
                            required: {
                                value: true,
                                message: "This field is required!"
                            },
                            pattern: {
                                value: /^[a-zA-Zа-яА-Я\s]*$/,
                                message: 'This field must contain only string symbols!'
                            },
                            maxLength: {
                                value: 25,
                                message: 'This field must be no longer than 25 symbols!'
                            }
                        })} type="text" placeholder="Last name" className={`border-2 ${errors.lastName ? "border-red-500" : "border-blue-800"} w-[300px] px-2 py-2 rounded-md focus:outline-none focus:border-yellow-500 transition-all ease-in-out`}/>
                        <span className='error'>{errors.lastName?.message}</span>
                        
                    </div>
                    <div className='flex flex-col gap-3' >
                         <input {...register('date', {
                            required: {
                                value: true,
                                message: 'This field is required!'
                            }
                        })} type="date" max={'2006-12-31'} placeholder="Birth date" className={`border-2 ${errors.date ? "border-red-500" : "border-blue-800"} w-[300px] px-2 py-2 rounded-md focus:outline-none focus:border-yellow-500 transition-all ease-in-out`} />
                        <span className='error'>{errors.date?.message}</span>
                        <textarea {...register('desc', {
                            maxLength: {
                                value: 1024,
                                message: 'This field must be no longer than 1024 symbols!'
                            }
                        })} type="text" placeholder="Description" className={`border-2 ${errors.desc ? "border-red-500" : "border-blue-800"} w-[300px] px-2 py-2 rounded-md focus:outline-none focus:border-yellow-500 transition-all ease-in-out`}/>
                        <span className='error'>{errors.desc?.message}</span>
                        <select {...register('role', {
                            required: {
                                value: true,
                                message: 'This field is required!'
                            }
                        })} name="role" id="" className={`border-2 ${errors.role ? "border-red-500" : "border-blue-800"} w-[300px] px-2 py-2 rounded-md focus:outline-none focus:border-yellow-500 transition-all ease-in-out`}>
                            <option value="Manager">Manager</option>
                            <option value="C-Level">C-Level</option>
                            <option value="Worker">Worker</option>
                            <option value="Staff">Staff</option>
                        </select>
                        <span className='error'>{errors.role?.message}</span>

                        <UploadImage image={image} setImage={setImage} croppedImage={croppedImage} setCroppedImage={setCroppedImage}/>

                    </div>


                  
                            
                        
                <input type="submit" onClick={() => setImage(croppedImage)} value={'Create Employee'} className="m-auto my-5 border-2 border-blue-600 rounded-md py-2 w-[150px] cursor-pointer hover:-translate-y-1 transition-all ease-in-out bg-blue-500 text-white"/>

                
            </form>
        </main>
    );
}

export default Form;