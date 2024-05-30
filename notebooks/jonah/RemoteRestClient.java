/*
 * JBoss, Home of Professional Open Source
 * Copyright 2015, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.jboss.as.quickstarts.ejb.remote.client;

import org.eclipse.microprofile.rest.client.inject.RestClient;

import io.quarkus.logging.Log;
import io.quarkus.runtime.QuarkusApplication;
import io.quarkus.runtime.annotations.QuarkusMain;

/**
 * A sample program which acts a remote client for a EJB deployed on JBoss EAP server. This program shows how to lookup stateful and
 * stateless beans via JNDI and then invoke on them
 *
 * @author Jaikiran Pai
 */
@QuarkusMain
public class RemoteRestClient implements QuarkusApplication {

    @RestClient
    CounterClient counterClient;

    @RestClient
    CalculatorClient calculatorClient;

    @Override
    public int run(String... args) throws Exception {
        // Invoke a stateless service
        invokeStatelessService();

        // Invoke a stateful service
        invokeStatefulService();

        return 0;
    }

    /**
     * Invokes a stateless service
     *
     */
    private void invokeStatelessService() {
        // invoke on the remote calculator
        int a = 204;
        int b = 340;

        Log.info("Adding " + a + " and " + b + " via the remote stateless calculator deployed on the server");
        int sum = calculatorClient.add(a, b);

        Log.info("Remote calculator returned sum = " + sum);
        if (sum != a + b) {
            throw new RuntimeException("Remote stateless calculator returned an incorrect sum " + sum + " ,expected sum was "
                + (a + b));
        }

        // try one more invocation, this time for subtraction
        int num1 = 3434;
        int num2 = 2332;

        Log.info("Subtracting " + num2 + " from " + num1
            + " via the remote stateless calculator deployed on the server");

        int difference = calculatorClient.subtract(num1, num2);
        Log.info("Remote calculator returned difference = " + difference);

        if (difference != num1 - num2) {
            throw new RuntimeException("Remote stateless calculator returned an incorrect difference " + difference
                + " ,expected difference was " + (num1 - num2));
        }
    }

    private void invokeStatefulService() {
        // invoke on the remote counter
        final int NUM_TIMES = 5;
        Log.info("Counter will now be incremented " + NUM_TIMES + " times");
        for (int i = 0; i < NUM_TIMES; i++) {
            Log.info("Incrementing counter");
            counterClient.increment();
            Log.info("Count after increment is " + counterClient.getCount());
        }

        // now decrementing
        Log.info("Counter will now be decremented " + NUM_TIMES + " times");
        for (int i = NUM_TIMES; i > 0; i--) {
            Log.info("Decrementing counter");
            counterClient.decrement();
            Log.info("Count after decrement is " + counterClient.getCount());
        }
    }
}
