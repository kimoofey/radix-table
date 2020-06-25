import React from 'react';
import {format} from 'date-fns'
import {data, headers} from './CONSTS';
import {Cosmonaut} from "./types";
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>German cosmonauts</h1>
            <table>
                <thead>
                <tr>
                    {headers.map((element: string, index: number) => (<th key={`header-${index}`}>{element}</th>))}
                </tr>
                </thead>

                <tbody>
                {data.map((element: Cosmonaut, index: number) => {
                    return (
                        <tr key={element.name}>
                            <td>{element.name}</td>
                            <td>{format(element.date, 'dd/MM/yyyy')}</td>
                            <td>{element.days}</td>
                            <td>{element.mission}</td>
                            <td>{element.isMultiple}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default App;
