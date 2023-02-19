## Blog Back End

## how to run 
 dev: 
      git clone https://github.com/huyhomie66/blog_be
      cd blog_be && code .
      npm i && npm run prisma-gen
      npm run dev
 test: npm run test
 local: docker run -d -p 80:9999 --name my-app my-node-app

## Production
http://54.169.176.244:9999/api-docs/

## How to deploy
I deployed by aws lightsail
First go to aws lightsail instance and create new instance
Second config network add port type custom and port number you want to host
Finally go to ssh , clone app, and run 
