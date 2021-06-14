package com.ulht.pw.security;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.hibernate.validator.internal.constraintvalidators.hv.EmailValidator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ulht.pw.domain.UserEntity;
import com.ulht.pw.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

/**
 * Authenticate a user from the database.
 */
@Log4j2
@Component("userDetailsService")
@RequestMapping("api/management/audits")
@RequiredArgsConstructor
public class DomainUserDetailsService implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(final String login) {
		log.debug("Authenticating {}", login);

		if (new EmailValidator().isValid(login, null)) {
			return userRepository.findOneWithAuthoritiesByEmail(login)
					.map(user -> createSpringSecurityUser(login, user))
					.orElseThrow(() -> new UsernameNotFoundException("User with email " + login + " was not found in the database"));
		}

		String lowercaseLogin = login.toLowerCase(Locale.ENGLISH);
		return userRepository.findOneWithAuthoritiesByLogin(lowercaseLogin)
				.map(user -> createSpringSecurityUser(lowercaseLogin, user))
				.orElseThrow(() -> new UsernameNotFoundException("User " + lowercaseLogin + " was not found in the database"));

	}

	private org.springframework.security.core.userdetails.User createSpringSecurityUser(String lowercaseLogin, UserEntity user) {
		List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
				.map(authority -> new SimpleGrantedAuthority(authority.getName()))
				.collect(Collectors.toList());
		return new org.springframework.security.core.userdetails.User(user.getLogin(),
				user.getPassword(),
				grantedAuthorities);
	}
}
