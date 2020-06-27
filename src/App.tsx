import React from 'react';
import TablePresenter from "./Component/Table";
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>German cosmonauts</h1>
            <TablePresenter/>
            <footer>
                Andrey Kim (c) 2020
            </footer>
        </div>
    );
}

export default App;
