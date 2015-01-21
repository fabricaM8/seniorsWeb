package org.seniors.controllers;

import org.seniors.controllers.UserController;
import org.seniors.controllers.SeniorsUserController;


/**
 * seniors Controller Facade Implementation, that provides a single way to access all
 * controllers.
 * @author <a hre="mailto:juliosugaya@gmail.com">Julio Sugaya</a>
 *
 */
public class SeniorsServerControllerFacadeImpl implements SeniorsServerControllerFacade {

	private static SeniorsServerControllerFacadeImpl instance = null;

	//Controllers
	private static UserController userController;
	private static SeniorsUserController seniorsUserController;
	
	//Private constructor
	private SeniorsServerControllerFacadeImpl() {}

	/**
	 * @return Single instance of <code>seniorsControllerFacadeImpl</code> class.
	 */
	public static SeniorsServerControllerFacadeImpl getInstance() {
		if (instance == null) {
			instance = new SeniorsServerControllerFacadeImpl();
			seniorsUserController = SeniorsUserController.getInstance();
			userController = UserController.getInstance();
		}
		return instance;
	}
	

	@Override
	public SeniorsUserController getSeniorsUserController() {
		return seniorsUserController;
	}

	public UserController getUserController() {
		return userController;
	}

}