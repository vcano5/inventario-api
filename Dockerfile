FROM ubuntu

RUN apt-get update

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get install -y git nodejs npm tree

# RUN git clone https://github.com/vcano5/inventario-api.git
# RUN cd /inventario-api

# # USER inventarios
# COPY --chown=inventarios:inventarios . /usr/src/inventarios_api
WORKDIR /inventario-api
COPY . /inventario-api/
# CMD [""]
RUN npm install

ENV NODE_ENV=production
ENV SECRET=d8f295710070d855
#Shake-256
ENV DB_HOST=host.docker.internal
ENV DB_USER=prueba
ENV DB_PASSWORD=prueba
ENV DB=prueba
ENV PORT=3049

EXPOSE 3049
# CMD ["tree", "-L", "2"]
CMD ["node", "app.js"]