#!/bin/bash

openssl genrsa -out certs/private.pem
openssl rsa -in certs/private.pem -pubout -out certs/public.pem
