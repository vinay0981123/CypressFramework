FROM cypress/included:13.5.1
WORKDIR /app
COPY . .
RUN npm install typescript --force
RUN npm install cypress-xpath --legacy-peer-deps
RUN npm install --legacy-peer-deps
CMD ["npm", "run", "npx cypress run" ]