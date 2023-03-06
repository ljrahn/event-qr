# EventQR

## Usage

### Scripts

To setup your scripts, you must create a firebase-privatekey.json file inside of scripts directory. This file can be downloaded from the firebase project on the web client.

Then you can run:

```
    npm run setup-scripts               (only works on mac or linux shell. might take a while)
    npm run run-script -- --help           (for help on how to use the script to create qr codes, and push to firebase)
```

note the use of "--" here. it is needed when you want to include a command line argument. For example if you want to create two QR codes:

```
    npm run run-script create-qr-code -- --count 2
```

### App

Copy paste `.env.example` and rename to `.env` and set environment variables. Firebase variables can be found in the firebase setup.

In order to login to the app, one must add the user credentials to firebase authentication in the firebase webclient. Then run:

```
npm install
npm start
```

Open EXPO app on your phone and scan the given QR Code from the terminal.

<div>
<img src="https://user-images.githubusercontent.com/56951251/223242819-0026ca34-8c82-4474-80b7-5c0e333963f4.jpeg" alt="drawing" width="300"/>
<img src="https://user-images.githubusercontent.com/56951251/223242839-8d466531-c14d-4eb4-b8fe-a2902d13cbfd.jpeg" alt="drawing" width="300"/>
</div>
