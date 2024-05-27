import React, { useState, useEffect } from "react";

function WifiInfo() {
  const [ssid, setSSID] = useState("Empty");
  const [ip, setIP] = useState("Empty");

  useEffect(() => {
    getWifiInfo();
  }, []);

  /**
   * Handlers
   */

  async function getWifiInfo() {
    const request = await fetch("/wifiConnectInfo.json", {
      method: "POST",
    });

    const response = await request.json();

    if (request.ok) {
      setIP(response.ip);
      setSSID(response.ssid);
    }
  }

  return (
    <>
      <hr className="border-none h-0.5 w-auto bg-rose-800" />
      <div className="flex flex-row justify-around items-center">
        <label className="flex-1 label-bold-h" htmlFor="ssid">
          Conectado a:
        </label>
        <input
          className="flex-1 label-display-info"
          id="ssid"
          type="text"
          value={ssid}
          readOnly
        />
      </div>
      <div className="flex flex-row justify-around items-center">
        <label className="flex-1 label-bold-h" htmlFor="ip_addr">
          Direccion IP:
        </label>
        <input
          className="flex-1 label-display-info"
          id="ip_addr"
          type="text"
          value={ip}
          readOnly
        />
      </div>
    </>
  );
}

export default WifiInfo;
