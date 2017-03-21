package com.urservices.epressing.repository;

import com.urservices.epressing.domain.Commande;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Commande entity.
 */
@SuppressWarnings("unused")
public interface CommandeRepository extends JpaRepository<Commande,Long> {

}
