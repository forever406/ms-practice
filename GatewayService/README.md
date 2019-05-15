# Gateway Test Logfile

## TEST 1 : MicroService VS None-MicroService

This test is going to compare the difference between a legacy system and a micro-service based system.

We ware going to test a Login Server's working capacity to tell which structure is better. In order to do that, We will use JMeter to simulate user's login and signup operation.

Legacy System:

    Gateway Service: receive HTTP requests including (Signup Request and Login Request), connect to the Database Server to create, modify, select and delete records, and send response to the tester.

    Database Server: Running a PostgreSQL for gateway service.

MicroService System:

    Gateway Service: receive HTTP requests including (Signup Request and Login Request), ask the account service to operate DB via `grpc` and send response to the tester.

    Account Service: receive account request message and make response, connect to the Database Server to create, modify, select and delete records.

    Database Server: Running a PostgreSQL for Account service.