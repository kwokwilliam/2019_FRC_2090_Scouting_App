import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import AddImage from './AddImage/AddImage';
import Spacer from '../../../Components/Spacer';
import ShowHatchData from './ShowHatchData/ShowHatchData';
import ShowCargoData from './ShowCargoData/ShowCargoData';
import ShowTotalScores from './ShowTotalScores/ShowTotalScores';
import ShowNearRocketScoring from './ShowNearRocketScoring/ShowNearRocketScoring';
import ShowFarRocketScoring from './ShowFarRocketScoring/ShowFarRocketScoring';
import CargoComfort from './CargoComfort/CargoComfort';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ShowClimbs from './ShowClimbs/ShowClimbs';

const TeamStats = ({ teamData, selectedTeam }) => {
    if (selectedTeam === 0) {
        return <><h2>Please select a team to view data about them</h2></>
    }

    let items;
    let matchData;
    if (teamData) {
        items = teamData.images || {};
        matchData = teamData.match_data || {};
    } else {
        items = {};
        matchData = {};
    }

    let areImages = false;
    if (Object.keys(items).length > 0) {
        items = Object.keys(items).map(item => {
            return { ...items[item], caption: '', header: '' }
        });
        areImages = true;
    }

    matchData = Object.keys(matchData).map(match => {
        return {
            matchNumber: Number(match),
            ...matchData[match]
        };
    })

    matchData = matchData.sort((a, b) => {
        return a.matchNumber < b.matchNumber;
    })
    return <>
        <h2>Viewing data about Team {selectedTeam}</h2>

        <h3>Pictures</h3>
        {areImages ? <div className="carouselOut" style={{ width: window.innerWidth < 700 ? '100%' : '50%', margin: 'auto' }}>
            <UncontrolledCarousel items={items} autoPlay={false} interval={false} />
        </div> : <div>There are no pictures for this team</div>}

        <div><AddImage {...{ selectedTeam }} /></div>
        <Spacer space={10} />

        {matchData.length > 0 ? <>
            <div style={{ margin: 'auto', textAlign: 'center' }}>
                {/* See chart of total scores */}
                <ShowTotalScores {...{ matchData }} />
                <hr />
                <Grid>
                    <Row>
                        <Col md={6}>
                            <h2>Hatch vs Cargo (which does the team prefer more?)</h2>
                            {/* See chart of hatch on rockets and cargo ship per match */}
                            <ShowHatchData {...{ matchData }} />
                            {/* See chart of cargo on rockets and cargo ship per match */}
                            <ShowCargoData {...{ matchData }} />
                        </Col>
                        {/* Show scoring on near and rocket */}
                        <Col md={6}>
                            <h2>Near vs Far Rocket (which does the team prefer more?)</h2>
                            <ShowNearRocketScoring {...{ matchData }} />
                            <ShowFarRocketScoring {...{ matchData }} />
                        </Col>
                    </Row>
                </Grid>
                <hr />
                <h2>Cargo ship scores (which side is the team comfortable with?)</h2>
                <CargoComfort {...{ matchData }} />
                <hr />

                {/* Climbing levels */}
                <h2>Climb level for each match (are they consistent?)</h2>
                <ShowClimbs {...{ matchData }} />

                {/* Average score in each bay */}
                {/* Average score in each rocket cell */}

                {/* See chart of preferred side to score on */}
                {/* See all observations */}
                {/* Scroll through all previous matches */}
            </div>
        </> : <>There is no match data for this team.</>}
    </>
}

export default TeamStats;