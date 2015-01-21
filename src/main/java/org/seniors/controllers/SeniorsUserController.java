package org.seniors.controllers;

import static org.seniors.config.SeniorsServerMessages.USER_ALREADY_EXISTS;

import java.util.List;

import org.seniors.dao.SeniorsUserDAO;
import org.seniors.exceptions.SeniorsServerInternalException;
import org.seniors.model.Role;
import org.seniors.model.SeniorsUser;
import org.seniors.util.EncryptionUtil;
import org.seniors.util.SeniorsConfig;

/**
 * User Controller class
 * @author <a hre="mailto:juliosugaya@gmail.com">Julio Sugaya</a>
 * 
 */
public class SeniorsUserController {

	private static SeniorsUserController instance = null;
	private static SeniorsUserDAO userDao;

	private SeniorsUserController() {}

	/**
	 * @return Single instance of <code>UserController</code> class.
	 */
	public static SeniorsUserController getInstance() {
		if (instance == null) {
			instance = new SeniorsUserController();
			userDao = new SeniorsUserDAO();
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

	public SeniorsUser createUser(SeniorsUser user) throws Exception {

		if (!userDao.exists("email", user.getEmail())) {
			user.setPassword(SeniorsConfig.getPasswordEncoder().encode(user.getPassword()));
			userDao.persist(user);
			return user;

		} else {
			throw new SeniorsServerInternalException(USER_ALREADY_EXISTS);
		}
	}

	/**
	 * Authenticate user and generate a new hash token.
	 * 
	 * @param email
	 * @param password
	 * @param deviceId
	 * @return Generate hash token.
	 * @throws Exception
	 */
	public String authenticateUser(String email, String password,
			String deviceId) throws Exception {

		List<SeniorsUser> users = userDao.search("email", email);
		if (users.size() == 0) {
			return null;
		}

		SeniorsUser user = users.get(0);
		if (!user.getPassword().equals(EncryptionUtil.encrypt(password))) {
			return null;
		}

//		for (AuthenticationHash aHash : user.getAuthenticationHashs()) {
//			if (aHash.getDeviceId().equals(deviceId)) {
//				return aHash.getHash();
//			}
//		}

//		AuthenticationHash aHash = new AuthenticationHash();
//		aHash.setDate(new Date());
//		aHash.setDeviceId(deviceId);
//		aHash.setHash(EncryptionUtil.generateUserHash(user.hashCode()));
//
//		user.getAuthenticationHashs().add(aHash);

		return "";//aHash.getHash();
	}

	/**
	 * @param id
	 * @return Search a user by id
	 * @throws Exception
	 */
	public SeniorsUser searchById(Long id) throws Exception{
		return userDao.search(id);
	}
	
	public SeniorsUser updateUser(SeniorsUser user) throws Exception {
		List<SeniorsUser> users = userDao.search("email", user.getEmail()); 
		if (users.isEmpty() || users.get(0).getId().equals(user.getId())) {
			user.setPassword(SeniorsConfig.getPasswordEncoder().encode(user.getPassword()));
			userDao.persist(user);
			return user;
		} else {
			throw new SeniorsServerInternalException(USER_ALREADY_EXISTS);
		}
	}
	
	public List<SeniorsUser> listUsers() throws Exception{
		return userDao.search();
	}
	
	public void remove(Long id) throws Exception{
		SeniorsUser user = userDao.search(id);
		userDao.remove(user);
	}
	
	public void logout(String deviceId) {
	}
	
	public void createUserStub(){
		try {
			SeniorsUser user = new SeniorsUser();
			user.setName("Admin");
			user.setEmail("admin@morpho.com");
			user.setPassword(SeniorsConfig.getPasswordEncoder().encode("123456"));
			user.setRole(Role.ADMIN);
			if (!userDao.exists("email", "admin@morpho.com")) {
				userDao.persist(user);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}