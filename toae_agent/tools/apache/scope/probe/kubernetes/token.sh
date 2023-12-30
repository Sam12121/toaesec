#!/bin/bash
token=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
sed -i "s/-replaceToken-/$token/g" /home/toae/.kube/config
sed -i "s/KUBERNETES_SERVICE_HOST/$KUBERNETES_SERVICE_HOST/g" /home/toae/.kube/config
sed -i "s/KUBERNETES_SERVICE_PORT/$KUBERNETES_SERVICE_PORT/g" /home/toae/.kube/config
