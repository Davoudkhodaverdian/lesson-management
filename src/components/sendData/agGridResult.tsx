
import React, { useMemo, } from "react";
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


const AgGridResult: React.FC<{ gridData: any[] }> = ({ gridData }) => {

    const rowData = gridData.map(item => (
        { 
            firstName: item.user.first_name,
            lastName: item.user.last_name,
            lesson: item.name,
            period: item.period,
            class: item.classUser,
            weekday: item.weekday,
         }
    ))

    const columnDefs = [
        { field: 'firstName' },
        { field: 'lastName' },
        { field: 'lesson' },
        { field: 'period' },
        { field: 'weekday' },
        { field: 'class' },

    ]

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        floatingFilter: true,
    }), []);




    return (
        <div dir='rtl' className="h-[400px] p-3 overflow-auto w-full" >
            <AgGridReact className="ag-theme-alpine"
                rowData={rowData}
                columnDefs={columnDefs}
                rowSelection="multiple"
                defaultColDef={defaultColDef}
                animateRows={true}
            />
        </div>
    )
}

export default AgGridResult;