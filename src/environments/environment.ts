// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:4200',
  firebaseConfig : {
    apiKey: "AIzaSyAICUDuaHC2z3yc1e9CUtK5j7IX_u4Byls",
    authDomain: "beauty-salon-tfg.firebaseapp.com",
    databaseURL: "https://beauty-salon-tfg-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "beauty-salon-tfg",
    storageBucket: "beauty-salon-tfg.appspot.com",
    messagingSenderId: "578322032857",
    appId: "1:578322032857:web:7af1563e5f223c2c5c76c8",
    measurementId: "G-12RK5P1MFS"
  },
  services : [
    "Peluquería",
    "Barbería",
    "Uñas",
    "Estética"
  ],
  colors : {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
