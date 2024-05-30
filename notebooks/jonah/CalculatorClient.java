package org.jboss.as.quickstarts.ejb.remote.client;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

@Path("/calculator")
@RegisterRestClient(configKey="calculator-api")
public interface CalculatorClient {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/add")
    public Integer add(@QueryParam("a") int a, @QueryParam("b") int b);

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/subtract")
    public Integer subtract(@QueryParam("a") int a, @QueryParam("b") int b);
}
