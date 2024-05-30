package org.example.ejb.remote.client;

import org.example.ejb.remote.stateful.RemotePhoneNumberGenerator;
import org.example.ejb.remote.stateless.RemoteNameCapitalizer;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import java.util.Hashtable;

public class RemoteEJBClientClass {
    private static final String HTTP = "http";

    public static void main(String[] args) throws Exception {
        // Invoke a stateless bean
        invokeStatelessBean("john doe");

        // Invoke a stateful bean
        invokeStatefulBean();
    }

    /**
     * Looks up a stateless bean and invokes on it
     *
     * @throws NamingException
     */
    private static void invokeStatelessBean(String name) throws NamingException {
        // Lookup the remote stateless name capitalizer
        final RemoteNameCapitalizer statelessRemoteNameCapitalizer = lookupRemoteStatelessNameCapitalizer();
        System.out.println("Obtained a remote stateless name capitalizer for invocation");
        // Invoke on the remote name capitalizer
        String capitalizedName = statelessRemoteNameCapitalizer.capitalizeName(name);
        System.out.println("Capitalized name: " + capitalizedName);
    }

    /**
     * Looks up a stateful bean and invokes on it
     *
     * @throws NamingException
     */
    private static void invokeStatefulBean() throws NamingException {
        // Lookup the remote stateful phone number generator
        final RemotePhoneNumberGenerator statefulRemotePhoneNumberGenerator = lookupRemoteStatefulPhoneNumberGenerator();
        System.out.println("Obtained a remote stateful phone number generator for invocation");
        // Generate and print a random phone number
        String phoneNumber = statefulRemotePhoneNumberGenerator.generatePhoneNumber();
        System.out.println("Generated phone number: " + phoneNumber);
    }

    /**
     * Looks up and returns the proxy to remote stateless name capitalizer bean
     *
     * @return
     * @throws NamingException
     */
    private static RemoteNameCapitalizer lookupRemoteStatelessNameCapitalizer() throws NamingException {
        final Hashtable<String, String> jndiProperties = new Hashtable<>();
        jndiProperties.put(Context.INITIAL_CONTEXT_FACTORY, "org.wildfly.naming.client.WildFlyInitialContextFactory");
        jndiProperties.put(Context.PROVIDER_URL, "http://localhost:8080/wildfly-services");
        final Context context = new InitialContext(jndiProperties);
        return (RemoteNameCapitalizer) context.lookup("ejb:/ejb-remote-server-side/NameCapitalizerBean!"
                + RemoteNameCapitalizer.class.getName());
    }

    /**
     * Looks up and returns the proxy to remote stateful phone number generator bean
     *
     * @return
     * @throws NamingException
     */
    private static RemotePhoneNumberGenerator lookupRemoteStatefulPhoneNumberGenerator() throws NamingException {
        final Hashtable<String, String> jndiProperties = new Hashtable<>();
        jndiProperties.put(Context.INITIAL_CONTEXT_FACTORY, "org.wildfly.naming.client.WildFlyInitialContextFactory");
        jndiProperties.put(Context.PROVIDER_URL, "http://localhost:8080/wildfly-services");
        final Context context = new InitialContext(jndiProperties);
        return (RemotePhoneNumberGenerator) context.lookup("ejb:/ejb-remote-server-side/PhoneNumberGeneratorBean!"
                + RemotePhoneNumberGenerator.class.getName() + "?stateful");
    }
}
