import { NextPage } from "next";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { ErrorMessage, Field } from 'formik';
import callApi from "../../app/helpers/callApi";

interface Lesson { name: string, groupNumber: string, codeLesson: string, codeLessonType: string, theoreticalUnit: string, practicalUnit: string }

const Lessons: NextPage = () => {

    let initialValuesFormik: Lesson = { name: "", groupNumber: "", codeLesson: "", codeLessonType: "", theoreticalUnit: "", practicalUnit: "" };
    let registerFormSchema = yup.object().shape({
        name: yup.string().required('نام درس وارد نشده است'), codeLesson: yup.string().required('کد درس وارد نشده است'),
        groupNumber: yup.string().required('تعداد گروه درس وارد نشده است'),
        codeLessonType: yup.string().required('کد نوع درس درس وارد نشده است'),
        theoreticalUnit: yup.string().required('تعداد واحد نظری درس وارد نشده است'),
        practicalUnit: yup.string().required('تعداد واحد عملی درس وارد نشده است'),
    })

    return (
        <div>
            <div className="my-5">افزودن درس</div>
            <Formik
                initialValues={initialValuesFormik}
                validationSchema={registerFormSchema}
                onSubmit={
                    async (values: Lesson, { setFieldError }) => {
                       
                        try {
                            console.log(values)
                            const res = await callApi().post('/lessons', values);
                            console.log(res)
                            if (res.status === 200) {
                                console.log(res)
                            }
                        } catch (error: any) {
                            console.log(error)
                            error.forEach(({ title, message } : any) => { setFieldError(title, message as string); })
                        }

                    }
                }
            >
                <Form>
                    <div className="flex flex-wrap">
                        <div>
                            <label htmlFor="name">نام درس</label>
                            <Field type='text' placeholder="نام درس را وارد کنید" name="name"
                                className="m-2 dark:text-black appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                            <span className="text-red-500 px-1"><ErrorMessage name='name' /></span>
                        </div>
                        <div>
                            <label htmlFor="groupNumber">تعداد گروه</label>
                            <Field type='text' placeholder="تعداد گروه درس را وارد کنید" name="groupNumber"
                                className="m-2 dark:text-black appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                            <span className="text-red-500 px-1"><ErrorMessage name='groupNumber' /></span>
                        </div>
                        <div>
                            <label htmlFor="theoreticalUnit">تعداد واحد نظری</label>
                            <Field type='text' placeholder="تعداد گروه درس را وارد کنید" name="theoreticalUnit"
                                className="m-2 dark:text-black appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                            <span className="text-red-500 px-1"><ErrorMessage name='theoreticalUnit' /></span>
                        </div>
                        <div>
                            <label htmlFor="practicalUnit">تعداد واحد عملی</label>
                            <Field type='text' placeholder="تعداد گروه درس را وارد کنید" name="practicalUnit"
                                className="m-2 dark:text-black appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                            <span className="text-red-500 px-1"><ErrorMessage name='practicalUnit' /></span>
                        </div>
                        <div>
                            <label htmlFor="codeLesson">کد درس</label>
                            <Field type='text' placeholder="کد درس را وارد کنید" name="codeLesson"
                                className="m-2 dark:text-black appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                            <span className="text-red-500 px-1"><ErrorMessage name='codeLesson' /></span>
                        </div>
                        <div>
                            <label htmlFor="codeLessonType">کد نوع درس</label>
                            <Field type='text' placeholder="کد نوع درس را وارد کنید" name="codeLessonType"
                                className="m-2 dark:text-black appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                            <span className="text-red-500 px-1"><ErrorMessage name='codeLessonType' /></span>
                        </div>
                    </div>
                    <div className="flex items-end">
                        <input type='submit' value={'افزودن'}
                            className='cursor-pointer m-2 ltr:ml-3 rtl:mr-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm rounded text-white bg-violet-500 font-bold drop-shadow hover:bg-violet-600 active:bg-violet-700 focus:ring focus:ring-violet-300' />
                    </div>
                </Form>
            </Formik>
        </div>
    )

}

export default Lessons;