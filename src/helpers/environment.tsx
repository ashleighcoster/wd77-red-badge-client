let APIURL = ''


switch (window.location.hostname) {
    case 'localhost' :
    case '127.0.0.1' :
        APIURL = 'http://localhost:8080'
        break
    // case 'throwback-theater.herokuapp.com':
    //     APIURL = 'https://throwback-theater-server.herokuapp.com'
}

export default APIURL;