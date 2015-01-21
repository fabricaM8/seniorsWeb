package org.seniors.controllers;

import static org.seniors.config.SeniorsServerMessages.EMAIL_OR_CPF_INCORRECT;
import static org.seniors.config.SeniorsServerMessages.PASSWORD_INCORRECT;
import static org.seniors.config.SeniorsServerMessages.USER_ALREADY_EXISTS;
import static org.seniors.config.SeniorsServerMessages.USER_NOT_FOUND;
import static org.seniors.util.ValidationUtils.isNullOrEmpty;

import java.util.Date;
import java.util.List;
import java.util.Random;

import org.seniors.dao.AuthenticationHashDAO;
import org.seniors.dao.UserDAO;
import org.seniors.exceptions.SeniorsServerInternalException;
import org.seniors.model.AuthenticationHash;
import org.seniors.model.User;
import org.seniors.model.dto.UserDTO;
import org.seniors.util.EncryptionUtil;
import org.seniors.util.SeniorsConfig;

/**
 * User Controller class
 * @author <a hre="mailto:juliosugaya@gmail.com">Julio Sugaya</a>
 * 
 */
public class UserController {

	private static UserController instance = null;
	private static UserDAO userDAO;
	private static AuthenticationHashDAO authDAO;
	private UserController() {}

	/**
	 * @return Single instance of <code>UserController</code> class.
	 */
	public static UserController getInstance() {
		if (instance == null) {
			instance = new UserController();
			userDAO = new UserDAO();
			authDAO = new AuthenticationHashDAO();
		}

		return instance;
	}

	/**
	 * Creates a new user and add it to the database.
	 * 
	 * @param name
	 * @param cpf
	 * @param email
	 * @param password
	 * @throws Exception
	 */

	public void createUser(String name, String cpf, String email,
			String password, String deviceId) throws Exception {

		if (!userDAO.exists("email", email)) {
			User user = new User();
			user.setName(name);
			user.setEmail(email);
			user.setPassword(EncryptionUtil.encrypt(password));

			userDAO.persist(user);
		} else {
			throw new SeniorsServerInternalException(USER_ALREADY_EXISTS);
		}
	}
	
	public void createUsersStub(){
		User user = new User();
		
		user.setName("Admin");
		user.setEmail("admin@seniors.com");
		user.setPassword(SeniorsConfig.getPasswordEncoder().encode("123456"));
		
		try {
			
			if(!userDAO.exists("name", "Admin")){
				userDAO.persist(user);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * Authenticate user and generate a new hash token.
	 * 
	 * @param emailOrCPF
	 * @param password
	 * @param deviceId
	 * @return Generate hash token.
	 * @throws Exception
	 */
	public String authenticateUser(String emailOrCPF, String password, String deviceId) throws SeniorsServerInternalException,Exception {

		List<User> users = null;
		
		users = userDAO.search("email", emailOrCPF);
		if (isNullOrEmpty(users)) {
			
			users = userDAO.search("cpf", emailOrCPF);
			
			if(isNullOrEmpty(users)){
				SeniorsServerInternalException ie = new SeniorsServerInternalException(EMAIL_OR_CPF_INCORRECT);
				throw ie;
			}
		}
		
		if(users!=null && !users.isEmpty()){
			User user = users.get(0);
			if (!user.getPassword().equals(EncryptionUtil.encrypt(password))) {
				SeniorsServerInternalException ie = new SeniorsServerInternalException(PASSWORD_INCORRECT);
				throw ie;
			}
			for (AuthenticationHash aHash : user.getAuthenticationHashs()) {
				if (aHash.getDeviceId().equals(deviceId)) {
					deviceId = aHash.getHash();
					break;
				}
			}
			AuthenticationHash auth = new AuthenticationHash();
			auth.setDate(new Date());
			auth.setDeviceId(deviceId);
			auth.setHash(EncryptionUtil.generateUserHash(user.hashCode()));
			auth.setUser(user);
			user.getAuthenticationHashs().add(auth);
			
			userDAO.persist(user);
			
			return auth.getHash();
		}
		
//		UserDTO dto = new UserDTO();
//		dto.setName(user.getName());
//		dto.setCpf(user.getCpf());
//		dto.setEmail(user.getEmail());
//		dto.setToken(aHash.getHash());
//		
//		Random rand = new Random();
//		int points = rand.nextInt((1500-1000)+1);
//		dto.setPoints(points);

		return null;
	}
	
	/**
	 * @param token
	 * @return A {@link UserDTO} based on token.
	 * @throws SeniorsServerInternalException
	 */
	public UserDTO getUserByToken(String token) throws SeniorsServerInternalException{
		
		AuthenticationHash auth = authDAO.getAuthenticationByToken(token);
		
		if(auth!=null){
			User user = auth.getUser();
			
			UserDTO dto = new UserDTO();
			dto.setName(user.getName());
			dto.setEmail(user.getEmail());
			dto.setToken(token);
			
			Random rand = new Random();
			int points = rand.nextInt((1500-1000)+1);
			dto.setPoints(points);
			
			return dto;
		}
		
		SeniorsServerInternalException ie = new SeniorsServerInternalException(USER_NOT_FOUND);
		throw ie;
	}

	/**
	 * @param id
	 * @return Search a user by id
	 * @throws Exception
	 */
	public User searchById(Long id) throws Exception{
		return userDAO.search(id);
	}
	
	public void logout(String deviceId) {
	}
}