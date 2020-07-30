import React, { Fragment, useContext } from 'react';

import './Home.scss';
import OverviewControls from '../../components/overviewControls/OverviewControls';
import TopView from '../../components/topView/TopView';
import BottomView from '../../components/bottomView/BottomView';
import { FileContext } from '../../context/FileContext';

function Home(props) {

    const { loading, error } = useContext(FileContext);

    if(loading) {
        return (
            <div className='loading'>
                <p>Fetching data...</p>
            </div>
        )
    }

    if(error) {
        return (
            <div className='error'>
                <p>Error fetching data!</p>
            </div>
        )
    }

    return (
        <Fragment>
            <div className='home'>
                <OverviewControls />
                <TopView />
                <BottomView />
            </div>
        </Fragment>
    )
}



export default Home;
