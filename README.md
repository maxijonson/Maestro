# Maestro

Maestro is a Node.js server written in TypeScript that runs on your machine, can receive HTTPS requests to perform actions on your machine such as running programs, putting your computer to sleep, etc. Since this is entirely designed to run locally, you'll need a way of receiving requests from the internet. So far, you can set a custom domain name for localtunnel.me (no sign up required, explained below) and Maestro takes care of the rest. You will then have a public address such as example.localtunnel.me which you can then send requests to and they will be forwarded to your local machine. 

####  Disclaimer

Note that localtunnel.me is not a very robust service and crashes a lot, but it is the only one I know that let's you set your own custom domains so you don't have to reconfigure them every time. However, if the server is closed unproperly, it won't be able to cleanup properly and your domain may no longer be available for an uncertain amount of time. Other services like ngrok are more robust but are paid services to get custom domains. It is planned to find a workaround for this, but for now, just be aware there may be crashes that may or may not be related to Maestro.

## Compatibility

Maestro was developed on Windows 10 and commands such as `START_APPLICATION` run Windows commands behind the scenes. So it only works on Windows, but could be easily edited to suit your OS if you change the commands that are executed.

## Install

As of right now, this repo is not on NPM. You can simply download the source and

```bash
npm i
```

to install the dependencies. Then, simply use the following to start Maestro

```bash
npm start
```

## Configuration

Look for any `*.blank.*` file, remove that `.blank` part and edit the file to fill the configuration. 

#### auth.json

`LOCALTUNNEL_SUBDOMAIN`: The name of your localtunnel.me subdomain. You can set this to anything you like, no signup is required. Keep it secret, this is a public link and can let others make unauthorized requests. They can't send viruses or take control, but anything you can do with this server, they can too! 

#### programs.ts

`programs`: A collection of programs that can be launched via the `START_APPLICATION` command. The key is the name of the program which would be supplied in the `data` field of the request. the `path` is the absolute path to the .exe or whatever you're trying to open. Just keep in mind that, behind the scenes, Node executes a `start` command just like you would in CMD.

Note: keep the keys lowercase.

#### config.ts

`port`: define the port that is used for your server. This is also the port that localtunnel.me forwards to.

## Commands

Here's the list of commands I have created so far. However, nothing stops you from adding your own endpoints. Remember that it works like any API would: it receives a request at an address and performs an action.

#### START_APPLICATION

###### POST /start

Starts an application defined in `programs.ts`. 

| parameter |  type  | optionnal |            description             |
| :-------: | :----: | :-------: | :--------------------------------: |
|   data    | string |           | refers to the key in `programs.ts` |

## Feature wishlist

As of today, Maestro was initially made for making requests from Google Home through the IFTTT Webhook applet. A simple yet functioning (and very cool!) feature I wanted to add to my experience. But it is Maestro's nature to be flexible to any context, because it really is just a dead simple API! However, keep in mind future development of it may or may not continue. This is what I would like to do if I ever do take it a step further:

* Alternative to localtunnel.
* Authentication so that not just a simple POST can trigger actions.


## License

ISC

