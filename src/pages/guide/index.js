import React from 'react';
import styles from "../../global.scss";

import Arrow from "./../../assets/svg/arrow_normal";
import {Link} from "react-router-dom";


const GuidePage = ({history}) => {
    return (
        <div className={styles.guidePage}>
            <div className={styles.guidePage__Container} >
                <div className={styles.guidePage__description}>
                    <p>Вас ждёт 16 характеристик (желаний), каждое из&nbsp;которых имеет разную ценность для&nbsp;разных людей</p>
                    <p>Тест Рисса поможет осознать свои приоритеты и&nbsp;ценности</p>

                </div>
                <div className={styles.guidePage__manual}>
                    <p>Передвигайте ползунок и&nbsp;выбирайте наиболее подходящий вам вариант</p>
                    <Link to='/quests'  className={styles.guidePageBtn}>
                        Понятно
                        <span>
                            <Arrow />
                        </span>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default GuidePage;