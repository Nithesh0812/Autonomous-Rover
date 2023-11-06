import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import LocationDataService from "../services/location.services";

const LocationList = ({ getLocationId }) => {
  const [location, setLocation] = useState([]);
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const data = await LocationDataService.getAllLocation();
    console.log(data.docs);
    setLocation(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await LocationDataService.deleteLocation(id);
    getLocation();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getLocation}>
          Refresh List
        </Button>
      </div>

      <Table striped bordered hover size="sm" style={{backgroundColor:'grey'}}>
        <thead>
          <tr>
            <th>#</th>
            <th>Location</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {location.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.location}</td>
                <td>{doc.coordinateLat}</td>
                <td>{doc.coordinateLong}</td>
                <td>{doc.status}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getLocationId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default LocationList;