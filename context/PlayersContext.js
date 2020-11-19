import React, {useState, createContext} from 'react';

const PlayersContext = createContext(null)

function PlayersProvider(props) {
    const [players, setPlayers] = useState([])

    return (
        <PlayersContext.Provider value={{players, setPlayers}}>
            {props.children}
        </PlayersContext.Provider>
    );
}

export {PlayersProvider, PlayersContext};