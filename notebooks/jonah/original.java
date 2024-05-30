// JAX-RS Resource
@Path("/greetings")
public class GreetingResource {
    @Inject
    private GreetingService service;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> getGreetings() {
        return service.getGreetings();
    }
}

// Service
@Stateless
public class GreetingService {
    @PersistenceContext
    private EntityManager em;

    public List<String> getGreetings() {
        return em.createQuery("SELECT g.message FROM Greeting g", String.class).getResultList();
    }
}

// Entity
@Entity
public class Greeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;

    // getters and setters
}
