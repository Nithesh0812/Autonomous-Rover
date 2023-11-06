import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button} from "react-bootstrap";
import LocationDataService from "../services/location.services";

const AddLocation = ({ id, setLocationId }) => {
  const [location, setLocation] = useState("");
  const [coordinateLat, setCoordinateLat] = useState("");
  const [coordinateLong, setCoordinateLong] = useState("");
  const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (location === "" || coordinateLat === "" || coordinateLong === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newLocation = {
      location,
      coordinateLat,
      coordinateLong,
      status,
    };
    console.log(newLocation);

    try {
      if (id !== undefined && id !== "") {
        await LocationDataService.updateLocation(id, newLocation);
        setLocationId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await LocationDataService.addLocation(newLocation);
        setMessage({ error: false, msg: "New Location added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setLocation("");
    setCoordinateLat("");
    setCoordinateLong("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await LocationDataService.getLocation(id);
      console.log("the record is :", docSnap.data());
      setLocation(docSnap.data().location);
      setCoordinateLat(docSnap.data().coordinateLat);
      setCoordinateLong(docSnap.data().coordinateLong);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <h1><u>Locations</u></h1>
          {/* <h4>Create</h4> */}
          <Form.Group className="mb-3" controlId="formLocation">
            <InputGroup>
              <InputGroup.Text id="formLocation">Name : </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCoordinatesLat">
            <InputGroup>
              <InputGroup.Text id="formCoordinatesLat">Latitude : </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Latitude"
                value={coordinateLat}
                onChange={(e) => setCoordinateLat(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCoordinatesLong">
            <InputGroup>
              <InputGroup.Text id="formCoordinatesLong">Longitude : </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Longitude"
                value={coordinateLong}
                onChange={(e) => setCoordinateLong(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          {/* <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Available");
                setFlag(true);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Not Available");
                setFlag(false);
              }}
            >
              Not Available
            </Button>
          </ButtonGroup> */}
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddLocation;