import React, { useEffect, useState } from "react";
import { FieldArray, Field, ErrorMessage } from 'formik';
import callApi from "./../../app/helpers/callApi";
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useAppDispatch, useAppSelector } from './../../app/hooks'
import { setLessonsUsers } from "../../app/store/lessonsUsers";
import { toast } from 'react-toastify';
import Loading from "../loading";

const LessonsUsers: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const lessonsUserdata = useAppSelector((state) => state.lessonsUsers);
    const dispatch = useAppDispatch();
    let initialValuesFormik = {
        codePersonal: "", lessonsUsers: []
    };
    let FormSchema = yup.object().shape({
        codePersonal: yup.string().required('کد پرسنلی وارد نشده است'),
    })
    console.log(lessonsUserdata)
    const initialLessonsUserdata = lessonsUserdata.length > 0 ? lessonsUserdata[0].key : '';
    useEffect(() => {
        const getLessons = async () => {

            try {
                setLoading(true)
                const res = await callApi().get('/lessons');
                setLoading(false)
                if (res.status === 200) {
                    console.log(res.data.rows)
                    dispatch(setLessonsUsers(
                        res.data.rows.map((item: any) => {
                            const lessonType = res.data.lessonTypes[res.data.lessonTypes.findIndex((i: any) => i[0] == item.full_lesson_type)][5];
                            return { key: item.lesson_id, value: (`${item.name} - ${lessonType}`) }
                        })
                    ))

                }

            } catch (error: any) {
                setLoading(false);

                console.log(error);
            }
        }
        getLessons();

    }, []);

    return (
        <div>
            <div className="my-5">افزودن درس برای استاد</div>
            <Formik
                initialValues={initialValuesFormik}
                validationSchema={FormSchema}
                onSubmit={
                    async (values, { setFieldError }) => {
                        try {
                            console.log({ ...values })
                            setLoading(true)
                            const res = await callApi().post('/lessonsUsers', { ...values });
                            setLoading(false)
                            console.log(res);
                            if (res.status === 200) {
                                console.log(res)
                                toast.success(<span className="font-vazirmatn">{'انجام شد'}</span>, {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });

                            }
                        } catch (error: any) {
                            setLoading(false)
                            toast.error(<span className="font-vazirmatn">{`عملیات متوقف گردید: ${error}`}</span>, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });

                            error.forEach(({ title, message }: any) => { setFieldError(title, message as string); })
                        }
                    }
                }
            >
                {
                    ({ values }) => (
                        <Form>
                            <div>
                                <label htmlFor="codePersonal">کد پرسنلی</label>
                                <Field type='text' placeholder="کد پرسنلی را وارد کنید" name="codePersonal"
                                    className="m-2 dark:text-black appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                <span className="text-red-500"><ErrorMessage name='codePersonal' /></span>
                            </div>
                            {lessonsUserdata.length > 0 &&
                                <FieldArray name="lessonsUsers"
                                    render={arrayHelpers => (
                                        <>
                                            {
                                                (lessonsUserdata.length > 0) ? (

                                                    <div>
                                                        <button type="button"
                                                            onClick={() => arrayHelpers.push(String(initialLessonsUserdata))} className="px-3">
                                                            {/* show this when user has removed all lessonsUsers from the list */}
                                                            افزودن درس
                                                        </button>
                                                        <button className='text-green-600 text-3xl cursor-pointer' type="button"
                                                            onClick={() => arrayHelpers.insert(values.lessonsUsers.length, String(initialLessonsUserdata))} // insert an empty string at a position with index
                                                        >+</button>
                                                    </div>
                                                ) : <div>درسی برای انتخاب وجود ندارد</div>
                                            }
                                            <div className="max-h-48 overflow-auto">
                                                {
                                                    values.lessonsUsers && values.lessonsUsers.length > 0 && (
                                                        values.lessonsUsers.map((item: any, index: any) => (

                                                            <div key={index} className='flex'>
                                                                <Field as="select" name={`lessonsUsers.${index}`}
                                                                    className="m-2 dark:text-black appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                                                    {lessonsUserdata.map(item => (<option key={item.key} value={item.key}>{item.value}</option>))}
                                                                </Field>
                                                                <button className="text-red-600 text-3xl cursor-pointer"
                                                                    type="button" onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                                >-</button>
                                                            </div>
                                                        ))
                                                    )
                                                }
                                            </div>
                                        </>
                                    )}
                                />
                            }
                            <div className="flex items-end">
                                <input type='submit' value={'ثبت'}
                                    className='cursor-pointer m-2 ltr:ml-3 rtl:mr-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm rounded text-white bg-violet-500 font-bold drop-shadow hover:bg-violet-600 active:bg-violet-700 focus:ring focus:ring-violet-300' />
                            </div>
                            {loading && <Loading />}
                        </Form>

                    )
                }


            </Formik>
        </div>

    )
}

export default LessonsUsers;