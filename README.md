
For whom may be interested in React.js, Express and Socket.io

![Preview](https://raw.githubusercontent.com/zamster/nodejs-react-socketio/master/preview.png "Preview")

To run this example:

1. Clone source code

2. on macOS please open Terminal and navigate to the repo folder run:  

    `npm install`

    `npm run build` for building or `npm run dev` for developing

    `npm run start` 
    
3. open [http://localhost:3000/](http://localhost:3000/) in the browser

Features:

0. Type an email address to login. Gravatar supported.

1. Allow images to be sent as part of messages

    A file upload button locates under the text input field. So that user can chose an image and upload. Now the image will be sent automatically as a message.

2. Allow private messages between users

    User can click the private message icon under avatar, then a private channel will be created. In this private channel, two user can chat privately.

3. A toggle button for controlling the hide/show of channel list. Inorder to make this app usable for mobile users.