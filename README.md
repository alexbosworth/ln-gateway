# LN Gateway

A gateway proxy service to connect to a backing LND node

## Configuration

Create a `.env` file with the following variables, or set environment variables:

```shell
# gRPC Host and IP
LND_GRPC_SOCKET=127.0.0.1:10009

# LND's gRPC TLS CERT: base64 <certfile>
LND_TLS_CERT=base64Value

# If using TLS, path to the directory the certs are in
GATEWAY_TLS_CERTS_PATH=/path/to/certs/dir

# Filename of TLS cert in the TLS dir (default: fullchain.pem)
GATEWAY_TLS_CERT_FILENAME=server.crt

# Filename of TLS cert in the TLS dir (default: privkey.pem)
GATEWAY_TLS_KEY_FILENAME=server.key
```

To run locally: `npm start`

## Docker

To build the docker image: `npm run build-docker`

This will produce an image you can load somewhere else:

`docker load < docker load < ln-gateway.tar.gz`

To send it somewhere else: `rsync ln-gateway.tar.gz user@socket:/path/to/dir`

When running the image, it will require the above configuration values:

`--env-file .env`

When you run the image, map the HTTP port to your preferred external port:

`-p <External Port Number>:8080`

Or if using TLS, map the HTTPs port to your preferred external port:

`-p <External Port Number>:8081`

If you're using letsencrypt or some other TLS certs, map in their volume:

`-v /etc/letsencrypt/:/etc/letsencrypt`

To run the docker image: (add --name to give it a name)

`docker run -d <env map> <port map> <volume map> alexbosworth/ln-gateway`

You should see logs showing the internal listening ports: `docker logs <name>`

To later remove the docker image, for updating purposes:

`docker rm <name> --force`

## Development

### TLS

If testing TLS, create a self signed cert and key to use:

```shell
openssl req \
    -newkey rsa:2048 \
    -x509 \
    -nodes \
    -keyout server.key \
    -new \
    -out server.crt \
    -subj /CN=localhost \
    -reqexts SAN \
    -extensions SAN \
    -config <(cat /System/Library/OpenSSL/openssl.cnf \
        <(printf '[SAN]\nsubjectAltName=DNS:localhost')) \
    -sha256 \
    -days 3650
```

Add this cert to the trusted system certs. In MacOS Chrome: press on the cert 
alert and drag the image of the cert to downloads, then open with Keychain. 
Mark as trusted.
