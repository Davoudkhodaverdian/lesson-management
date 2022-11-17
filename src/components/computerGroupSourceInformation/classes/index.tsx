import React from "react";
import { FieldArray, Field, ErrorMessage } from 'formik';

const Classes: React.FC<{ values: any }> = ({ values }) => {

    return (
        <>
            <FieldArray name="classes"
                render={arrayHelpers => (
                    <>
                        <div>
                            <button type="button" onClick={() => arrayHelpers.push('')} className="px-3">
                                {/* show this when user has removed all classes from the list */}
                                افزودن کلاس
                            </button>
                            <button className='text-green-600 text-3xl cursor-pointer' type="button"
                                onClick={() => arrayHelpers.insert(values.classes.length, '')} // insert an empty string at a position with index
                            >+</button>
                        </div>
                        <div className="max-h-48 overflow-auto">
                            { 
                                values.classes && values.classes.length > 0 && (
                                    values.classes.map((item: any, index: any) => (
                                        <div key={index}>
                                            <Field name={`classes.${index}`}
                                                className="m-2 dark:text-black appearance-none  px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                            <button className="text-red-600 text-3xl cursor-pointer"
                                                type="button" onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                            >-</button>
                                            <span className="text-red-500 px-1"><ErrorMessage name={`classes.${index}`} /></span>
                                        </div>
                                    ))
                                )
                            }      
                        </div>
                    </>
                )}
            />

        </>
    )
}

export default Classes;