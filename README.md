# TODO-app

This project was made for those who are forgetful and need a little help to list things they need to do. It also includes registration and login so your dear todo list stays for your eyes only.

## **Table of contents**
- [Technologies](#Technologies)
- [Installation](#Installation)
- [Deployment](#Deployment)

## **Technologies used**
- [Eta](https://eta.js.org/) JavaScript templating engine used for rendering html
- [Hono](https://hono.dev/) Web application framework user for API routing
- [Deno](https://deno.com/) Javascript runtime
- [Deno kv](https://deno.com/kv) Key-value database used for storage of todos
- [Docker](https://www.docker.com/) Used to containerize the application
- [helper from Deno](https://deno.land/x/hono@v3.12.11/helper.ts) Used to  manage cookies
- [scrypt from Deno](https://deno.land/x/scrypt@v4.3.4/mod.ts) Used to hash passwords 

## **Install & Run**

- Clone the repository
  
- Build the docker image
```
$ docker build -t todo .
```
- Run the container in a port of your choice (default is 8000)
```
$ docker run -d -p 8000:8000 todo
```
- Go to http://localhost:8000/ in your browser

- Register and start using your todo list! The data is preserved for as long as the container is running.

## **Deployment**

Layerfile can be used to deploy the application to webapp.io that creates a virtual machine and runs the container.
