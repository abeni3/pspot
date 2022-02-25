import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { useData, useUserState, signInWithG, signOutOfG } from "./utilities/firebase.js";

import $ from 'jquery';


import scanSVG from "../src/styles/svgs/scan.svg";
import accSVG from "../src/styles/svgs/account.svg";
import helpSVG from "../src/styles/svgs/help.svg";
import paww from "../src/styles/svgs/paww.png";
import close from "../src/styles/svgs/close.svg";
import CurrentLocationIcon from "../src/styles/svgs/Location.svg";
import paws from "../src/styles/svgs/paws.png";
import Activepaws from "../src/styles/svgs/ActivePaws.png";
 
// const ldata = require('./data/stations.json');
import topLogo from "../src/styles/svgs/SpotLogos.png";

import mapStyles from "./styles/mapStyles.js";


import {
  MapLayout,
  MainLayout,
  PanelStyles,
  LocationName,
  AmenityName,
  AvailabilityTxt,
  PriceTxt,
  ScanButton,
  ScanButtonTxt,
  AmenitiesLayout,
  BottomNav,
  ScanBottomNavTxt,
  ScanButtonBottomNav,
  AccountIcon,
  HelpIcon,
  TopBanner,
} from "./styles/prev.js";
import { checkActionCode } from "firebase/auth";

/* HELP COMMENT
withGoogleMap initializes the map component while withScriptjs loads the Google Map JavaScript API v3.

withScriptjs requires -
  googleMapURL: String (Google Map API Key)
  loadingElement: ReactElement

withGoogleMap requires -
  containerElement: ReactElement (needs both height & width properties) without which the map won't display.
  mapElement: ReactElement

#the methods basically load libraries that higher order functions that make the map work
*/


const SignInButton = () => (
  <div id="signinpage">
    <img src={topLogo} id="logot"/>
    <button id="signin" className="btn"
      onClick={() => signInWithG()}>
      Sign In
    </button>
    <button id="signup" className="btn"
      onClick={() => signInWithG()}>
        New user? Sign Up with Google
    </button>
   
  </div>

);

const SignOutButton = () => (
  <button id="signout" className="btn"
      onClick={() => signOutOfG()}>
    Sign Out
  </button>
);




export default function App() { 

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);


  const user = useUserState();
  const [mdata, loading, error] =  useData("/");
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the data...</h1>;









  function  Map()  {
    

    const [selectedStation, setSelectedStation] = useState(null);
    // const [showResults, setShowResults] = useState(false)

    const Results = (station) => (
      <div id="panel">
          <img id="clo" src={close} onClick={alert("hey")}/>
  
          <h2>{station.name}</h2>
          <p>{station.amenities}</p>
  
      </div>
    );

    const [ currentPosition, setCurrentPosition ] = useState({});
  
    const success = position => {
      const currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      setCurrentPosition(currentPosition);
    };
    
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(success);
    })

    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 42.0565, lng: -87.6753 }}         
        defaultOptions={{ styles: mapStyles }} 
      >
        {mdata.Locations.map(station => (
          <Marker
            key={station.id}
            position={{
              lat: station.latitude,
              lng: station.longitude
            }}
            onClick={() => {
              setSelectedStation(station);
              // setShowResults(true)
              // console.log(showResults)
            }}
            icon={{
              url: paws,
              scaledSize: new window.google.maps.Size(25, 25)
            }}

          />

        ))}


             {<Marker position={currentPosition}
             icon={{
              url: CurrentLocationIcon,
              scaledSize: new window.google.maps.Size(25, 25)
            }}/>} 
            

  
        {selectedStation && (
          <div>
            <InfoWindow
              onCloseClick={() => {
                setSelectedStation(null);
              }}
              position={{
                lat: selectedStation.latitude,
                lng: selectedStation.longitude
              }}
            >
              <div>
                <h2>{selectedStation.name}</h2>
                <p>{selectedStation.amenities}</p>
              </div>
            </InfoWindow>

            {/* <Results station={selectedStation}/> */}
          </div>
        )}


    


      </GoogleMap>
    );
  }

  const MapWrapped = withScriptjs(withGoogleMap(Map));

  return (

    <div className="mainlayout">
      {user ? 
     
        <div style={{ width: "100%", height: "100%" }}>
          
            <div id="topbanner">
                <div id="profile">
                  <img id="profilepic" src={user.photoURL}/>

                  <p>{user.displayName}</p>

                </div>
                <img src={paww} id="logo"/>
                <SignOutButton/>
            </div>

            <MapWrapped
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8bntpT3xn96QvTL2tp0q3z0PNr0A0QL4"
              loadingElement={<div style={{ height: `100%` ,width: '100%'}} />}
              containerElement={<div style={{ height: `75%`, width: '100%' }} />}
              mapElement={<div style={{ height: `100%`,width: '100%' }} />}
            />

            <div id="bottomnav">
              <img class="botimg" src={accSVG} />
              <img class="botimg" src={scanSVG} />
              <img class="botimg" src={helpSVG} />
            </div>


            
            

          
        </div>
    :
    <SignInButton />
    }
    </div>
  );
}