
/* Fails with error:
There is an error in your model: {"code":"custom","params":{"modelItem":"9cb67952-cb3e-4a2a-adb0-a1855d2f21ef","view":"main-view"},"message":"Invalid item in view.  The item references a non-existant item in the model.","path":[]}, {"code":"custom","params":{"modelItem":"7b7c64c4-9291-40c2-baa9-90c620e56d2d","view":"main-view"},"message":"Invalid item in view.  The item references a non-existant item in the model.","path":[]}, {"code":"custom","params":{"modelItem":"ca2def27-667c-41b4-8f53-129045506fa9","view":"main-view"},"message":"Invalid item in view.  The item references a non-existant item in the model.","path":[]}, {"code":"custom","params":{"modelItem":"6f0a3ea1-7e9c-43c7-87fe-63188d4005d0","view":"main-view"},"message":"Invalid item in view.  The item references a non-existant item in the model.","path":[]}

*/
export const invalidInitialData = {
  "title": "Elvis",
  "icons": [
    {
      "id": "solar-panel",
      "name": "Solar Panel",
      "isIsometric": true,
      "url": "/icons/solar-panel.png",
      "collection": "equipment"
    },
    {
      "id": "battery",
      "name": "Battery",
      "isIsometric": true,
      "url": "/icons/battery.png",
      "collection": "equipment"
    },
    {
      "id": "appliance",
      "name": "Appliance",
      "isIsometric": true,
      "url": "/icons/appliance.png",
      "collection": "equipment"
    },
    {
      "id": "house",
      "name": "House",
      "isIsometric": true,
      "url": "/icons/house.png",
      "collection": "equipment"
    }
  ],
  "colors": [
    {
      "id": "color1",
      "value": "#a5b8f3"
    },
    {
      "id": "color2",
      "value": "#bbadfb"
    },
    {
      "id": "energy-color",
      "value": "#FFFF1C"
    }
  ],
  "items": [
    {
      "id": "9724efc4-9de5-4116-8517-0bf869f94358",
      "name": "",
      "icon": "battery"
    },
    {
      "id": "bee95d2b-58af-4b53-8634-620817b9ee89",
      "name": "",
      "icon": "solar-panel"
    }
  ],
  "views": [
    {
      "id": "main-view",
      "name": "Main view",
      "items": [
        {
          "labelHeight": 80,
          "id": "9cb67952-cb3e-4a2a-adb0-a1855d2f21ef",
          "tile": {
            "x": -1,
            "y": -5
          }
        },
        {
          "labelHeight": 80,
          "id": "7b7c64c4-9291-40c2-baa9-90c620e56d2d",
          "tile": {
            "x": 2,
            "y": -2
          }
        },
        {
          "labelHeight": 80,
          "id": "ca2def27-667c-41b4-8f53-129045506fa9",
          "tile": {
            "x": -1,
            "y": 1
          }
        },
        {
          "labelHeight": 80,
          "id": "6f0a3ea1-7e9c-43c7-87fe-63188d4005d0",
          "tile": {
            "x": -1,
            "y": -2
          }
        }
      ],
      "connectors": [
        {
          "id": "9cb67952-cb3e-4a2a-adb0-a1855d2f21ef-6f0a3ea1-7e9c-43c7-87fe-63188d4005d0",
          "anchors": [
            {
              "id": "6f0a3ea1-7e9c-43c7-87fe-63188d4005d0",
              "ref": {
                "item": "6f0a3ea1-7e9c-43c7-87fe-63188d4005d0"
              }
            },
            {
              "id": "9cb67952-cb3e-4a2a-adb0-a1855d2f21ef",
              "ref": {
                "item": "9cb67952-cb3e-4a2a-adb0-a1855d2f21ef"
              }
            }
          ],
          "width": 10,
          "color": "energy-color"
        },
        {
          "id": "7b7c64c4-9291-40c2-baa9-90c620e56d2d-6f0a3ea1-7e9c-43c7-87fe-63188d4005d0",
          "anchors": [
            {
              "id": "6f0a3ea1-7e9c-43c7-87fe-63188d4005d0",
              "ref": {
                "item": "6f0a3ea1-7e9c-43c7-87fe-63188d4005d0"
              }
            },
            {
              "id": "7b7c64c4-9291-40c2-baa9-90c620e56d2d",
              "ref": {
                "item": "7b7c64c4-9291-40c2-baa9-90c620e56d2d"
              }
            }
          ],
          "width": 2,
          "color": "energy-color"
        },
        {
          "id": "ca2def27-667c-41b4-8f53-129045506fa9-6f0a3ea1-7e9c-43c7-87fe-63188d4005d0",
          "anchors": [
            {
              "id": "ca2def27-667c-41b4-8f53-129045506fa9",
              "ref": {
                "item": "ca2def27-667c-41b4-8f53-129045506fa9"
              }
            },
            {
              "id": "6f0a3ea1-7e9c-43c7-87fe-63188d4005d0",
              "ref": {
                "item": "6f0a3ea1-7e9c-43c7-87fe-63188d4005d0"
              }
            }
          ],
          "width": 8.756822700551975,
          "color": "energy-color"
        }
      ],
      "rectangles": [],
      "textBoxes": [],
      "lastUpdated": "2025-09-02T19:52:11.466Z"
    }
  ]
};



/*
Example working element:
<div class="isoflow-container" style="width: 100vw; height: 100vh;"><div class="MuiBox-root css-vgsn72"><div class="MuiBox-root css-jcjzmk"><div class="MuiBox-root css-1ohy7av" style="translate: none; rotate: none; scale: none; transform: translate(-133px, -6px);"></div><div class="MuiBox-root css-k57fb3"><div class="MuiBox-root css-1fiwk8h"><div class="MuiBox-root css-1xw165r" style="background-position: 159.35px 355.2px; background-size: 141.5px 163.8px;"></div></div></div><div class="MuiBox-root css-1ohy7av" style="translate: none; rotate: none; scale: none; transform: translate(-133px, -6px);"><div class="MuiBox-root css-0" style="position: absolute; left: -212.25px; top: 0px; width: 300px; height: 500px; transform: matrix(0.707, -0.409, 0.707, 0.409, 0, -0.816); transform-origin: left top;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 500" width="300px" height="500px" style="transform: scale(-1, 1);"><polyline points=" 150,150 150,250 150,350" stroke="#fff" stroke-width="6.059548239931529" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.7" stroke-dasharray="none" fill="none"></polyline><polyline points=" 150,150 150,250 150,350" stroke="rgb(195,206,0)" stroke-width="4.328248742808236" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none" fill="none"></polyline><g transform="translate(150, 250)"><g transform="rotate(180)"><polygon fill="black" stroke="#fff" stroke-width="4" points="17.58,17.01 0,-17.01 -17.58,17.01"></polygon></g></g></svg></div><div class="MuiBox-root css-0" style="position: absolute; left: -212.25px; top: 163.8px; width: 500px; height: 300px; transform: matrix(0.707, -0.409, 0.707, 0.409, 0, -0.816); transform-origin: left top;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" width="500px" height="300px" style="transform: scale(-1, 1);"><polyline points=" 350,150 250,150 150,150" stroke="#fff" stroke-width="2.828427105604108" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.7" stroke-dasharray="none" fill="none"></polyline><polyline points=" 350,150 250,150 150,150" stroke="rgb(195,206,0)" stroke-width="2.020305075431506" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none" fill="none"></polyline><g transform="translate(250, 150)"><g transform="rotate(-90)"><polygon fill="black" stroke="#fff" stroke-width="4" points="17.58,17.01 0,-17.01 -17.58,17.01"></polygon></g></g></svg></div><div class="MuiBox-root css-0" style="position: absolute; left: -212.25px; top: 0px; width: 500px; height: 500px; transform: matrix(0.707, -0.409, 0.707, 0.409, 0, -0.816); transform-origin: left top;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500px" height="500px" style="transform: scale(-1, 1);"><polyline points=" 350,350 250,250 150,150" stroke="#fff" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.7" stroke-dasharray="none" fill="none"></polyline><polyline points=" 350,350 250,250 150,150" stroke="rgb(195,206,0)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none" fill="none"></polyline><g transform="translate(250, 250)"><g transform="rotate(-45)"><polygon fill="black" stroke="#fff" stroke-width="4" points="17.58,17.01 0,-17.01 -17.58,17.01"></polygon></g></g></svg></div><div class="MuiBox-root css-0" style="position: absolute; left: -70.75px; top: 81.9px; width: 500px; height: 300px; transform: matrix(0.707, -0.409, 0.707, 0.409, 0, -0.816); transform-origin: left top;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" width="500px" height="300px" style="transform: scale(-1, 1);"><polyline points=" 350,150 250,150 150,150" stroke="#fff" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.7" stroke-dasharray="none" fill="none"></polyline><polyline points=" 350,150 250,150 150,150" stroke="rgb(195,206,0)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none" fill="none"></polyline><g transform="translate(250, 150)"><g transform="rotate(-90)"><polygon fill="black" stroke="#fff" stroke-width="4" points="17.58,17.01 0,-17.01 -17.58,17.01"></polygon></g></g></svg></div><div class="MuiBox-root css-0" style="position: absolute; left: -70.75px; top: 81.9px; width: 400px; height: 500px; transform: matrix(0.707, -0.409, 0.707, 0.409, 0, -0.816); transform-origin: left top;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400px" height="500px" style="transform: scale(-1, 1);"><polyline points=" 150,350 250,250 250,150" stroke="#fff" stroke-width="2.828427105604108" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.7" stroke-dasharray="none" fill="none"></polyline><polyline points=" 150,350 250,250 250,150" stroke="rgb(195,206,0)" stroke-width="2.020305075431506" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none" fill="none"></polyline><g transform="translate(250, 250)"><g transform="rotate(0)"><polygon fill="black" stroke="#fff" stroke-width="4" points="17.58,17.01 0,-17.01 -17.58,17.01"></polygon></g></g></svg></div><div class="MuiBox-root css-0" style="position: absolute; left: -212.25px; top: 163.8px; width: 500px; height: 500px; transform: matrix(0.707, -0.409, 0.707, 0.409, 0, -0.816); transform-origin: left top;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500px" height="500px" style="transform: scale(-1, 1);"><polyline points=" 350,350 250,250 150,150" stroke="#fff" stroke-width="6.059548239931529" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.7" stroke-dasharray="none" fill="none"></polyline><polyline points=" 350,350 250,250 150,150" stroke="rgb(195,206,0)" stroke-width="4.328248742808236" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none" fill="none"></polyline><g transform="translate(250, 250)"><g transform="rotate(-45)"><polygon fill="black" stroke="#fff" stroke-width="4" points="17.58,17.01 0,-17.01 -17.58,17.01"></polygon></g></g></svg></div></div><div class="MuiBox-root css-1ohy7av" style="translate: none; rotate: none; scale: none; transform: translate(-133px, -6px);"></div><div class="MuiBox-root css-1ohy7av" style="translate: none; rotate: none; scale: none; transform: translate(-133px, -6px);"></div><div class="MuiBox-root css-yl9fg8"></div><div class="MuiBox-root css-1ohy7av" style="translate: none; rotate: none; scale: none; transform: translate(-133px, -6px);"><div class="MuiBox-root css-yv2xpk"><div class="MuiBox-root css-12efcmn" style="left: 0px; top: 40.95px;"><div class="MuiBox-root css-1isip6o"><img class="MuiBox-root css-eldj3d" src="/icons/solar-panel.png"></div><svg width="60" height="20" style="position: absolute; top: -10px; left: -30px;"><rect x="0" y="0" width="60" height="20" rx="5" ry="5" fill="#ffff" stroke-width="1px" stroke="#888f"></rect><rect x="2" y="2" width="23.103109285102946%" height="16" rx="4" ry="4" fill="yellow"></rect><text x="50%" y="58%" font-family="Arial, Helvetica, sans-serif" stroke-width="0.5px" stroke="#888f" dominant-baseline="middle" text-anchor="middle" fill="white" style="top: 10px;">87W</text></svg></div></div><div class="MuiBox-root css-1scp8t7"><div class="MuiBox-root css-12efcmn" style="left: 141.5px; top: 122.85px;"><div class="MuiBox-root css-1isip6o"><img class="MuiBox-root css-eldj3d" src="/icons/house.png"></div></div></div><div class="MuiBox-root css-wqhq80"><div class="MuiBox-root css-12efcmn" style="left: 0px; top: 204.75px;"><div class="MuiBox-root css-1isip6o"><img class="MuiBox-root css-eldj3d" src="/icons/battery.png"></div><svg width="60" height="20" style="position: absolute; top: -10px; left: -30px;"><rect x="0" y="0" width="60" height="20" rx="5" ry="5" fill="#ffff" stroke-width="1px" stroke="#888f"></rect><rect x="2" y="2" width="93.96702263345944%" height="16" rx="4" ry="4" fill="green"></rect><text x="50%" y="58%" font-family="Arial, Helvetica, sans-serif" stroke-width="0.5px" stroke="#888f" dominant-baseline="middle" text-anchor="middle" fill="white" style="top: 10px;">9997Wh</text></svg></div></div><div class="MuiBox-root css-dl9by0"><div class="MuiBox-root css-12efcmn" style="left: 141.5px; top: -40.95px;"><div class="MuiBox-root css-1isip6o"><img class="MuiBox-root css-eldj3d" src="/icons/appliance.png"></div><svg width="60" height="20" style="position: absolute; top: -10px; left: -30px;"><rect x="0" y="0" width="60" height="20" rx="5" ry="5" fill="#ffff" stroke-width="1px" stroke="#888f"></rect><rect x="2" y="2" width="94%" height="16" rx="4" ry="4" fill="red"></rect><text x="50%" y="58%" font-family="Arial, Helvetica, sans-serif" stroke-width="0.5px" stroke="#888f" dominant-baseline="middle" text-anchor="middle" fill="white" style="top: 10px;">100%</text></svg></div></div><div class="MuiBox-root css-yv2xpk"><div class="MuiBox-root css-12efcmn" style="left: 283px; top: 40.95px;"><div class="MuiBox-root css-1isip6o"><img class="MuiBox-root css-eldj3d" src="/icons/appliance.png"></div><svg width="60" height="20" style="position: absolute; top: -10px; left: -30px;"><rect x="0" y="0" width="60" height="20" rx="5" ry="5" fill="#ffff" stroke-width="1px" stroke="#888f"></rect><rect x="2" y="2" width="94%" height="16" rx="4" ry="4" fill="red"></rect><text x="50%" y="58%" font-family="Arial, Helvetica, sans-serif" stroke-width="0.5px" stroke="#888f" dominant-baseline="middle" text-anchor="middle" fill="white" style="top: 10px;">100%</text></svg></div></div><div class="MuiBox-root css-n522pu"><div class="MuiBox-root css-12efcmn" style="left: 353.75px; top: 163.8px;"><div class="MuiBox-root css-1isip6o"><img class="MuiBox-root css-eldj3d" src="/icons/battery.png"></div><svg width="60" height="20" style="position: absolute; top: -10px; left: -30px;"><rect x="0" y="0" width="60" height="20" rx="5" ry="5" fill="#ffff" stroke-width="1px" stroke="#888f"></rect><rect x="2" y="2" width="93.96702263345944%" height="16" rx="4" ry="4" fill="green"></rect><text x="50%" y="58%" font-family="Arial, Helvetica, sans-serif" stroke-width="0.5px" stroke="#888f" dominant-baseline="middle" text-anchor="middle" fill="white" style="top: 10px;">9997Wh</text></svg></div></div><div class="MuiBox-root css-1t045j"><div class="MuiBox-root css-12efcmn" style="left: 141.5px; top: 286.65px;"><div class="MuiBox-root css-1isip6o"><img class="MuiBox-root css-eldj3d" src="/icons/solar-panel.png"></div><svg width="60" height="20" style="position: absolute; top: -10px; left: -30px;"><rect x="0" y="0" width="60" height="20" rx="5" ry="5" fill="#ffff" stroke-width="1px" stroke="#888f"></rect><rect x="2" y="2" width="23.103109285102946%" height="16" rx="4" ry="4" fill="yellow"></rect><text x="50%" y="58%" font-family="Arial, Helvetica, sans-serif" stroke-width="0.5px" stroke="#888f" dominant-baseline="middle" text-anchor="middle" fill="white" style="top: 10px;">87W</text></svg></div></div></div><div class="MuiBox-root css-1ohy7av" style="translate: none; rotate: none; scale: none; transform: translate(-133px, -6px);"></div></div><div class="MuiBox-root css-1aib6bv"><div class="MuiBox-root css-85xvb3" style="left: 403px; top: 40px;"><div class="MuiPaper-root MuiPaper-outlined MuiPaper-rounded MuiCard-root css-3i48ee"><div class="css-1xhj18k"><button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1458jed" tabindex="0" type="button" aria-label="Select"><div class="MuiBox-root css-lkj5w6"><svg class="MuiSvgIcon-root MuiSvgIcon-colorAction MuiSvgIcon-fontSizeMedium css-ek2gzc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="NearMeOutlinedIcon"><path d="m17.27 6.73-4.24 10.13-1.32-3.42-.32-.83-.82-.32-3.43-1.33 10.13-4.23M21 3 3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"></path></svg></div></button><button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1rzf1e4" tabindex="0" type="button" aria-label="Pan"><div class="MuiBox-root css-bc8dey"><svg class="MuiSvgIcon-root MuiSvgIcon-colorAction MuiSvgIcon-fontSizeMedium css-ek2gzc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PanToolOutlinedIcon"><path d="M18 24h-6.55c-1.08 0-2.14-.45-2.89-1.23l-7.3-7.61 2.07-1.83c.62-.55 1.53-.66 2.26-.27L8 14.34V4.79c0-1.38 1.12-2.5 2.5-2.5.17 0 .34.02.51.05.09-1.3 1.17-2.33 2.49-2.33.86 0 1.61.43 2.06 1.09.29-.12.61-.18.94-.18 1.38 0 2.5 1.12 2.5 2.5v.28c.16-.03.33-.05.5-.05 1.38 0 2.5 1.12 2.5 2.5V20c0 2.21-1.79 4-4 4zM4.14 15.28l5.86 6.1c.38.39.9.62 1.44.62H18c1.1 0 2-.9 2-2V6.15c0-.28-.22-.5-.5-.5s-.5.22-.5.5V12h-2V3.42c0-.28-.22-.5-.5-.5s-.5.22-.5.5V12h-2V2.51c0-.28-.22-.5-.5-.5s-.5.22-.5.5V12h-2V4.79c0-.28-.22-.5-.5-.5s-.5.23-.5.5v12.87l-5.35-2.83-.51.45z"></path></svg></div></button><button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1458jed" tabindex="0" type="button" aria-label="Add item"><div class="MuiBox-root css-lkj5w6"><svg class="MuiSvgIcon-root MuiSvgIcon-colorAction MuiSvgIcon-fontSizeMedium css-ek2gzc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddOutlinedIcon"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg></div></button><button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1458jed" tabindex="0" type="button" aria-label="Rectangle"><div class="MuiBox-root css-lkj5w6"><svg class="MuiSvgIcon-root MuiSvgIcon-colorAction MuiSvgIcon-fontSizeMedium css-ek2gzc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CropSquareOutlinedIcon"><path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z"></path></svg></div></button><button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1458jed" tabindex="0" type="button" aria-label="Connector"><div class="MuiBox-root css-lkj5w6"><svg class="MuiSvgIcon-root MuiSvgIcon-colorAction MuiSvgIcon-fontSizeMedium css-ek2gzc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EastOutlinedIcon"><path d="m15 5-1.41 1.41L18.17 11H2v2h16.17l-4.59 4.59L15 19l7-7-7-7z"></path></svg></div></button><button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1458jed" tabindex="0" type="button" aria-label="Text"><div class="MuiBox-root css-lkj5w6"><svg class="MuiSvgIcon-root MuiSvgIcon-colorAction MuiSvgIcon-fontSizeMedium css-ek2gzc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TitleIcon"><path d="M5 4v3h5.5v12h3V7H19V4z"></path></svg></div></button></div></div></div><div class="MuiBox-root css-2fjx0h" style="top: 642px; left: 40px;"><div class="css-1yjo05o"><div class="MuiPaper-root MuiPaper-outlined MuiPaper-rounded MuiCard-root css-3i48ee"><div class="css-1xhj18k"><button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1458jed" tabindex="0" type="button" aria-label="Zoom out"><div class="MuiBox-root css-19rfp15"><svg class="MuiSvgIcon-root MuiSvgIcon-colorAction MuiSvgIcon-fontSizeMedium css-ek2gzc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="RemoveIcon"><path d="M19 13H5v-2h14v2z"></path></svg></div></button><hr class="MuiDivider-root MuiDivider-fullWidth MuiDivider-vertical MuiDivider-flexItem css-1d7q5f8"><div class="MuiBox-root css-maoyja"><p class="MuiTypography-root MuiTypography-body2 css-k55fzd">100%</p></div><hr class="MuiDivider-root MuiDivider-fullWidth MuiDivider-vertical MuiDivider-flexItem css-1d7q5f8"><button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1458jed" tabindex="0" type="button" aria-label="Zoom in"><div class="MuiBox-root css-lkj5w6"><svg class="MuiSvgIcon-root MuiSvgIcon-colorAction MuiSvgIcon-fontSizeMedium css-ek2gzc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddIcon"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg></div></button></div></div><div class="MuiPaper-root MuiPaper-outlined MuiPaper-rounded MuiCard-root css-3i48ee"><button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1458jed" tabindex="0" type="button" aria-label="Fit to screen"><div class="MuiBox-root css-lkj5w6"><svg class="MuiSvgIcon-root MuiSvgIcon-colorAction MuiSvgIcon-fontSizeMedium css-ek2gzc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CropFreeOutlinedIcon"><path d="M3 5v4h2V5h4V3H5c-1.1 0-2 .9-2 2zm2 10H3v4c0 1.1.9 2 2 2h4v-2H5v-4zm14 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zm0-16h-4v2h4v4h2V5c0-1.1-.9-2-2-2z"></path></svg></div></button></div></div></div><div class="MuiBox-root css-12efcmn" style="top: 40px; left: 40px;"></div><div class="MuiBox-root css-wy4oyt" style="left: 221.5px; top: 642px; height: 40px; width: 44px;"><div class="MuiPaper-root MuiPaper-outlined MuiPaper-rounded MuiCard-root css-1pigkmv"><div class="css-u4p24i"><p class="MuiTypography-root MuiTypography-body1 css-vm2et1">Elvis</p><svg class="MuiSvgIcon-root MuiSvgIcon-colorAction MuiSvgIcon-fontSizeMedium css-ek2gzc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ChevronRightIcon"><path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg><p class="MuiTypography-root MuiTypography-body1 css-vm2et1">Main view</p></div></div></div></div><div class="MuiBox-root css-1ohy7av" style="translate: none; rotate: none; scale: none; transform: translate(-133px, -6px);"><div class="MuiBox-root css-0"></div></div></div></div>
*/
export const validInitialData = {
    "title": "Elvis",
    "icons": [
        {
            "id": "solar-panel",
            "name": "Solar Panel",
            "isIsometric": true,
            "url": "/icons/solar-panel.png",
            "collection": "equipment"
        },
        {
            "id": "battery",
            "name": "Battery",
            "isIsometric": true,
            "url": "/icons/battery.png",
            "collection": "equipment"
        },
        {
            "id": "appliance",
            "name": "Appliance",
            "isIsometric": true,
            "url": "/icons/appliance.png",
            "collection": "equipment"
        },
        {
            "id": "house",
            "name": "House",
            "isIsometric": true,
            "url": "/icons/house.png",
            "collection": "equipment"
        }
    ],
    "colors": [
        {
            "id": "color1",
            "value": "#a5b8f3"
        },
        {
            "id": "color2",
            "value": "#bbadfb"
        },
        {
            "id": "energy-color",
            "value": "#FFFF1C"
        }
    ],
    "items": [
        {
            "id": "e71bf87d-b775-458e-ae4d-d7466edf971e",
            "name": "",
            "icon": "solar-panel"
        },
        {
            "id": "2d64618f-df40-42f4-88fe-c774efd4c26f",
            "name": "",
            "icon": "house"
        },
        {
            "id": "b7b19094-1787-4dda-8ad1-82078c554c92",
            "name": "",
            "icon": "battery"
        },
        {
            "id": "835b13a9-0917-4407-8e78-322b781b6460",
            "name": "",
            "icon": "appliance"
        },
        {
            "id": "2817e0e3-e9f8-4cec-ba44-3456964a47e1",
            "name": "",
            "icon": "appliance"
        },
        {
            "id": "c7435a6f-bcbe-4afa-a563-6b7cdf956e3c",
            "name": "",
            "icon": "appliance"
        },
        {
            "id": "3fd86d44-74f8-474b-b3c1-8b5e32f05df5",
            "name": "",
            "icon": "appliance"
        },
        {
            "id": "1d2584eb-18ff-4f4e-8506-a75dfb5a4b04",
            "name": "",
            "icon": "appliance"
        },
        {
            "id": "b994649a-6b0c-424c-ba20-44f3e044b4f2",
            "name": "",
            "icon": "appliance"
        },
        {
            "id": "d0fc1e2a-5169-4e69-a0cb-894f10b74634",
            "name": "",
            "icon": "battery"
        },
        {
            "id": "fa657046-2fca-4789-b640-97d8b59cb494",
            "name": "",
            "icon": "solar-panel"
        },
        {
            "id": "74118f54-c906-4c22-828d-ab3be53bc819",
            "name": "",
            "icon": "appliance"
        },
        {
            "id": "64bea427-91fb-44bf-a1a5-9e5e8d3c5a0a",
            "name": "",
            "icon": "battery"
        },
        {
            "id": "2c71d868-3663-4a70-9450-410027c1e4d0",
            "name": "",
            "icon": "battery"
        },
        {
            "id": "403b5a1a-a719-4a0d-b94a-af3fd92793f8",
            "name": "",
            "icon": "solar-panel"
        },
        {
            "id": "ea6fb431-49a5-43ab-906d-9fa3b1af018e",
            "name": "",
            "icon": "appliance"
        },
        {
            "id": "ceba37cd-4ad3-4609-8014-fd063cf50438",
            "name": "",
            "icon": "battery"
        },
        {
            "id": "47fb5b95-c9ce-48f1-b861-28405bd50769",
            "name": "",
            "icon": "solar-panel"
        },
        {
            "id": "dcc432e4-d9bd-4384-80f0-0669704b6785",
            "name": "",
            "icon": "appliance"
        },
        {
            "id": "7e7797dc-96ab-4b3b-854b-bc2c15d3bcf6",
            "name": "",
            "icon": "solar-panel"
        },
        {
            "id": "60def48a-f2dc-4435-ad87-4e9b62c5d238",
            "name": "",
            "icon": "battery"
        },
        {
            "id": "1d7d2700-a065-4e98-b7cf-ac33aae79c72",
            "name": "",
            "icon": "appliance"
        },
        {
            "id": "35c0e865-d433-43d2-b564-dcb0f06e0684",
            "name": "",
            "icon": "battery"
        },
        {
            "id": "7c1eb505-23bd-4aa5-98b7-e4f2ae55c072",
            "name": "",
            "icon": "solar-panel"
        }
    ],
    "views": [
        {
            "connectors": [
                {
                    "id": "7c1eb505-23bd-4aa5-98b7-e4f2ae55c072-2d64618f-df40-42f4-88fe-c774efd4c26f",
                    "anchors": [
                        {
                            "id": "7c1eb505-23bd-4aa5-98b7-e4f2ae55c072",
                            "ref": {
                                "item": "7c1eb505-23bd-4aa5-98b7-e4f2ae55c072"
                            }
                        },
                        {
                            "id": "2d64618f-df40-42f4-88fe-c774efd4c26f",
                            "ref": {
                                "item": "2d64618f-df40-42f4-88fe-c774efd4c26f"
                            }
                        }
                    ],
                    "width": 9.520035265050854,
                    "color": "energy-color"
                },
                {
                    "id": "35c0e865-d433-43d2-b564-dcb0f06e0684-2d64618f-df40-42f4-88fe-c774efd4c26f",
                    "anchors": [
                        {
                            "id": "2d64618f-df40-42f4-88fe-c774efd4c26f",
                            "ref": {
                                "item": "2d64618f-df40-42f4-88fe-c774efd4c26f"
                            }
                        },
                        {
                            "id": "35c0e865-d433-43d2-b564-dcb0f06e0684",
                            "ref": {
                                "item": "35c0e865-d433-43d2-b564-dcb0f06e0684"
                            }
                        }
                    ],
                    "width": 2,
                    "color": "energy-color"
                },
                {
                    "id": "1d7d2700-a065-4e98-b7cf-ac33aae79c72-2d64618f-df40-42f4-88fe-c774efd4c26f",
                    "anchors": [
                        {
                            "id": "2d64618f-df40-42f4-88fe-c774efd4c26f",
                            "ref": {
                                "item": "2d64618f-df40-42f4-88fe-c774efd4c26f"
                            }
                        },
                        {
                            "id": "1d7d2700-a065-4e98-b7cf-ac33aae79c72",
                            "ref": {
                                "item": "1d7d2700-a065-4e98-b7cf-ac33aae79c72"
                            }
                        }
                    ],
                    "width": 10,
                    "color": "energy-color"
                },
                {
                    "id": "ea6fb431-49a5-43ab-906d-9fa3b1af018e-2d64618f-df40-42f4-88fe-c774efd4c26f",
                    "anchors": [
                        {
                            "id": "2d64618f-df40-42f4-88fe-c774efd4c26f",
                            "ref": {
                                "item": "2d64618f-df40-42f4-88fe-c774efd4c26f"
                            }
                        },
                        {
                            "id": "ea6fb431-49a5-43ab-906d-9fa3b1af018e",
                            "ref": {
                                "item": "ea6fb431-49a5-43ab-906d-9fa3b1af018e"
                            }
                        }
                    ],
                    "width": 10,
                    "color": "energy-color"
                },
                {
                    "id": "d0fc1e2a-5169-4e69-a0cb-894f10b74634-2d64618f-df40-42f4-88fe-c774efd4c26f",
                    "anchors": [
                        {
                            "id": "2d64618f-df40-42f4-88fe-c774efd4c26f",
                            "ref": {
                                "item": "2d64618f-df40-42f4-88fe-c774efd4c26f"
                            }
                        },
                        {
                            "id": "d0fc1e2a-5169-4e69-a0cb-894f10b74634",
                            "ref": {
                                "item": "d0fc1e2a-5169-4e69-a0cb-894f10b74634"
                            }
                        }
                    ],
                    "width": 2,
                    "color": "energy-color"
                },
                {
                    "id": "e71bf87d-b775-458e-ae4d-d7466edf971e-2d64618f-df40-42f4-88fe-c774efd4c26f",
                    "anchors": [
                        {
                            "id": "e71bf87d-b775-458e-ae4d-d7466edf971e",
                            "ref": {
                                "item": "e71bf87d-b775-458e-ae4d-d7466edf971e"
                            }
                        },
                        {
                            "id": "2d64618f-df40-42f4-88fe-c774efd4c26f",
                            "ref": {
                                "item": "2d64618f-df40-42f4-88fe-c774efd4c26f"
                            }
                        }
                    ],
                    "width": 9.520035265050854,
                    "color": "energy-color",
                    "description": ""
                }
            ],
            "id": "main-view",
            "name": "Main view",
            "items": [
                {
                    "labelHeight": 80,
                    "id": "7c1eb505-23bd-4aa5-98b7-e4f2ae55c072",
                    "tile": {
                        "x": -2,
                        "y": -4
                    }
                },
                {
                    "labelHeight": 80,
                    "id": "35c0e865-d433-43d2-b564-dcb0f06e0684",
                    "tile": {
                        "x": 1,
                        "y": -4
                    }
                },
                {
                    "labelHeight": 80,
                    "id": "1d7d2700-a065-4e98-b7cf-ac33aae79c72",
                    "tile": {
                        "x": 2,
                        "y": -2
                    }
                },
                {
                    "labelHeight": 80,
                    "id": "ea6fb431-49a5-43ab-906d-9fa3b1af018e",
                    "tile": {
                        "x": 2,
                        "y": 0
                    }
                },
                {
                    "labelHeight": 80,
                    "id": "d0fc1e2a-5169-4e69-a0cb-894f10b74634",
                    "tile": {
                        "x": -2,
                        "y": -2
                    }
                },
                {
                    "labelHeight": 80,
                    "id": "2d64618f-df40-42f4-88fe-c774efd4c26f",
                    "tile": {
                        "x": 0,
                        "y": -2
                    }
                },
                {
                    "labelHeight": 80,
                    "id": "e71bf87d-b775-458e-ae4d-d7466edf971e",
                    "tile": {
                        "x": 0,
                        "y": 0
                    }
                }
            ],
            "rectangles": [],
            "textBoxes": [],
            "lastUpdated": "2025-09-02T21:07:42.106Z"
        }
    ]
};
