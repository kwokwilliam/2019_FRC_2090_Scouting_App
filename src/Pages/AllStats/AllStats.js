import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlueButton from '../../Components/BlueButton';
import firebase from 'firebase/app';
import 'firebase/database';
import LoadingSpinner from '../../Components/LoadingSpinner';
import { TeamsInit } from '../../Assets/Teams/Teams';
import TeamSelector from './TeamSelector/TeamSelector';
import DataCalculator from './DataCalculator/DataCalculator';

const AllStats = ({ currentUser }) => {
    const [info, setCalculatedInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [teamsToInclude, setTeamsToInclude] = useState(TeamsInit);

    useEffect(() => {
        const dataRef = firebase.database().ref("2019data");
        dataRef.on('value', (snap) => {
            let value = snap.val() || null;
            let calculatedInfo = DataCalculator(value)
            setCalculatedInfo(calculatedInfo);
            setLoading(false);
        });


        return () => { dataRef.off(); }
    }, [])

    if (loading) {
        return <>
            <LoadingSpinner />
            <Link to="/"><BlueButton>Back</BlueButton></Link>
        </>
    }

    return <>
        <Link to="/"><BlueButton>Back</BlueButton></Link>
        <hr />
        <h1>View all stats</h1>

        <h2>Click on a team to hide them</h2>
        <TeamSelector {...{ teamsToInclude, setTeamsToInclude }} />

        {info && info.cargoScores && <></>}

        <hr />
        <Link to="/"><BlueButton>Back</BlueButton></Link>
    </>
}

export default AllStats;
