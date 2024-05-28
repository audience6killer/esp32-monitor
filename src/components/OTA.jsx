import React, { useRef, useState, useEffect } from "react";


function OTA() {
  const [fileName, setFileName] = useState("Empty");
  const [otaStatus, setOTAStatus] = useState('');
  const [firmwareVersion, setFirmwareVersion] = useState("Empty");
  const [otaStatusHidden, setOTAStatusHidden] = useState(true);
  const [secondsToReboot, setSecondsToReboot] = useState(null);

  const fileInput = useRef(null);
  var file = null;

  // On load
  useEffect(() => {
    getUpdateStatus();
  }, []);

  useEffect(() => {
    if (secondsToReboot !== null) {
      if (secondsToReboot > 0) {
        const timer = setTimeout(() => otaRebootTimer(), 1000);
        return () => clearTimeout(timer);
      } else if (secondsToReboot === 0 && otaStatus.includes("Rebooting in:")) {
        window.location.reload();
      }
    }
  }, [secondsToReboot, otaStatus]);

  function handleSelectFile() {
    fileInput.current.click();
  }

  async function handleUpdateFirmware() {
    var selected_file = fileInput.current;

    setOTAStatusHidden(false);

    if (selected_file.files && selected_file.files.length == 1) {
      var file = selected_file.files[0];
      var formData = new FormData();

      formData.set("file", file, file.name);
      setOTAStatus(`Uploading ${file.name}. Firmware update in progress..`);

      // Html request
      try {
        var request = new XMLHttpRequest();
        request.upload.addEventListener("progress", updateListener);
        request.open("POST", "/OTAupdate");
        request.responseType = "blob";
        request.send(formData);
      } catch (error) {
        setOTAStatus("An error occurred during the update process.");
      }
    } else {
      window.alert("Select a file first");
    }
  }

  async function updateListener(uEv) {
    if (uEv.lengthComputable) {
      await getUpdateStatus();
    } else {
      window.alert("Total size is unknown");
    }
  }

  const getUpdateStatus = async () => {
    const request = await fetch("/OTAstatus", {
      method: "POST",
      body: "ota_update_status",
    });
    const response = await request.json();
    if (request.status == 200) {
      setFirmwareVersion(response.compile_date + " - " + response.compile_time);

      if (response.ota_update_status == 1) {
        setSecondsToReboot(5);
      } else if (response.ota_update_status == -1) {
        setOTAStatus("Upload Error");
      }
    }
  };

  const otaRebootTimer = () => {
    setOTAStatus(
      `OTA Firmware Update Complete. This page will close shortly. Rebooting in: ${secondsToReboot}`
    );
    setSecondsToReboot((prevSeconds) => prevSeconds - 1);
  };

  function handleFileChange(event) {
    file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  }

  return (
    <div className="flex-col justify-center items-center text-center">
      <h2 className="text-xl lg:text-3xl">ESP32: Actualizacion de Firmware</h2>
      <div className="flex-col section-container-no-border">
        <div className="flex flex-row justify-center">
          <label htmlFor="firmware-date" className="flex-1 mr-2 font-bold">
            Último Firmware:
          </label>
          <input
            className="flex-1 text-base italic text-center"
            type="text"
            id="firmware-date"
            readOnly
            value={firmwareVersion}
          />
        </div>
        <div className="flex flex-row justify-center">
          <label htmlFor="selected-file" className="flex-1 mr-2 font-bold">
            Archivo Seleccionado:
          </label>
          <input
            className="flex-1 text-base italic text-center"
            type="text"
            id="selected-file"
            value={fileName}
            readOnly
          />
        </div>
        <div className="flex flex-row justify-around">
          <input
            type="file"
            accept=".bin"
            onChange={handleFileChange}
            ref={fileInput}
            style={{ display: "none" }}
          />
          <button
            className="button-normal"
            onClick={handleSelectFile}
          >
            Selecciona Archivo
          </button>
          <button
            onClick={handleUpdateFirmware}
            className="button-normal"
          >
            Actualiza Firmware
          </button>
        </div>
        {!otaStatusHidden && (
          <div className="flex flex-col justify-around items-center">
            <label className="flex-1 font-bold" htmlFor="ota-status">
              OTA Status:
            </label>
            <textarea
              className="flex-1 w-auto"
              type="text"
              id="ota-status"
              value={otaStatus}
              rows={2}
              cols={40}
              readOnly
            />
          </div>
        )}
        
      </div>
    </div>
  );
}

export default OTA;
