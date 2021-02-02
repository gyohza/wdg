# WdgNg

A little exercise in Angular with the [ReqRes.in](https://reqres.in/) API.

## Requirements

To run this project you will need:

* [Node v12.16.2](https://nodejs.org/en/blog/release/v12.16.2/) (later versions will probably work just fine);
* [Git 2.28.0](https://git-scm.com/downloads) (also expected to work with later versions).

All the development process and testing was done in Win 10 Home OS and Google Chrome browser, but the application is expected to work in Linux distros and other browsers. 

## Setting up

1. With Git Bash, clone this repository somewhere in your system with the following command:

```bash
git clone https://github.com/gyohza/wdg.git
```

2. After the cloning process is finished, enter the repository's directory with:

```cd wdg```

3. Install the required packages by running:

```bash
npm install
```

4. Serve the application with the [Angular CLI](https://cli.angular.io/):

```bash
ng serve
```

5. Wait for the buildup process to complete.

6a. You can check if the application is running properly by accessing [http://localhost:4200/].

6b. The application will be served on port `4200` by default. In case of any warnings regarding this port, **make sure it's not being blocked by some other application, _especially_ another Angular app**.

6c. You may quit the application by pressing `Ctrl`+`C` or by exiting the terminal.
