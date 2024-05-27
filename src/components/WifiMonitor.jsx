import React, { useState, useRef, useEffect } from "react";
import WifiInfo from "./WifiInfo";

function WifiMonitor() {
  const [wifiStatusHidden, setWifiStatusHidden] = useState(true);
  const [wifiStatus, setWifiStatus] = useState(null);
  const [pwdVisibility, setPwdVisibility] = useState("password");
  const [pwd, setPwd] = useState("");
  const [ssid, setSSID] = useState("");
  const [isWifiConnected, setWifiConnectedInfo] = useState(false);
  const intervalIdRef = useRef(null);

  /**
   * Timming
   */

  useEffect(() => {
    getWifiConnectStatus();
  }, [])

  function startWifiConnectStatusInterval() {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    intervalIdRef.current = setInterval(getWifiConnectStatus, 2800);
  };

  function stopWifiConnectStatusInterval () {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  /**
   * API requests
   */
  async function connectWifi() {
    setWifiStatusHidden(false);
    setWifiStatus("Connecting...");
    startWifiConnectStatusInterval();

    await fetch("/wifiConnect.json", {
      method: "POST",
      headers: {
        "my-connect-ssid": ssid,
        "my-connect-pwd": pwd,
      },
      body: {
        timestamp: JSON.stringify(Date.now()),
      },
    });
  }

  async function getWifiConnectStatus() {
    console.log("Requesting wifi connecting status");
    const request = await fetch("/wifiConnectStatus", {
      method: "POST",
      body: "wifi_connect_status",
    });

    const response = await request.json();

    console.log(response);

    if (request.ok) {
      if (response.wifi_connect_status == 2) {
        setWifiStatus("Failed to connect. Please check your credentials.");
        setWifiConnectedInfo(false);
        stopWifiConnectStatusInterval();
      } else if (response.wifi_connect_status == 3) {
        setWifiStatus("Connection success");
        setWifiConnectedInfo(true);
        stopWifiConnectStatusInterval();
      }
    }
  }

  /**
   * Event Handlers
   */
  function handleShowPwd() {
    if (pwdVisibility == "password") {
      setPwdVisibility("text");
    } else {
      setPwdVisibility("password");
    }
  }
  function handlePwdChange(event) {
    const newValue = event.target.value;
    setPwd(newValue);
  }
  function handleSSIDChange(event) {
    const newValue = event.target.value;
    setSSID(newValue);
  }

  function handleConnectWifi() {
    if (!pwd) {
      setWifiStatusHidden(false);
      setWifiStatus("PWD cannot be empty");
      setSSID("");
      setPwd("");
      return;
    }
    if (!ssid) {
      setWifiStatusHidden(false);
      setWifiStatus("SSID cannot be empty");
      setSSID("");
      setPwd("");
      return;
    }

    connectWifi();
  }

  return (
    <div className="flex-col justify-center items-center text-center">
      <h2 className="text-xl lg:text-3xl">Estado de conexión WiFi</h2>
      <div className="flex-col section-container">
        <div className="flex flex-row justify-center">
          <label htmlFor="ssid" className="flex-1 mr-2 font-bold">
            SSID:
          </label>
          <input
            className="flex-1 input-w-border"
            type="text"
            id="ssid"
            maxLength={32}
            onChange={handleSSIDChange}
            value={ssid}
          />
        </div>
        <div className="flex flex-row justify-center">
          <label htmlFor="wifi-pwd" className="flex-1 mr-2 font-bold">
            Contraseña:
          </label>
          <input
            className="flex-1 input-w-border"
            type={pwdVisibility}
            id="wifi-pwd"
            maxLength={64}
            onChange={handlePwdChange}
            value={pwd}
          />
        </div>
        <div className="flex flex-row justify-center">
          <label htmlFor="show-pwd" className="flex-0 label-bold-h">
            Mostrar Contraseña
          </label>
          <input
            id="show-pwd"
            type="checkbox"
            className="flex-0"
            onClick={handleShowPwd}
          />
        </div>
        <div className="flex flex-row justify-center">
          <button className="button-normal" onClick={handleConnectWifi}>
            Conectar
          </button>
        </div>

        {!wifiStatusHidden && (
          <>
            <hr className="border-none h-0.5 w-auto bg-rose-800" />
            <div className="flex flex-col justify-around items-center">
              <label className="flex-1 font-bold" htmlFor="ota-status">
                WIFI Status:
              </label>
              <textarea
                className="flex-1 w-auto"
                type="text"
                id="ota-status"
                value={wifiStatus}
                rows={2}
                cols={30}
                readOnly
              />
            </div>
          </>
        )}
        {isWifiConnected && (
            <WifiInfo/>
        )}
      </div>
    </div>
  );
}

export default WifiMonitor;
