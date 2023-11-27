// App.js
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';
 
function App() {
 
    // inicializamos las variables 
    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("bob");
    const [to, setTo] = useState("usd");
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);
 
    // LLamada al API
    useEffect(() => {
        Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
            .then((res) => {
                setInfo(res.data[from]);
                console.log(res.data[from])
            })
    }, [from]);
 
    // Llamamos a la funcion convertir
    useEffect(() => {
        setOptions(Object.keys(info));
        convert();
    }, [info])
 
    // Funcion para convertir la divisa
    function convert() {
        var rate = info[to];
        setOutput(input * rate);
    }
 
    // funcion para cambiar el orden de las divisas
    function flip() {
        var temp = from;
        setFrom(to);
        setTo(temp);
    }
 
    return (
        <div className="App">
            <div className="heading">
                <h1>RECUPERATORIO USIP MODULO VII</h1>
            </div>
            <div className="container">
                <div className="left">
                    <h3>Monto</h3>
                    <input type="text"
                        placeholder="Ingrese el Monto"
                        onChange={(e) => setInput(e.target.value)} />
                </div>
                <div className="middle">
                    <h3>DE:</h3>
                    <Dropdown options={options}
                        onChange={(e) => { setFrom(e.value) }}
                        value={from} placeholder="DE.." />
                </div>
                <div className="switch">
                    <HiSwitchHorizontal size="30px"
                        onClick={() => { flip() }} />
                </div>
                <div className="right">
                    <h3>A:</h3>
                    <Dropdown options={options}
                        onChange={(e) => { setTo(e.value) }}
                        value={to} placeholder="A:" />
                </div>
            </div>
            <div className="Resultado:">
                <button onClick={() => { convert() }}>Convertir</button>
                <h2>Monto Convertido:</h2>
                <p>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>
 
            </div>

            <div className="Paises">
            <h2>PAISES:</h2>
                <h3>ars Peso Argentino, bob Peso Boliviano, brl Real Brasilero</h3>
                <h3>ves Bolívar Venezolano, pen Sol Peruano, clp Peso Chileno</h3>
                <h3>uyu Peso Uruguayo, pyg  Guarani Paraguayo, cop Peso Colombiano, usd Dolar</h3>

                <p>Diplomante: Balois Zambrana Alvarez</p>
            </div>
        </div>
    );
}
 
export default App;