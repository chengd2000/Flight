import React, { useEffect, useRef } from 'react'; 
import './App.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-polylinedecorator';


function Map({ hotelsData, businessesData_destination, stationsData_destination, businessesData_origin, stationsData_origin, Destination, Origin }) {

  const mapRef = useRef(null); // שמירת הפניה למפה
  let groupedLocations = {};
  let markers = [];

  
  const BusinessesIcon = L.divIcon({
    className: "custom-icon",
    html: `
      <div style="
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 22px;
      ">
        🛍️
      </div>
    `,
    iconSize: [60, 60],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
  
  const HotelsIcon = L.divIcon({
    className: "custom-icon",
    html: `
      <div style="
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 22px;
      ">
        🏢
      </div>
    `,
    iconSize: [60, 60],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
  
  const StationsIcon = L.divIcon({
    className: "custom-icon",
    html: `
      <div style="
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 22px;
      ">
        🚍
      </div>
    `,
    iconSize: [60, 60],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });

  const AirportsIcon = L.divIcon({
    className: "custom-icon", 
    html: `
      <div style="
        width: 80px;
        height: 80px; 
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 30px;
      ">
        ✈️
      </div>
    `,
    iconSize: [80, 80], // גודל האייקון
    iconAnchor: [20, 20], // עוגן האייקון
    popupAnchor: [0, -20], // עוגן התיבה הקופצת
  });
  

  const initializeMap = () => {
    if (mapRef.current) return; // אם המפה כבר קיימת, לא לאתחל אותה מחדש

    mapRef.current = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    console.log('Hotels Data:', hotelsData);
    console.log('Businesses Data d:', businessesData_destination);
    console.log('Businesses Data o:', businessesData_origin);
    console.log('Stations Data d:', stationsData_destination);
    console.log('Stations Data o:', stationsData_origin);
    console.log('Destination:', Destination);
    console.log('Origin:', Origin);

    groupAndAddMarkers();
    drawArrow();
  };

  const groupAndAddMarkers = () => {
    groupedLocations = {};

    const allData = [
      { data: hotelsData?.data || [], icon: HotelsIcon },
      { data: businessesData_destination?.businesses || [], icon: BusinessesIcon },
      { data: businessesData_origin?.businesses || [], icon: BusinessesIcon },
      { data: stationsData_destination?.stations || [], icon: StationsIcon },
      { data: stationsData_origin?.stations || [], icon: StationsIcon },
      { data: [Destination] || [], icon: AirportsIcon },
      { data: [Origin] || [], icon: AirportsIcon }
    ];

    allData.forEach(({ data, icon }) => {
      data.forEach(item => {
        // קבלת קואורדינטות על פי הסוגים השונים של הנתונים
        let latitude = item?.latitude || item.geoCode?.latitude || item.place?.location?.lat || item.coordinates?.latitude;
        let longitude = item?.longitude || item.geoCode?.longitude || item.place?.location?.lng || item.coordinates?.longitude;

        // אם אין קואורדינטות, נדלג על המיקום
        if (!latitude || !longitude) {
          console.warn(`Missing coordinates for item:`, item);
          return;
        }

        const key = `${latitude},${longitude}`;
        if (!groupedLocations[key]) {
          groupedLocations[key] = { items: [], icon };
        }
        groupedLocations[key].items.push(item);
      });
    });

    console.log('Grouped Locations:', groupedLocations);

    addMarkersToMap();
  };

  const addMarkersToMap = () => {
    for (const key in groupedLocations) {
      const { items, icon } = groupedLocations[key];
      const firstItem = items[0];

      // קבלת קואורדינטות ראשוניות מהפריט הראשון
      let latitude = firstItem.latitude || firstItem.coordinates?.latitude || firstItem.geoCode?.latitude || firstItem.place?.location?.lat;
      let longitude = firstItem.longitude || firstItem.coordinates?.longitude || firstItem.geoCode?.longitude || firstItem.place?.location?.lng;

      // אם אין קואורדינטות תקינות, נדלג על המיקום
      if (!latitude || !longitude) {
        console.warn(`Missing coordinates for item:`, firstItem);
        continue;
      }

      latitude = parseFloat(latitude);
      longitude = parseFloat(longitude);

      if (isNaN(latitude) || isNaN(longitude)) {
        console.warn(`Invalid coordinates: ${latitude}, ${longitude}`);
        continue;
      }

      const popupContent = generatePopupContent(items);
      const marker = L.marker([latitude, longitude], { icon });

      marker.bindPopup(popupContent, { maxHeight: 400 });
      marker.addTo(mapRef.current);
      markers.push(marker);
    }
  };

  const generatePopupContent = (items) => {
    let content = '<div class="popup-content">';
    items.forEach(item => {
      content += `<div> ${item.name || item.place.name || 'Unnamed' }</div>`;
    });
    content += '</div>';
    return content;
  };


  const drawArrow = () => {
    if (!Origin || !Destination) return;
  
    const originCoords = [Origin.latitude, Origin.longitude];
    const destinationCoords = [Destination.latitude, Destination.longitude];
  
    if (originCoords.includes(undefined) || destinationCoords.includes(undefined)) {
      console.warn('Missing coordinates for Origin or Destination');
      return;
    }
  
    // יצירת הפוליליין
    const polyline = L.polyline([originCoords, destinationCoords], { 
      color: 'blue', 
      weight: 4, 
      opacity: 0.7,
      dashArray: '5, 10',
      lineJoin: 'round'
    }).addTo(mapRef.current);
  
    // הוספת החץ על הפוליליין
    L.polylineDecorator(polyline, {
      patterns: [
        {
          offset: '100%', // מיקום החץ
          repeat: 0, // חץ אחד בלבד
          symbol: L.Symbol.arrowHead({
            pixelSize: 35, // גודל החץ
            polygon: true, // חץ מלא
            pathOptions: { color: 'blue', fillOpacity: 1, weight: 0 }
          })
        }
      ]
    }).addTo(mapRef.current);
  };


  useEffect(() => {
    initializeMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.off();
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
}

export default Map;
