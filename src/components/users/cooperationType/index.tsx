import React from "react"
import { Field, ErrorMessage } from "formik";
const CooperationType: React.FC = () => {

    const options = [
        { key: "1", value: "هیات علمی - تمام وقت" },
        { key: "2", value: "هیات علمی - نیمه وقت" },
        { key: "3", value: "مدعو" },
    ]

    return (
        <div className='flex items-center flex-col'>
                <label htmlFor="cooperationType">نوع همکاری</label>
            <Field as="select" name='cooperationType' className="m-2 dark:text-black appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                {options.map(item => (<option key={item.key} value={item.key}>{item.value}</option>))}
            </Field>
            <span className="text-red-500"><ErrorMessage name='cooperationType' /></span>
        </div>
    )
}

export default CooperationType;