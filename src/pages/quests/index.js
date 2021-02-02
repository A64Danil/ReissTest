import React, {useEffect, useContext} from 'react'

import Slider from "./../../components/Slider/Slider";

import Swal from 'sweetalert2'

import {StoreContext} from "./../../model/Store";

const Quests = ({history}) => {
    const store = useContext(StoreContext)

    useEffect(()=> {
        if (!store.userName) {
            Swal.fire('Ооххх...', 'Для прохождения теста вы должны указать имя', 'error');
            history.push('/name');
        }
    })

    return (
            <Slider history={history}/>
    )
}

export default Quests;