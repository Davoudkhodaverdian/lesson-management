import { NextPage } from "next"
import { Formik, Form } from 'formik'
import { ErrorMessage, Field } from 'formik'
import * as yup from 'yup';
import callApi from "../../app/helpers/callApi";
import Time from './time'
import { useState } from "react";
import User from "../models/User";
import T from "../models/Time";
import ScientificOrder from "./scientificOrder";
import CooperationType from "./cooperationType";
import { toast } from 'react-toastify';
import Loading from "../loading";

const Users: NextPage = () => {
    const [loading, setLoading] = useState(false);
    const [timeData, setTimeData] = useState<T[]>([]);
    let initialValuesFormik: User = {
        name: '', family: '', codePersonal: '', chargedMinimum: '',
        chargedMaximum: '', scientificOrder: "1", cooperationType: "1",

    };
    let registerFormSchema = yup.object().shape({
        name: yup.string().required('نام وارد نشده است'), codePersonal: yup.string().required('کد پرسنلی وارد نشده است'),
        family: yup.string().required('نام خانوادگی وارد نشده است'), chargedMinimum: yup.string().required('حداقل موظفی وارد نشده است'),
        chargedMaximum: yup.string().required('حداکثر موظفی وارد نشده است'),
    })
    return (
        <div>
            <div>فیلد استاد</div>
            <Formik
                initialValues={initialValuesFormik}
                validationSchema={registerFormSchema}
                onSubmit={
                    async (values: User, { setFieldError }) => {
                        try {
                            setLoading(true)
                            console.log({ ...values, timeData })

                            const res = await callApi().post('/userstimes', { ...values, timeData });
                            setLoading(false)
                            console.log(res);
                            if (res.status === 200) {
                                console.log(res)
                                setTimeData([]);
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
                            setLoading(false);
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
                    () => (
                        <Form>
                            <div className="flex flex-wrap">
                                <div>
                                    <label htmlFor="name">نام</label>
                                    <Field type='text' placeholder="نام را وارد کنید" name="name"
                                        className="m-2 dark:text-black appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                    <span className="text-red-500"><ErrorMessage name='name' /></span>
                                </div>
                                <div>
                                    <label htmlFor="family">نام خانوادگی</label>
                                    <Field type='text' placeholder="نام خانوادگی را وارد کنید" name="family"
                                        className="m-2 dark:text-black appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                    <span className="text-red-500"><ErrorMessage name='family' /></span>
                                </div>
                                <div>
                                    <label htmlFor="codePersonal">کد پرسنلی</label>
                                    <Field type='text' placeholder="کد پرسنلی را وارد کنید" name="codePersonal"
                                        className="m-2 dark:text-black appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                    <span className="text-red-500"><ErrorMessage name='codePersonal' /></span>
                                </div>
                                <div>
                                    <ScientificOrder />
                                </div>
                                <div>
                                    <CooperationType />
                                </div>
                                <div>
                                    <label htmlFor="chargedMinimum">حداقل موظفی</label>
                                    <Field type='text' placeholder="حداقل موظفی را وارد کنید" name="chargedMinimum"
                                        className="m-2 dark:text-black appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                    <span className="text-red-500"><ErrorMessage name='chargedMinimum' /></span>
                                </div>
                                <div>
                                    <label htmlFor="chargedMaximum">حداکثر موظفی</label>
                                    <Field type='text' placeholder="حداکثر موظفی را وارد کنید" name="chargedMaximum"
                                        className="m-2 dark:text-black appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                    <span className="text-red-500"><ErrorMessage name='chargedMaximum' /></span>
                                </div>
                            </div>
                            <div>
                                <Time setTimeData={setTimeData} timeData={timeData} />
                            </div>
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

export default Users;