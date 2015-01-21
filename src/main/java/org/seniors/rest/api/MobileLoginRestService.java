package org.seniors.rest.api;

import static org.seniors.config.SeniorsServerMessages.SUCCESS;
import static org.seniors.util.ValidationUtils.LOGGER;
import static org.seniors.util.ValidationUtils.isNotNullAndEmpty;

import java.io.Serializable;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;

import org.springframework.stereotype.Component;
import org.seniors.config.SeniorsServerResponse;
import org.seniors.exceptions.SeniorsServerException;
import org.seniors.exceptions.SeniorsServerInternalException;
import org.seniors.model.dto.UserDTO;

/**
 * Action class to treat a login request on SeniorsServer
 * 
 * @author <a hre="mailto:juliosugaya@gmail.com">Julio Sugaya</a>
 */
@Component
@Path("/mobile")
public class MobileLoginRestService extends GenericRequest implements Serializable {

	/**
	 * Serial Version UID
	 */
	private static final long serialVersionUID = 778265595185600461L;

	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public SeniorsServerResponse post(@FormParam("email") String email,
			@FormParam("password") String password,
			@FormParam("device_id") String deviceId) {
		try {
			if (isNotNullAndEmpty(email, password, deviceId)) {
				String token = controllerFacade.getSeniorsUserController().authenticateUser(email, password,deviceId);
				SeniorsServerResponse response = new SeniorsServerResponse(token);
				response.setCode(SUCCESS);
				return response;
			}
			return null;
		} catch (SeniorsServerInternalException e) {
			LOGGER.error(e.getMessage());
			e.printStackTrace();
			SeniorsServerResponse response = new SeniorsServerResponse();
			response.setCode(e.getMessage());
			
			return response;
		}catch (Exception e) {
			SeniorsServerResponse response = new SeniorsServerResponse();
			response.setCode(String.valueOf(404));
			return response;
		}
	}
	
	@GET
	@Path("/user/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    public UserDTO getUserByToken(@PathParam("token") String token) {
        try {
			return controllerFacade.getUserController().getUserByToken(token);
		} catch (SeniorsServerInternalException e) {
			String message = e.getMessage();
			throw new SeniorsServerException(message,Status.NOT_FOUND);
		}
    }
}