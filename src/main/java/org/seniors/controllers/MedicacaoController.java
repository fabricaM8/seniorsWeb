package org.seniors.controllers;

import static org.seniors.config.SeniorsServerMessages.MEDICACAO_ALREADY_EXISTS;

import java.util.List;

import org.seniors.dao.medicacaoDAO;
import org.seniors.exceptions.SeniorsServerInternalException;
import org.seniors.model.Medicacao;

/**
 * User Controller class
 * @author <a hre="mailto:juliosugaya@gmail.com">Julio Sugaya</a>
 * 
 */
public class MedicacaoController {

	private static MedicacaoController instance = null;
	private static medicacaoDAO medicacaoDAO;
	private MedicacaoController() {}

	/**
	 * @return Single instance of <code>UserController</code> class.
	 */
	public static MedicacaoController getInstance() {
		if (instance == null) {
			instance = new MedicacaoController();
			medicacaoDAO = new medicacaoDAO();

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

	public Medicacao createMedicacao(Medicacao med) throws Exception {

		return medicacaoDAO.persist(med);
	}
	
	public Medicacao updateMedicacao(Medicacao med) throws Exception {
		List<Medicacao> meds = medicacaoDAO.search("id", med.getId()); 
		if (meds.isEmpty() || meds.get(0).getId() == med.getId()) {
			medicacaoDAO.persist(med);
			return med;
		} else {
			throw new SeniorsServerInternalException(MEDICACAO_ALREADY_EXISTS);
		}
	}
	
	public List<Medicacao> listMedicacoes() throws Exception{
		return medicacaoDAO.search();
	}
	
	public void remove(Long id) throws Exception{
		Medicacao med = medicacaoDAO.search(id);
		medicacaoDAO.remove(med);
	}
	
	public void createMedicacaoStub(){

		Medicacao med = new Medicacao();
		med.setNome("Neosaldina");
		med.setObs("tomar sempre que quiser");;
		med.setPrioridade(1);
		
		try {
			medicacaoDAO.persist(med);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * @param id
	 * @return Search a medicine by id
	 * @throws Exception
	 */
	public Medicacao searchById(Long id) throws Exception{
		return medicacaoDAO.search(id);
	}

}