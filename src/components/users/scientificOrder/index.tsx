import React from "react"
import { Field, ErrorMessage } from "formik";
const ScientificOrder: React.FC = () => {


    const options = [
        { key: "1", value: "استاد" },
        { key: "2", value: "دانشیار" },
        { key: "3", value: "استادیار" },
        { key: "4", value: "مربی" },
    ]
    return (
        <div className='flex items-center flex-col'>
                <label htmlFor="scientificOrder">مرتبه علمی</label>
            <Field as="select" name='scientificOrder' className="m-2 dark:text-black appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                {options.map(item => (<option key={item.key} value={item.key}>{item.value}</option>))}
            </Field>
            <span className="text-red-500"><ErrorMessage name='scientificOrder' /></span>
        </div>

    )
}


export default ScientificOrder;