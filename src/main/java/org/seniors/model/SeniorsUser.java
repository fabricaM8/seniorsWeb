package org.seniors.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "USER")
@XmlRootElement
@JsonIgnoreProperties(ignoreUnknown=true)
public class SeniorsUser implements Serializable, UserDetails {

	private static final long serialVersionUID = -5650549052650207619L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Long id;

	private String name;

	private String email;
	
	@XmlTransient
	private String password;

	@Enumerated(EnumType.STRING)
	private Role role;
	
//	@ElementCollection(fetch = FetchType.EAGER)
//	@CollectionTable(name="WALLET_USER_ROLES")
//	private List<String> roles = new ArrayList<String>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

//	public List<String> getRoles() {
//		return roles;
//	}	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

//	public void setRoles(List<String> roles) {
//		this.roles = roles;
//	}
	
//	public void addRole(Role role){
//		this.roles.add(role.getRole());
//	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
//		Set<String> roles = this.getRoles();
		Role role = this.getRole();

		if (role == null) {
			return Collections.emptyList();
		}

		Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();
//		for (String role : roles) {
		authorities.add(new SimpleGrantedAuthority(role.toString().toLowerCase()));
//		}
		return authorities;
	}

	@Override
	public String getUsername() {
		return name;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}