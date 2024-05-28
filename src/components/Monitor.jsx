import React, { useEffect, useState, useRef } from "react";

function Monitor({ className }) {
  const [gpsReading, setGPSreading] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    startReadingInterval();
  }, []);

  function startReadingInterval() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(getGpsInfo, 1000);
  }

  async function getGpsInfo() {
    const request = await fetch("/gpsInfo.json", {
      method: "POST",
    });

    const response = await request.json();

    if (request.ok) {
      setGPSreading((prev) => {
        if (prev) {
          return (
            `Lat: ${response.latitude}, Long: ${response.longitude}, Alt: ${response.altitude}\n` +
            prev
          );
        } else {
          return (
            `Lat: ${response.latitude}, Long: ${response.longitude}, Alt: ${response.altitude}\n`
          );;
        }
      });
    }
  }

  return (
    <div
      className={`flex-col ${className} justify-center items-center text-center`}
    >
      <h2 className="text-xl lg:text-3xl">Monitor</h2>
      <div className="flex-col p-3 border-rose-800 border-2 rounded-md m-2">
        <h3 className="flex-grow label-bold-v">Lectura de GPS</h3>
        <textarea
          name="gps-reading"
          id="gps-reading"
          className="flex-1 border-slate-700 border-2 rounded-md text-left p-2"
          rows={5}
          cols={48}
          value={gpsReading}
          readOnly
        />
      </div>
    </div>
  );
}

export default Monitor;
