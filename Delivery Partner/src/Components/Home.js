import React, { useState, useEffect } from 'react';
import { auth } from './Firebase';
import firebaseDB from './Firebase'
import Map from './Map';

const Home = ({ presentUser }) => {
  const [data, setData] = useState({
    email: "",
    item: "",
    slat: null,
    slng: null,
    dlat: null,
    dlng: null,
  })
  const changeHandler = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  const [getData, setGetData] = useState({});
  useEffect(() => {
    firebaseDB.child("orders").on('value', details => {
      setGetData(details.val());
    })
  }, [])
  const submitHandler = async (e) => {
    e.preventDefault();
    var dataAdded = await firebaseDB.child("Delivery").push(
      data,
      err => {
        if (err) {
          console.log(err);
        }
        else {
          window.alert("Ready for the Delivery");
        }
      }
    )
  }
  const deleteHandler = key => {
    firebaseDB.child(`orders/${key}`).remove(
      err => {
        if (err) {
          console.log(err)
        }
      }
    )
    firebaseDB.child(`Delivery`).remove(
      err => {
        if (err) {
          console.log(err)
        }
        else {
          window.alert("Task is Finished")
        }
      }
    )
  }
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark pt-3 pb-2 navbar-fixed-top">
          <div className="container">
            <div className="nav-item float-start">
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                  <li><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="orange" class="bi bi-justify-right" viewBox="0 0 16 18">
                    <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                  </svg></li>&nbsp;&nbsp;
                  <li> <h5 className="text-light">{presentUser.email}</h5></li>
                </ul>
              </div>
            </div>
            <div className="nav-item float-end">
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto px-3">
                  {/* <li><a href='#missions'><button className='btn btn-outline-light'>Missions</button></a></li>&nbsp;&nbsp;&nbsp;&nbsp; */}
                  <li><button className='btn btn-outline-light' onClick={() => auth.signOut()}>LogOut</button></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <br /><br /><br />
      <Map />
      <br /><br /><br />
      <div id="missions">
        <h3 className='d-flex justify-content-center text-warning'>Missions</h3><br />
        <div>
          {
            getData &&
            <div className='container'>
              {
                Object.keys(getData).map(key =>
                  <div className='d-flex justify-content-center'>
                    <table >
                      <tr className='row'>
                        <td className='col-sm-4'>
                          <p><b>Customer Name : </b>{getData[key].name}</p>
                          <p><b>Email : </b><i>{getData[key].email}&nbsp;&nbsp;&nbsp;<abbr title='Copy!' onClick={() => { navigator.clipboard.writeText(getData[key].email) }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" class="bi bi-clipboard-check" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                          </svg></abbr></i></p>
                          <p><b>Department :  </b>{getData[key].sec}</p>
                          <p><b>Item : </b>{getData[key].item}</p>
                          <p><b>Address : </b>{getData[key].address}</p>
                        </td>
                        <td className='col-sm-2 '>
                          <p className='d-flex justify-content-center'><input type='text' onChange={changeHandler} name="email" value={data.email} placeholder='Email' style={{ width: "200px", marginTop: "25px", padding: "5px" }} /></p>
                          <div className='col'>
                            <br />
                            <div style={{ width: "200px" }}>
                              <select name="item" id="item" value={data.item} onChange={changeHandler}>
                                <option name='' item="" >Items</option>
                                <option name='OCA' item="OCA" >OCA</option>
                                <option name='Cpp' item="Modern C++">Modern C++</option>
                                <option name='python' item="Python for you">Python for you</option>
                                <option name='Iot' item="Learning Iot">Learning Iot</option>
                                <option name='A4' item="A4 Papers">A4 Papers</option>
                                <option name='Whitener' item="Whitener">Whitener</option>
                                <option name='Gum' item="Gum">Gum</option>
                              </select>
                            </div>
                          </div>
                        </td>
                        <td className='col-sm-2 '>
                          <p className='d-flex justify-content-center'><input type='text' onChange={changeHandler} name="slat" value={data.slat} placeholder='Source Latitude' style={{ width: "200px", marginTop: "25px", padding: "5px" }} /></p>
                          <p className='d-flex justify-content-center'><input type='text' onChange={changeHandler} name="slng" value={data.slng} placeholder='Source Longitude' style={{ width: "200px", marginTop: "25px", padding: "5px" }} /></p>
                        </td>
                        <td className='col-sm-2'>
                          <p className='d-flex justify-content-center'><input type='text' onChange={changeHandler} name="dlat" value={data.dlat} placeholder='Destination Latitude' style={{ width: "200px", marginTop: "25px", padding: "5px" }} /></p>
                          <p className='d-flex justify-content-center'><input type='text' onChange={changeHandler} name="dlng" value={data.dlng} placeholder='Destination Longitude' style={{ width: "200px", marginTop: "25px", padding: "5px" }} /></p>
                        </td>
                        <td className='col-sm-2'>
                          <br />
                          <p className='d-flex justify-content-center'><button className='btn btn-success' onClick={submitHandler}>Submit</button></p><br />
                          <p className='d-flex justify-content-center'><button className='btn btn-danger' onClick={() => deleteHandler(key)}>Finish</button></p>
                        </td>
                      </tr>
                    </table>
                  </div>
                )
              }
            </div>
          }
        </div>
      </div>
      <br /><br /><br /><br /><br /><br />
    </>
  )
}

export default Home






