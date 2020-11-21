import React, {useState, createContext} from 'react';

import {ATP_SINGLES, WTA_SINGLES, ATP_DOUBLES, WTA_DOUBLES} from '../shared/dummyData/PLAYERS'

const PlayersContext = createContext(null)

function PlayersProvider(props) {
    const [playerGroups, setPlayerGroups] = useState({ATP_SINGLES, WTA_SINGLES, ATP_DOUBLES, WTA_DOUBLES})

    return (
        <PlayersContext.Provider value={{playerGroups}}>
            {props.children}
        </PlayersContext.Provider>
    );
}

export {PlayersProvider, PlayersContext};