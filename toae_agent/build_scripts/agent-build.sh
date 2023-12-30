#!/bin/bash

echo "Building Toae Agent"
make agent
build_result=$?
if [ $build_result -ne 0 ]
then
    exit 1
fi
