FROM curlimages/curl:7.69.1

ADD setup.sh setup.sh
# see https://github.com/eficode/wait-for, https://docs.docker.com/compose/startup-order/
ADD wait-for.sh wait-for.sh

ENTRYPOINT ["./wait-for.sh", "grafana:3000", "--", "./setup.sh"]
