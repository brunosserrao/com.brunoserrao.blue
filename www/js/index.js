var app = {
    macAddress : '20:13:06:14:45:75',
    connectionStatus : false,
    circulo : document.querySelector('#circulo'),

    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        app.circulo.addEventListener('click', app.switchConnection, false);
    },
    onDeviceReady: function() {
        app.switchConnection;
    },
    switchConnection: function(){
        if (app.connectionStatus) {
            bluetoothSerial.disconnect(app.disconnectSuccess, app.disconnectFailure);
        } else {
            bluetoothSerial.connect(app.macAddress, app.connectSuccess, app.connectFailure);
        }
    },
    connectSuccess: function() {
        bluetoothSerial.subscribe('\n', app.onData, app.connectFailure);
        app.connectionStatus = true;
        app.changeColor();
    }, 
    connectFailure: function() {
        app.connectionStatus = false;
        app.changeColor();
        navigator.notification.alert(
            'Não conectou :(',
            null,
            'OK'
        );
    },
    disconnectSuccess: function() {
        app.connectionStatus = false;
        app.changeColor();
    }, 
    disconnectFailure: function() {
       app.connectionStatus = false;
       app.changeColor();
    },
    onData: function(data) {
        app.circulo.style.transform = "scale("+parseFloat(data / 255) * 2+")"
    },
    changeColor: function(){
        if (app.connectionStatus) {
            app.circulo.style.backgroundColor = "green";
        } else {
            app.circulo.style.backgroundColor = "red";
        }
    }
};

app.initialize();