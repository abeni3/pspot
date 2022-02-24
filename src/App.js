import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { useData, useUserState, signInWithG, signOutOfG } from "./utilities/firebase.js";

import scanSVG from "../src/styles/svgs/scan.svg";
import accSVG from "../src/styles/svgs/account.svg";
import helpSVG from "../src/styles/svgs/help.svg";
import topLogo from "../src/styles/svgs/SpotLogos.png";
import close from "../src/styles/svgs/close.svg";
import CurrentLocationIcon from "../src/styles/svgs/Location.svg";
import paws from "../src/styles/svgs/paws.png";
import Activepaws from "../src/styles/svgs/ActivePaws.png";

// const ldata = require('./data/stations.json');



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
  <button className="btn"
    onClick={() => signInWithG()}>
    Sign In
  </button>

);

const SignOutButton = () => (
  <button className="btn"
      onClick={() => signOutOfG()}>
    Sign Out
  </button>
);



export default function App() { 


  const user = useUserState();
  const [mdata, loading, error] =  useData("/");
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the data...</h1>;

  // mdata.Locations.map(loc => (console.log(loc.name)));

  function  Map()  {
    
    const [selectedStation, setSelectedStation] = useState(null);
    
    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 42.0565, lng: -87.6753 }} 
        // defaultOptions={{ styles: mapStyles }} for a prettier map experience.
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
            }}
            icon={{
              url: paws,
              scaledSize: new window.google.maps.Size(25, 25)
            }}
          />
        ))}
  
        {selectedStation && (
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
        )}
      </GoogleMap>
    );
  }

  const MapWrapped = withScriptjs(withGoogleMap(Map));

  return (

    <div>
      {user ? 
     
        <div style={{ width: "100vw", height: "100vh" }}>
          
            <MapWrapped
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8bntpT3xn96QvTL2tp0q3z0PNr0A0QL4"
              loadingElement={<div style={{ height: `10%` ,width: '100%'}} />}
              containerElement={<div style={{ height: `80%`, width: '100%' }} />}
              mapElement={<div style={{ height: `100%`,width: '100%' }} />}
            />

          <SignOutButton/>

          
        </div>
    :
    <SignInButton />
    }
    </div>
  );
}