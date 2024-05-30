package org.jboss.as.quickstarts.ejb.remote.client;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/counter")
@RegisterRestClient(configKey="counter-api")
public interface CounterClient {

    @GET
    @Path("/increment")
    public void increment();

    @GET
    @Path("/decrement")
    public void decrement();

    @GET
    public Integer getCount();
}
