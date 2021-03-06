# web-watcher
Watches a set of directory for changes, then sends a  socket.io event to a webpage that things have changed. Then the page can act accordingly, such as reload itself. This is VERY useful then developing the site. Make a CSS change and immediately your page refreshes.

I developed this because I have been using VIM to create all the content for my website, including CSS and Javascript. It was getting tedious saving my file, then manually reloading in the browser after changes. And then there were always weird browser caching issues where the browser would no longer load a fresh version of the HTML. I was spending too much time going back and forth.

The best use for this is to watch the directory containing the CSS files. You know how it takes some tweaking to get webpage elements to go into exactly the correct place? You can easily iterate changes and see them immediatly when the page automatically refreshes.

## To install the necessary modules:

  npm install

## To invoke:

  node watch.js

## Customization:

You can add any number of directories to watch. The provided watch.js has several examples:

```
var watcher_www = fs.watch("/fullpath_to_dir_to_watch");
watcher_www.on('change', function name(event, filename) {
        if(filename.includes(".swp")) return;
        if(filename.includes(".swx")) return;
        console.log(event);
        console.log(filename);
        emitMessage("changed");
        });
```


## HTML/Javascript

In your HTML file you need:

<script src="http://yourwebsiteURL/socket.io/socket.io.js"></script>

## In your JS add:
```
$(document).ready(function() {

    connect();

});

function connect()
{
    var socket = io.connect('http://yourwebsiteURL',
            {
            'reconnect': true,
            'reconnection delay': 5000,
            'max reconnection attempts': 10
            });


    socket.on('message', function(msg){
            //Reload this page (or whatever you want). The ?... forces a reload
            // getting past your browser cache.
            window.location = "http://yourwebsiteURL/index.html?" + Math.random();
            });
}
```

## In your nginx config file:

```
location /socket.io/ {

    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_http_version 1.1;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $host;
    proxy_pass http://localhost:3001;
    proxy_set_header    X-Forwarded-Proto $scheme;
    proxy_set_header    X-Real-IP $remote_addr;
    proxy_connect_timeout 86400s;
    proxy_send_timeout 86400s;
    proxy_read_timeout  86400s;

}
```

