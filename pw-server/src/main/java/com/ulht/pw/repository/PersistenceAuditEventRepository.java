package com.ulht.pw.repository;

import java.time.Instant;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ulht.pw.domain.audit.PersistentAuditEvent;

/**
 * Spring Data JPA repository for the PersistentAuditEvent entity.
 */
public interface PersistenceAuditEventRepository extends JpaRepository<PersistentAuditEvent, Long> {

	List<PersistentAuditEvent> findByPrincipal(String principal);

	List<PersistentAuditEvent> findByAuditEventDateAfter(Instant after);

	List<PersistentAuditEvent> findByPrincipalAndAuditEventDateAfter(String principal, Instant after);

	List<PersistentAuditEvent> findByPrincipalAndAuditEventDateAfterAndAuditEventType(String principal, Instant after, String type);

	Page<PersistentAuditEvent> findAllByAuditEventDateBetween(Instant fromDate, Instant toDate, Pageable pageable);
}
