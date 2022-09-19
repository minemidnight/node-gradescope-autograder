#!/usr/bin/env bash

export NODE_VERSION=18.7.0

export NVM_DIR=/usr/local/nvm

# Install nodejs to run autograder

curl --silent -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

source $NVM_DIR/nvm.sh \
	&& nvm install $NODE_VERSION \
	&& nvm alias default $NODE_VERSION \
	&& nvm use default

export NODE_PATH=$NVM_DIR/v$NODE_VERSION/lib/node_modules
export PATH=$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

node -v
npm -v

# Install valgrind memory tool
apt-get install valgrind -y
