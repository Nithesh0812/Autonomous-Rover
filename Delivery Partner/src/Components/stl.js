import React, { useEffect, useState } from "react";
import "./mystyle.css"
import LocationDataService from "../services/location.services";

const Roverdemo = () => {

    const socket = new WebSocket("wss://9kht1zgyig.execute-api.us-east-1.amazonaws.com/production");

    useEffect(() => {
        socket.onopen = function (event) {
            console.log("websocket open");
        };
    }, []);

    const unlock = () => {
        socket.send('{"action":"sendmessage","message":"unlock"}');
        console.log("Unlocked");
    }

    const start = (selectedLocation) => {
        const data = '{"action":"sendmessage","message":"' + selectedLocation.coordinateLong + ',' + selectedLocation.coordinateLat + ',' + 'start"}';
        socket.send(data)
        console.log("Started")
    };


    const rtl = () => {
        socket.send('{"action":"sendmessage","message":"rtl"}')
        console.log("abort and rtl")
    }

    const recognise = () => {
        socket.send('{"action":"sendmessage","message":"recognise"}')
        console.log("recognising and unlocking")
    }
    const [location, setLocation] = useState([]);
    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
        const data = await LocationDataService.getAllLocation();
        console.log(data.docs);
        setLocation(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    return (
        <div style={{ margin: '20px' }}>
            <button className='btn btn-primary' onClick={() => unlock()}>Unlock</button>
            <br />
            <br />
            <input type="number" placeholder="longitude" name="longitude" id="longitude"></input>
            <br />
            <br />
            <input type="number" placeholder="latitude" name="latitude" id="latitude"></input>
            <br />
            <br />
            <select onChange={(e) => {
                const selectedLocation = location.find((doc) => doc.location === e.target.value);
                document.getElementById("latitude").value = selectedLocation.coordinateLat;
                document.getElementById("longitude").value = selectedLocation.coordinateLong;
            }}>
                {location.map((doc, index) => (
                    <option key={doc.location}>{doc.location}</option>
                ))}
            </select>


            <br /><br />
            <button className='btn btn-primary' onClick={() => {
                const selectedLocation = location.find((doc) => doc.location === document.querySelector('select').value);
                if (!selectedLocation) {
                    prompt('Please select a valid location');
                } else {
                    start(selectedLocation);
                }
            }}>Start</button>


            <br />
            <br />
            <button className='btn btn-primary' onClick={() => rtl()}>Abort and return to launch</button>
            <br /><br />
            <button className='btn btn-primary' onClick={() => recognise()}>Recognise</button>
        </div>
    );
}

export default Roverdemo;
