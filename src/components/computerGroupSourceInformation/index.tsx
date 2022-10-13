import React, { useState } from "react";
import { ErrorMessage, Field } from 'formik';
import { Formik, Form } from 'formik'
import * as yup from 'yup';

import callApi from "../../app/helpers/callApi";
import ClassesComponent from './classes';



const ComputerGroupSourceInformation: React.FC = () => {

    let initialValuesFormik = { year: "", classes: [] };
    let registerFormSchema = yup.object().shape({
        year: yup.string().required("سال جاری وارد نشده است"),
        classes: yup.array().of(yup.string().required("شماره کلاس وارد نشده است"))
    })

    return (
        <div>
            <div className="p-2">اطلاعات منابع گروه کامپیوتر در رشته تحصیلی جاری</div>
            <div>
                <Formik
                    initialValues={initialValuesFormik}
                    validationSchema={registerFormSchema}
                    onSubmit={
                        async (values, { setFieldError }) => {

                            try {
                                console.log(values)

                                const res = await callApi().post('/computergroup', values);
                                console.log(res);
                                if (res.status === 200) {
                                    console.log(res)
                                }
                            } catch (error: any) {
                                error.forEach(({ title, message }: any) => { setFieldError(title, message as string); })
                            }
                        }
                    }
                >
                    {
                        ({ values }) => (
                            <Form>
                                <div className="flex flex-wrap">
                                    <div>
                                        <label htmlFor="year">سال جاری</label>
                                        <Field type='text' placeholder="سال جاری را وارد کنید" name="year"
                                            className="m-2 dark:text-black appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                        <span className="text-red-500 px-1"><ErrorMessage name='year' /></span>
                                    </div>
                                </div>
                                <ClassesComponent values={values} />
                                <div className="flex items-end">
                                    <input type='submit' value={'ثبت'}
                                        className='cursor-pointer m-2 ltr:ml-3 rtl:mr-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm rounded text-white bg-violet-500 font-bold drop-shadow hover:bg-violet-600 active:bg-violet-700 focus:ring focus:ring-violet-300' />
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default ComputerGroupSourceInformation;