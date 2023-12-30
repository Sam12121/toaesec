#!/toae/bin/bash

############################################################
# Start Toae Agent Services
############################################################
echo "Start Toae services... Console is $MGMT_CONSOLE_URL"
# exec setsid /toae/usr/local/bin/start-df-services.sh &
/toae/bin/bash /toae/usr/local/bin/start-df-services.sh &
# Wait for the agent to start
/toae/bin/sleep 20
echo "Toae agent started..."

############################################################
# Start the customer application entry point below... 
############################################################
#echo "Starting the customer application entry point below..."
#cust-entry-point.sh "$@"

# Execute customer entry-point if provided as arguments
if [ "$#" -ne 0 ]; then
    echo "Application entry-point specified as arguments to toae entrypoint. Execute application entrypoint."
    echo executing -- "$@"
    "$@"
else
    echo "No application entry-point specified as arguments to toae entrypoint."
fi

#echo "Block to avoid agent container from exiting fargate. Not needed if customer application blocks"
#/toae/usr/local/bin/block-scratch.sh
echo "Agent entry-point-scratch exiting...."

