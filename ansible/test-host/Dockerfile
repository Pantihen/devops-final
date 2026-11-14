# Clean Ubuntu 24.04 "server" WITHOUT Docker, used to run deploy.yml on localhost.
# Docker itself is installed by the playbook (Docker-in-Docker, needs --privileged).
FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
 && apt-get install -y --no-install-recommends ansible-core python3-apt sudo ca-certificates curl iproute2 \
 && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

WORKDIR /workspace/ansible
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["sleep", "infinity"]
