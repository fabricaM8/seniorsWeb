package org.seniors.dao;

import org.seniors.model.Medicacao;

/**
 * Medicacao Entity DAO
 *  
 * @author <a hre="mailto:juliosugaya@gmail.com">Julio Sugaya</a>
 */
public class medicacaoDAO extends GenericDAO<Medicacao, Long> {

	public medicacaoDAO() {
		super(Medicacao.class);
	}
}