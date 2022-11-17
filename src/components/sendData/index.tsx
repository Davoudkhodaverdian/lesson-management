import { NextPage } from "next"
import React, { useState } from "react";
import callApi from "../../app/helpers/callApi";
import Loading from "../loading";
import AgGridResult from "./agGridResult";
import { toast } from 'react-toastify';

const SendData: NextPage = () => {

    const [loading, setLoading] = useState(false);
    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setLoading(true)
        callApi().get('/userstimes').then((res) => {
            setLoading(false)
            try {
            
                dataProcess(res?.data)
                toast.success(<span className="font-vazirmatn">{'انجام شد'}</span>, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } catch (error) {
                toast.error(<span className="font-vazirmatn">{`عملیات متوقف گردید: ${error}`}</span>, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.log(error);
            }
        });
    }
    const [gridData, setGridData] = useState<any[]>([]);

    const dataProcess = ({ users, times, lessons, computerGroup, lessonsUsers }: any) => {

        console.log("received data: ", { users, times, lessons, computerGroup, lessonsUsers });
        let computerGroupList: any[] = [];
        //current year
        if (computerGroup.length > 0) {
            if (computerGroup[0].classes.split(",")[0] != '')
                computerGroupList = computerGroup.find((i: any) => i.year == "1401").classes.split(",");
        }
        const lessonsList: any = [];
        const initialchargedMinimumUsers = users.map((user: any) => ({ prsonalCode: user.personal_code, chargedMinimum: user.charged_minimum }));
        const initialLessons = lessons.map((lesson: any) => ({ ...lesson, picked: false }));
        const initialLessonsUsers = lessonsUsers.map((lesson: any) => ({ ...lesson, picked: false }));
        const typeTimes = [
            { weekday: 'شنبه', times: ['7:30-9:55', '9:55-12:20', '13:00-15:20', '15:20-17:40', '17:40-20:00'] },
            { weekday: 'یک شنبه', times: ['7:30-9:55', '9:55-12:20', '13:00-15:20', '15:20-17:40', '17:40-20:00'] },
            { weekday: 'دو شنبه', times: ['7:30-9:55', '9:55-12:20', '13:00-15:20', '15:20-17:40', '17:40-20:00'] },
            { weekday: 'سه شنبه', times: ['7:30-9:55', '9:55-12:20', '13:00-15:20', '15:20-17:40', '17:40-20:00'] },
            { weekday: 'چهار شنبه', times: ['7:30-9:55', '9:55-12:20', '13:00-15:20', '15:20-17:40', '17:40-20:00'] },
            { weekday: 'پنج شنبه', times: ['7:30-9:55', '9:55-12:20', '13:00-15:20', '15:20-17:40', '17:40-20:00'] },
        ];

        typeTimes.map(typeTime => {
            typeTime.times.map(period => {

                // typeTime.weekday;
                // period;

                const fromTime = Number(period.split('-')[0].split(":")[0]) + Number((period.split('-')[0].split(":")[1] as any) * 0.01);
                const toTime = Number(period.split('-')[1].split(":")[0]) + Number((period.split('-')[1].split(":")[1] as any) * 0.01);

                users.map((user: any, indexUser: number) => {

                    const userTimes = times.filter((time: any) => (time.personal_code == user.personal_code));

                    userTimes.map((userTime: any) => {

                        const fromUserTime = Number(userTime.first_time.split(":")[0]) + Number(userTime.first_time.split(":")[1] * 0.01);
                        const ToUserTime = Number(userTime.last_time.split(":")[0]) + Number(userTime.last_time.split(":")[1] * 0.01);

                        if (fromUserTime <= fromTime && ToUserTime >= toTime && userTime.weekday == typeTime.weekday) {
                            // console.log('true', period, typeTime.weekday)
                            if (initialchargedMinimumUsers.find((i: any) => i.prsonalCode == user.personal_code).chargedMinimum > 0) {
                                const userLessons = initialLessonsUsers.filter((lesson: any) => (lesson.personal_code == user.personal_code));
                                if (userLessons.length > 0) {
                                    userLessons.map((l: any) => {
                                        const LessonType = initialLessons.find((lesson: any) => (lesson.lesson_id == l.lesson_id))

                                        if (LessonType) {
                                            // console.log(LessonType.group_number)
                                            if (!l.picked && LessonType.group_number > 0) {
                                                if (
                                                    !lessonsList.find((itemlessonsList: any) =>
                                                        (itemlessonsList.weekday == userTime.weekday && itemlessonsList.period == period && itemlessonsList.user.personal_code == user.personal_code)
                                                    )) {

                                                    let classUser = !!computerGroupList[indexUser] ? computerGroupList[indexUser] : '-';
                                                    l.picked = true;
                                                    LessonType.group_number--;
                                                    const ch = initialchargedMinimumUsers.find((i: any) => i.prsonalCode == user.personal_code).chargedMinimum -= Number(LessonType.full_unit);
                                                    lessonsList.push({ ...l, weekday: typeTime.weekday, period, user, charged_min: ch, classUser })
                                                }
                                            }

                                        }
                                    })
                                }
                            }

                        }
                    })
                })

            })
        })


        setGridData(lessonsList);
        console.log("processed data: ", lessonsList as any);
        console.log("finaly charged_min: ", initialchargedMinimumUsers);
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input type="submit"
                    className='cursor-pointer m-2 ltr:ml-3 rtl:mr-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm rounded text-white bg-violet-500 font-bold drop-shadow hover:bg-violet-600 active:bg-violet-700 focus:ring focus:ring-violet-300'
                    value={"دریافت اطلاعات از دیتابیس"}
                />
            </form>
            {loading && <Loading />}
            <AgGridResult gridData={gridData} />
        </div>
    )

}

export default SendData;